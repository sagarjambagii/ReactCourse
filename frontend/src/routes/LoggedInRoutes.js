//Lecture 53.1 import useSelector
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

//Lecture 53.0 Protected routes (very important ! ), Create routes folder:LoggedInRoutes.js
export default function LoggedInRoutes() {
  //Lecture 53.1 get the user from state
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 53.2 check if user exist or render login
  return user ? <Outlet /> : <Login />;
}
