import { Dispatch } from "redux";
import { setStatusAC } from "../../app/app-reducer";
import { hendleServerAppError } from "../../utils/error-utils";
import { authAPI, LoginParamsType } from "../../api/todolists-api";
import { hendleServerNetworkError } from "../../utils/error-utils";

const initialState: InitialStateType = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsLogType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

// actions

export const setIsLoggedIn = (value: boolean) =>
  ({
    type: "login/SET-IS-LOGGED-IN",
    value,
  } as const);

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(true));
        dispatch(setStatusAC("succeeded"));
      } else {
        hendleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      hendleServerNetworkError(error, dispatch);
    });
};
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(false));
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
export type ActionsLogType = ReturnType<typeof setIsLoggedIn>;
type InitialStateType = {
  isLoggedIn: boolean;
};
