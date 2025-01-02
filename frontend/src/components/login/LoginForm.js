//Lecture 36.6 paste all imports
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
//Lecture 43.8 import Dotloader to useNavigate
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const loginInfos = {
  email: "",
  password: "",
};
//Lecture 36.0 Learn about code refactoring, create Components:login:LoginForm.js
// export default function LoginForm() {
//Lecture 43.3 get the setVisible prop
export default function LoginForm({ setVisible }) {
  //Lecture 43.9 distach and navigate define
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Lecture 36.4 paste all variables and funtion
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  //Lecture 43.13 useState for error and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //Lecture 43.11 define loginSubmit
  const loginSubmit = async () => {
    //Lecture 43.12 adding try catch block
    try {
      //Lecture 43.23 set loader to true
      setLoading(true);
      //Lecture 43.15 get the data
      const { data } = await axios.post(
        //Lecture 43.16 pass the backend url
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        //Lecture 43.17 send data for login
        {
          email,
          password,
        }
      );
      //Lecture 43.18 dispatch the data to login
      dispatch({ type: "LOGIN", payload: data });
      //Lecture 43.19 set the cookies
      Cookies.set("user", JSON.stringify(data));
      //Lecture 43.20 navigate to home
      navigate("/");
    } catch (error) {
      //Lecture 43.14 set loading and error
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  //Lecture 36.2 paste login_wrap
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" width="50" height="50" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            //Lecture 43.10 onSubmit call login submit
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          {/* <Link to="/forgot" className="forgot_password"> */}
          {/* //Lecture 67.2 add link to reset  */}
          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>
          {/* //Lecture 43.22 adding the loader */}
          <DotLoader color="#1876f2" loading={loading} size={30} />
          {/* //Lecture 43.21 when we have error */}
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            //Lecture 43.4 add onclick, to setvisble to true
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
