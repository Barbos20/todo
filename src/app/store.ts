import { ActionsLogType } from './../features/Login/login-reducer';
import { useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { ActionsTasksType, tasksReducer } from "../features/TodolistsList/tasks-reducer";
import { ActionsTodolistsType, todolistsReducer } from "../features/TodolistsList/todolists-reducer";
import { ActionsAppType, appReducer } from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer, 
  app: appReducer,
});
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppActionType =
  | ActionsTasksType
  | ActionsTodolistsType
  | ActionsAppType
  | ActionsLogType;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;
export const useDispatchType = () => {
  return useDispatch<TypedDispatch>();
};

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
