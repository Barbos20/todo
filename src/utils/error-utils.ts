import { Dispatch } from "redux";
import { ResponseType } from "../api/todolists-api";
import { setErrorAC, setStatusAC } from "../app/app-reducer";



export const hendleServerAppError=<D>(data:ResponseType<D>, dispatch:Dispatch)=>{
   
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]));
      } else {
        dispatch(setErrorAC("Some error occurred"));
      }
      dispatch(setStatusAC("failed"));
}
export const hendleServerNetworkError =(error:{message:string},dispatch:Dispatch )=>{
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'));
    dispatch(setStatusAC("failed"));
}