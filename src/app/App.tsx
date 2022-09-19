import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Menu } from "@mui/icons-material";
import { LinearDeterminate } from "../components/LinearProgress/LinearProgress";
import { ErrorSnackbars } from "../components/SnackBar/SnackBar";
import { AppRootStateType, useDispatchType } from "./store";
import { InitializeAppTC, RequestStatusType } from "./app-reducer";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { CircularProgress } from "@mui/material";
import { logoutTC } from "../features/Login/auth-reducer";

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useSelector<AppRootStateType>(state=> state.auth.isLoggedIn)

const dispatch = useDispatchType()

const logOutHendler = useCallback(()=>{
  dispatch(logoutTC())
},[])

useEffect(()=>{
  dispatch(InitializeAppTC())
},[])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbars />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && <Button color="inherit" onClick={logOutHendler}>Log out</Button>}
          </Toolbar>
          {status === "loading" && <LinearDeterminate />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
          {/* <TodolistsList/> */}
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
