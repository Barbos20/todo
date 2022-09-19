import { Dispatch } from "redux";
import { setStatusAC } from "../../app/app-reducer";
import { hendleServerAppError } from "../../utils/error-utils";
import { authAPI, LoginParamsType } from "../../api/todolists-api";
import { hendleServerNetworkError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

 const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn } = slice.actions;

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status:"loading"}));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ value: true }));
        dispatch(setStatusAC({status:"succeeded"}));
      } else {
        hendleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      hendleServerNetworkError(error, dispatch);
    });
};
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status:"loading"}));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ value: false }));
        dispatch(setStatusAC({status:"succeeded"}));
      } else {
        hendleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      hendleServerNetworkError(error, dispatch);
    });
};
