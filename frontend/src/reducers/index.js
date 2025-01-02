//Lecture 30.1 help to create multiple reducers
import { combineReducers } from "redux";
//Lecture 30.7 import userReducer
import { userReducer } from "./userReducer";

//Lecture 30.2 rootReducer funtion
const rootReducer = combineReducers({
  //Lecture 30.5 Create userReducer.js
  user: userReducer,
});

//Lecture 30.3 export rootReducer
export default rootReducer;
