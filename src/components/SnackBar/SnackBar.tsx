import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useSelector } from "react-redux";
import { setErrorAC } from "../../app/app-reducer";

import { AppRootStateType, useDispatchType } from "../../app/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbars() {
  const dispatch = useDispatchType();
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setErrorAC(null));
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
