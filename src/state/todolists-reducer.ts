import { todolistsAPI, TodolistType } from "./../api/todolists-api";
import { v1 } from "uuid";
import { Dispatch } from "redux";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todolist: TodolistType
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: TodolistType[];
};



export type ActionsTodolistType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsTodolistType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      const newTodolist:TodolistDomainType = {...action.todolist, filter:'all'}
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state];
    }
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => {
        return { ...tl, filter: "all" };
      });
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todolist};
};
export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};
export const SetTodolistsAC = (
  todolists: TodolistType[]
): SetTodolistsActionType => {
  return { type: "SET-TODOLISTS", todolists };
};
//ThankCreator
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then((res) => {
      dispatch(SetTodolistsAC(res.data));
    });
  };
};
export const removeTodolistTC = (todolistId: string)=>{
  return (dispatch:Dispatch)=>{
    todolistsAPI.deleteTodolist(todolistId).then((res)=>{
      dispatch(removeTodolistAC(todolistId))
    })
  }
}
export const addTodolistTC = (title: string)=>{
  return (dispatch:Dispatch)=>{
    todolistsAPI.createTodolists(title).then((res)=>{
      dispatch(removeTodolistAC(title))
    })
  }
}
