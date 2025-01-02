//Lecture 63.1 import useEffect
import { useEffect, useRef, useState } from "react";
//Lecture 63.10 import useDispatch
import { useDispatch, useSelector } from "react-redux";
//Lecture 63.0 import useparams
//Lecture 63.11 import navigate
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import "./style.css";
//Lecture 63.6 Import axios
import axios from "axios";
//Lecture 63.8 update cookies
import Cookies from "js-cookie";
//Lecture 62.0 Activate account part 1, copy and paster index.js
export default function Activate() {
  //Lecture 63.10 define dispatch
  const dispatch = useDispatch();
  //Lecture 63.11 define navigate
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  //Lecture 62.2 useState for success, error, loading
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  //Lecture 63.0 Activate account part 2, Get the token from url
  const { token } = useParams();
  //Lecture 63.1 after the page loads , start verification
  useEffect(() => {
    activateAccount();
  }, []);
  //Lecture 63.2 Create activateAccount
  const activateAccount = async () => {
    //Lecture 63.3 try catch block
    try {
      //Lecture 63.5 set loading to true
      setLoading(true);
      //Lecture 63.6 get the data using axios
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //Lecture 63.7 set success
      setSuccess(data.message);
      //Lecture 63.8 update cookies
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      //Lecture 63.10 update store
      dispatch({
        type: "VERIFY",
        payload: true,
      });

      //Lecture 63.11 navigate to home
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      //Lecture 63.4 error message
      setError(error.response.data.message);
      //Lecture 63.12 navigate to home
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="home">
      {/* //Lecture 62.13 if success true */}
      {success && (
        //Lecture 62.4 Call ActivateForm
        <ActivateForm
          //Lecture 62.5 Send type header text loading
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {/* //Lecture 62.14 if success false */}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
