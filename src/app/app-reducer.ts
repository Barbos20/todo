import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setIsLoggedIn } from "../features/Login/auth-reducer";
import { authAPI } from "./../api/todolists-api";
import { Dispatch } from "redux";
const initialState: InitialStateType = {
  status: "loading",
  error: null,
  isInitialized: false,
};

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
  },
});

export const appReducer = slice.reducer;


export const InitializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC({ status: "loading" }));
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ value: true }));
    } else {
    }
    dispatch(setAppInitializedAC({ value: true }));
    dispatch(setStatusAC({ status: "succeeded" }));
  });
};
export const { setErrorAC, setStatusAC, setAppInitializedAC } = slice.actions;