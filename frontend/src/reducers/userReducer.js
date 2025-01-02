//Lecture 42.24 import cookies
import Cookies from "js-cookie";
//Lecture 30.6 Create userReducer function
export function userReducer(
  // state = null
  //Lecture 42.24 avoid user getting null, set state to cookies
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  action
) {
  switch (action.type) {
    //Lecture 30.6 Create userReducer function
    case "LOGIN":
      return action.payload;
    //Lecture 66.0 add Logout case
    case "LOGOUT":
      return null;
    //Lecture 109.23 add UPDATEPICTURE
    case "UPDATEPICTURE":
      return { ...state, picture: action.payload };
    //Lecture 63.9 add verify case
    case "VERIFY":
      return { ...state, verified: action.payload };
    default:
      return state;
  }
}
