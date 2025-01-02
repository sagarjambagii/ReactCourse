//Lecture 67.0 import style.css
import "./style.css";
//Lecture 67.8 import link
//Lecture 67.10 Import useNavigate
import { Link, useNavigate } from "react-router-dom";
//Lecture 67.5 import useSelector
//Lecture 67.10 Import useDispatch
import { useDispatch, useSelector } from "react-redux";
//Lecture 67.10 Import Cookies
import Cookies from "js-cookie";
//Lecture 67.13 import Formik
import { Form, Formik } from "formik";
import { useState } from "react";
//Lecture 67.17 import LoginInput
import LoginInput from "../../components/inputs/loginInput";
//Lecture 68.5 import SearchAccount
import SearchAccount from "./SearchAccount";
//Lecture 68.10 import sendEmail
import SendEmail from "./SendEmail";
//Lecture 68.26 import CodeVerification
import CodeVerification from "./CodeVerification";
//Lecture 68.28 import footer
import Footer from "../../components/login/Footer";
//Lecture 69.2 import ChangePassword
import ChangePassword from "./ChangePassword";
//Lecture 67.0 Reset password part 1, Create pages:reset:index.js,style.css
export default function Reset() {
  //Lecture 67.5 get the state from store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 67.10 copy paste logout logic -start
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Lecture 68.0 Reset password part 2, useState for setVisible
  const [visible, setVisible] = useState(0);
  //Lecture 71.11 usestate for setLoading and setUserInfos
  const [laoding, setLoading] = useState(false);
  const [userInfos, setUserInfos] = useState("");
  //Lecture 67.15 useState for email
  const [email, setEmail] = useState("");
  //Lecture 68.29 useState for code
  const [code, setCode] = useState("");
  //Lecture 69.3 define password, conf password
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  //Lecture 67.18 useState for error
  const [error, setError] = useState("");
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  //Lecture 67.10 copy paste logout logic - end
  return (
    //Lecture 67.3 class reset
    <div className="reset">
      {/* //Lecture 67.3 class reset_header */}
      <div className="reset_header">
        {/* //Lecture 67.3 img */}
        <img src="../../../icons/facebook.svg" alt="" />
        {/* //Lecture 67.6 if we have user  */}
        {user ? (
          //Lecture 67.7 className right_reset
          <div className="right_reset">
            {/* //Lecture 67.8 img  */}
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            {/* //Lecture 67.9 button  */}
            <button
              className="blue_btn"
              //Lecture 67.11 logout
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          //Lecture 67.4 LInk to login
          <Link to="/login" className="right_reset">
            {/* //Lecture 67.4 className blue_btn */}
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      {/* //Lecture 67.12 class reset_wrap */}
      <div className="reset_wrap">
        {/* //Lecture 67.12 class reset_form */}
        {/* //Lecture 68.1 cut reset tag */}
        {/* //Lecture 68.8 if visible is 0 */}
        {visible === 0 && (
          //Lecture 68.5 call SearchAccount
          <SearchAccount
            //Lecture 68.6 pass email, setEmail error
            email={email}
            setEmail={setEmail}
            error={error}
            //Lecture 71.12 pass setError, setLoading, setUserInfos,setVisible
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {/* //Lecture 68.10 if visible is 1 */}
        {/* {visible === 1 && <SendEmail />} */}
        {/* //Lecture 68.16 pass the user */}
        {visible === 1 &&
          //Lecture 71.26 show when userInfos defined
          userInfos && (
            <SendEmail
              //  user={user}
              //Lecture 71.21 pass the userinfo
              // userInfos={userInfos}
              //Lecture 72.20 pass email to setVisible
              email={email}
              userInfos={userInfos}
              error={error}
              setError={setError}
              setLoading={setLoading}
              setUserInfos={setUserInfos}
              setVisible={setVisible}
            />
          )}
        {/* //Lecture 68.25 if visible 2 */}
        {visible === 2 && (
          //Lecture 68.26 call CodeVerification
          <CodeVerification
            //Lecture 68.27 pass user  error
            // user={user}
            //Lecture 68.30 pass code setCode
            // code={code}
            // setCode={setCode}
            // error={error}
            //Lecture 73.12 pass seterror to userInfos
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
        {/* //Lecture 69.2 if visible is 3 */}
        {visible === 3 && (
          <ChangePassword
            //Lecture 69.4 pass parameters
            password={password}
            conf_password={conf_password}
            setConf_password={setConf_password}
            setPassword={setPassword}
            //Lecture 74.6 pass error to userInfos
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
      </div>
      {/* //Lecture 68.28 add footer */}
      <Footer />
    </div>
  );
}
