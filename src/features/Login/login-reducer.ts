import { Dispatch } from "redux";
import { setStatusAC } from "../../app/app-reducer";
import { hendleServerAppError } from "../../utils/error-utils";
import { authAPI, LoginParamsType } from "./../../api/todolists-api";
import { hendleServerNetworkError } from "./../../utils/error-utils";

const initialState: InitialStateType = {};

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ActionsLogType
): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

// actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setStatusAC("succeeded"));
      } else {
        hendleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      hendleServerNetworkError(error, dispatch);
    });
};

// types
export type ActionsLogType = any;
type InitialStateType = {};
