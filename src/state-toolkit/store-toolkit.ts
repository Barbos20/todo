import { combineReducers } from "redux";
import { tasksReducer } from "./../state-toolkit/tasks-reducer-toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolists-reducer-toolkit";

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
