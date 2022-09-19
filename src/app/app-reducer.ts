import { setIsLoggedIn } from '../features/Login/auth-reducer';
import { authAPI } from './../api/todolists-api';
import { Dispatch } from 'redux';
const initialState: InitialStateType = {
  status: "loading",
  error: null,
  isInitialized:false,
};

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean,
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsAppType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
      case "APP/SET-IS-INITIALIZED":
        return{...state, isInitialized:action.value}
    default:
      return state;
  }
};

export const setErrorAC = (error: string | null) =>
  ({
    type: "APP/SET-ERROR",
    error,
  } as const);
export const setStatusAC = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    status,
  } as const);
  export const setAppInitializedAC=( value: boolean)=>({
    type:"APP/SET-IS-INITIALIZED",
    value
  }as const)

export const InitializeAppTC = ()=>(dispatch:Dispatch)=>{
  dispatch(setStatusAC("loading"));
authAPI.me().then(res =>{
  if(res.data.resultCode=== 0 ){
    dispatch(setIsLoggedIn(true))
  }else{

  }
  dispatch(setAppInitializedAC(true))
  dispatch(setStatusAC("succeeded"));
})
}

export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
export type SetInitializedActionType = ReturnType<typeof setAppInitializedAC>;
export type ActionsAppType = SetErrorActionType | SetStatusActionType | SetInitializedActionType;
