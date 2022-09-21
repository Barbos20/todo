import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { AppRootStateType, useDispatchType } from "../../app/store";
import { loginTC } from "./auth-reducer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


type FormikErrorType ={
    email?: string
   password?: string
   rememberMe?: boolean
}

export const Login = () => {
  
const dispatch = useDispatchType()

const isLoggedIn = useSelector<AppRootStateType>(state=> state.auth.isLoggedIn)



  const formik = useFormik({

    validate: (values) => {
        const errors: FormikErrorType={}
        if (!values.email) {
            errors.email = 'Required';
          } 
          if (!values.password) {
            errors.password = 'Required';
          } 
        
          return errors;
      },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
        dispatch(loginTC(values))
    },
  });

  if(isLoggedIn){
    return <Navigate to={'/'}/>
 }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: artur.korol.2000.10.25@mail.ru</p>
              <p>Password: 123456789</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
