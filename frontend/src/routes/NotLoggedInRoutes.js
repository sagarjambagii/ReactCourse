//Lecture 53.5 import  useSelector
import { useSelector } from "react-redux";
//Lecture 53.6 import Navigate, Outlet
import { Navigate, Outlet } from "react-router-dom";

//Lecture 53.4 Create routes:NotLoggedInRoutes.js
export default function NotLoggedInRoutes() {
  //Lecture 53.5 get the user from state
  const { user } = useSelector((state) => ({ ...state }));

  //Lecture 53.6 if user exist navigate to home
  return user ? <Navigate to="/" /> : <Outlet />;
}
