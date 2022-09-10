import { useDispatch } from 'react-redux';
import { tasksReducer, ActionsType } from './tasks-reducer';
import { todolistsReducer, ActionsTodolistType } from './todolists-reducer';
import { applyMiddleware, combineReducers} from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = ActionsTodolistType | ActionsType
// export type AppDispatch = typeof store.dispatch
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>

export const useDispatchType = () => {
    return useDispatch<TypedDispatch>()
  }
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
