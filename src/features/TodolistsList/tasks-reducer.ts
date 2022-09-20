import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType
} from "../../api/todolists-api";
import { setStatusAC } from "../../app/app-reducer";
import { AppRootStateType } from "../../app/store";
import {
  hendleServerAppError,
  hendleServerNetworkError
} from "../../utils/error-utils";
import {
  addTodolistAC, removeTodolistAC, setTodolistsAC
} from "./todolists-reducer";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    removeTaskAC(
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasksAC(
      state,
      action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>
    ) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
  },
});


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC({ status: "loading" }));
  todolistsAPI.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(setTasksAC({ tasks, todolistId }));
    dispatch(setStatusAC({ status: "succeeded" }));
  });
};
export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC({ taskId, todolistId }));
      dispatch(setStatusAC({ status: "succeeded" }));
    });
  };
export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          dispatch(addTaskAC({ task }));
          dispatch(setStatusAC({ status: "succeeded" }));
        } else {
          hendleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        hendleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskTC =
  (
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
  ) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setStatusAC({ status: "loading" }));
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      //throw new Error("task not found in the state");
      // console.log("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...model,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ taskId, model, todolistId }));
          dispatch(setStatusAC({ status: "succeeded" }));
        } else {
          hendleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        hendleServerNetworkError(error, dispatch);
      });
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export const tasksReducer = slice.reducer;
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } =
  slice.actions;
