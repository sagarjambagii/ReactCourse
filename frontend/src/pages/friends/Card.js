//Lecture 151.8 import Link
import { Link } from "react-router-dom";
import {
  //Lecture 152.10 import acceptRequest
  acceptRequest,
  //Lecture 152.2 import cancelRequest
  cancelRequest,
  //Lecture 152.15 import deleteRequest
  deleteRequest,
} from "../../functions/user";
//Lecture 152.3 import useSelector
import { useSelector } from "react-redux";

//Lecture 151.4 Create pages:friends:Card.js, RFC
export default function Card({
  //Lecture 151.7 get the user
  userr,
  //Lecture 151.11 get type
  type,
  //Lecture 152.5 get getData fn
  getData,
}) {
  //Lecture 152.3 get the user from store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 152.1 Create cancelRequestHandler fn
  const cancelRequestHandler = async (userId) => {
    //Lecture 152.2 call cancelRequest
    const res = await cancelRequest(userId, user.token);
    //Lecture 152.6 if res is okay
    if (res == "ok") {
      //Lecture 152.7 call getData
      getData();
    }
  };
  //Lecture 152.9 Create confirmHandler fn
  const confirmHandler = async (userId) => {
    //Lecture 152.10 call acceptRequest
    const res = await acceptRequest(userId, user.token);
    //Lecture 152.11 if res is ok
    if (res == "ok") {
      //Lecture 152.12 call getData
      getData();
    }
  };
  //Lecture 152.14 Create deleteHandler fn
  const deleteHandler = async (userId) => {
    //Lecture 152.15 call deleteRequest
    const res = await deleteRequest(userId, user.token);
    //Lecture 152.16 if res is ok
    if (res == "ok") {
      //Lecture 152.17 call getData
      getData();
    }
  };
  return (
    //Lecture 151.8 class req_card
    <div className="req_card">
      {/* //Lecture 151.8 Link to profile and img */}
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      {/* //Lecture 151.9 class req_name and name */}
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {/* //Lecture 151.14 if type is sent  */}
      {type === "sent" ? (
        //Lecture 151.15 if true, button
        <button
          className="blue_btn"
          //Lecture 152.0 Buttons functionalities
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel Request
        </button>
      ) : //Lecture 151.16 else, if type is request
      type === "request" ? (
        //Lecture 151.17 empty tag and buttons
        <>
          <button
            className="blue_btn"
            //Lecture 152.8 add onclick
            onClick={() => confirmHandler(userr._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn"
            //Lecture 152.13 add onclick
            onClick={() => deleteHandler(userr._id)}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
