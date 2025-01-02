//Lecture 31.15 import fomik
import "./style.css";
//Lecture 31.7 import fomik
import { Formik, Form } from "formik";
//Lecture 31.11 import Link
import { Link } from "react-router-dom";
//Lecture 32.2 import logininput
import LoginInput from "../../components/inputs/loginInput";
//Lecture 32.14 Import useState
import { useState } from "react";
//Lecture 33.2 import everything from yup
import * as Yup from "yup";
//Lecture 32.15 Create login infos object with initial values
const loginInfos = {
  email: "",
  password: "",
};
/* //Lecture 29.3, Create Pages:Login:index.js, Create component rfc*/
export default function Login() {
  //Lecture 32.14 Login useState
  // const [login, setLogin] = useState();
  //Lecture 32.15 Pass login infos
  const [login, setLogin] = useState(loginInfos);
  //Lecture 32.16 Extract the values
  const { email, password } = login;
  console.log(login);
  //Lecture 32.18 define handleLoginChange
  const handleLoginChange = (e) => {
    //Lecture 32.19 get the name and values
    const { name, value } = e.target;
    //Lecture 32.20 set new value
    setLogin({ ...login, [name]: value });
  };
  //Lecture 33.1 define login validation Schema
  const loginValidation = Yup.object({
    //Lecture 33.3 rules: required
    email: Yup.string()
      .required("Email address is required.")
      //Lecture 33.5 must be email and max value
      .email("Must be a valid email.")
      .max(100),
    //Lecture 33.6 Password field
    password: Yup.string().required("Password is required"),
  });
  /* //Lecture 29.3 Create component rfc*/
  // return <div>Login</div>;
  //Lecture 31.0 Login an Register page part 1
  return (
    //Lecture 31.1 Html
    <div className="login">
      {/* //Lecture 31.2 */}
      <div className="login_wrapper">
        {/* //Lecture 31.3 */}
        <div className="login_wrap">
          {/* //Lecture 31.4 */}
          <div className="login_1">
            {/* //Lecture 31.5 */}
            {/* <img src="../../icons/facebook.svg" alt="" /> */}
            <img src="../../icons/facebook.svg" alt="" width="50" height="50" />
            {/* //Lecture 31.5 */}
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          {/* //Lecture 31.4 */}
          <div className="login_2">
            {/* //Lecture 31.6 */}
            <div className="login_2_wrap">
              {/* //Lecture 31.7 npm i formik yup */}
              <Formik
                //Lecture 32.16 enable Reinitialize
                enableReinitialize
                //Lecture 32.13 define values
                initialValues={{
                  // email: "",
                  // password: "",
                  //Lecture 32.15 remove values
                  email,
                  password,
                }}
                //Lecture 33.0 Login and Register page part 3 (Yup), validationSchema
                validationSchema={loginValidation}
              >
                {/* //Lecture 31.8 return form */}
                {(formik) => (
                  //Lecture 31.9 import form
                  <Form>
                    {/* //Lecture 31.10 add inputs and buttons */}
                    {/* <input type="text" />
                    <input type="text" /> */}
                    {/* //Lecture 32.2 Call the Login Component */}
                    <LoginInput
                      //Lecture 32.8 pass type and name
                      type="text"
                      name="email"
                      //Lecture 32.5 pass placeholder to component
                      placeholder="Email address or phone number"
                      //Lecture 32.17 onChange
                      onChange={handleLoginChange}
                    />
                    {/* //Lecture 32.2 Call the Login Component */}
                    <LoginInput
                      //Lecture 32.8 pass type and name
                      type="password"
                      name="password"
                      //Lecture 32.7 pass placeholder to component
                      placeholder="Password"
                      //Lecture 32.17 onChange
                      onChange={handleLoginChange}
                      //Lecture 33.12 passing bottom prop
                      bottom
                    />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              {/* //Lecture 31.11 adding link */}
              <Link to="/forgot" className="forgot_password">
                Forgotten password ?
              </Link>
              {/* //Lecture 31.12 adding splitter */}
              <div className="sign_splitter"></div>
              {/* //Lecture 31.13 adding create account button */}
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            {/* //Lecture 31.14 adding Link */}
            <Link to="/" className="sign_extra">
              <b>Create a Page</b>
              for a celebrity, brand or business.
            </Link>
          </div>
        </div>
        {/* //Lecture 31.3 */}
        <div className="register"></div>
        {/* //Lecture 35.0 Login and Register part 5 Footer */}
        <footer className="login_footer">
          {/* //Lecture 35.1 login_footer_wrap html */}
          <div className="login_footer_wrap">
            {/* //Lecture 35.2 paste the links*/}
            <Link to="/">English(UK)</Link>
            <Link to="/">Français(FR)</Link>
            <Link to="/">العربية</Link>
            <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
            <Link to="/">Español (España)</Link>
            <Link to="/">italiano</Link>
            <Link to="/">Deutsch</Link>
            <Link to="/">Português (Brasil)</Link>
            <Link to="/">हिन्दी</Link>
            <Link to="/">中文(简体)</Link>
            <Link to="/">日本語</Link>
            {/* //Lecture 35.3 add footer square */}
            <Link to="/" className="footer_square">
              <i className="plus_icon"></i>
            </Link>
          </div>
          {/* //Lecture 35.4 splitter */}
          <div className="footer_splitter"></div>
          {/* //Lecture 35.5 login_footer_wrap html  */}
          <div className="login_footer_wrap">
            <Link to="/">Sign Up</Link>
            <Link to="/">Log in</Link>
            <Link to="/">Messenger</Link>
            <Link to="/">Facebook Lite</Link>
            <Link to="/">Watch</Link>
            <Link to="/">Places</Link>
            <Link to="/">Games</Link>
            <Link to="/">Marketplace</Link>
            <Link to="/">Facebook Pay</Link>
            <Link to="/">Oculus</Link>
            <Link to="/">Portal</Link>
            <Link to="/">Instagram</Link>
            <Link to="/">Bulletin</Link>
            <Link to="/">Local</Link>
            <Link to="/">Fundraisers</Link>
            <Link to="/">Services</Link>
            <Link to="/">Voting Information Centre</Link>
            <Link to="/">Groups</Link>
            <Link to="/">About</Link>
            <Link to="/">Create ad</Link>
            <Link to="/">Create Page</Link>
            <Link to="/">Developers</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Cookies</Link>
            {/* //Lecture 35.5 add choices, terms and help */}
            <Link to="/">
              AdChoices
              <i className="adChoices_icon"></i>
            </Link>
            <Link to="/">Terms</Link>
            <Link to="/">Help</Link>
          </div>
          <div className="login_footer_wrap">
            <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
              Meta © 2022
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
