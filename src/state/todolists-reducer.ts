import { v1 } from "uuid";
import { filterValuesType, TodolistType } from "./../App";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddTodolistActionType = {
  type: "ADD_TODOLIST";
  title: string;
};
type ChangeTodolistActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: filterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistActionType
  | ChangeTodolistFilterActionType;

export const userReducer = (
  state: Array<TodolistType>,
  action: ActionsType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD_TODOLIST": {
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: "all",
        },
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I don't understand this type");
  }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
 }
 export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD_TODOLIST', title}
 }
 export const ChangeTodolistTitleAC = (id:string, title: string,): ChangeTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id,title}
 }
 export const ChangeTodolistFilterAC = ( id:string, filter: filterValuesType,): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter}
 }