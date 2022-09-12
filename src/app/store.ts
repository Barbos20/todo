import { useDispatch } from 'react-redux';
import { ActionsTodolistsType } from './../features/TodolistsList/todolists-reducer';
import { ActionsTasksType } from './../features/TodolistsList/tasks-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = ActionsTasksType | ActionsTodolistsType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export const useDispatchType = () => {
    return useDispatch<TypedDispatch>()
  }

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
