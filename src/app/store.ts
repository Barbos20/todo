import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  combineReducers
} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "../features/Login/auth-reducer";
import {
  tasksReducer
} from "../features/TodolistsList/tasks-reducer";
import {
  ActionsTodolistsType,
  todolistsReducer
} from "../features/TodolistsList/todolists-reducer";
import { appReducer } from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
// непосредственно создаём store
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware)
});
// определить автоматически тип всего объекта состояния

export type AppActionType = ActionsTodolistsType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export const useDispatchType = () => {
    return useDispatch<TypedDispatch>()
  }

// удалить по завершению 
export type AppRootStateType = ReturnType<typeof rootReducer>;



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
