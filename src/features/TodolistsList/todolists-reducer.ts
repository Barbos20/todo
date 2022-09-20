import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { RequestStatusType, setStatusAC } from "../../app/app-reducer";
import { hendleServerAppError } from "./../../utils/error-utils";

const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].title = action.payload.title
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status
    },
    setTodolistsAC(
      state,
      action: PayloadAction<{ todolists: Array<TodolistType> }>
    ) { return action.payload.todolists.map((tl) => ({
              ...tl,
              filter: "all",
              entityStatus: "idle",
            }))},
  },
});


export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC({ todolists: res.data }));
        dispatch(setStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        hendleServerAppError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    dispatch(
      changeTodolistEntityStatusAC({ id: todolistId, status: "loading" })
    );
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC({ id: todolistId }));
      dispatch(setStatusAC({ status: "succeeded" }));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC({ todolist: res.data.data.item }));
      dispatch(setStatusAC({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitleAC({ id, title }));
      dispatch(setStatusAC({ status: "succeeded" }));
    });
  };
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ActionsTodolistsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC,
} = slice.actions;
