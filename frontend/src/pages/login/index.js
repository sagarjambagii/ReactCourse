import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
//Lecture 36.5 cut all imports
//Lecture 36.10 cut link
//Lecture 37.1 import register form
import RegisterForm from "../../components/login/RegisterForm";
//Lecture 43.0 Login submit, Create a state
import { useState } from "react";

export default function Login() {
  //Lecture 43.0 Login submit, Create a state
  const [visible, setVisible] = useState(false);
  //Lecture 36.3 cut all variables
  return (
    <div className="login">
      <div className="login_wrapper">
        {/* //Lecture 36.1 cut login_wrap */}
        {/* //Lecture 36.6 call login form */}
        {/* <LoginForm  /> */}
        {/* //Lecture 43.2 pass setVisible */}
        <LoginForm setVisible={setVisible} />
        {/* <div className="register"></div> */}
        {/* //Lecture 37.1 Add register form */}
        {/* <RegisterForm /> */}
        {/* //Lecture 43.1 visible is true show register */}
        {visible && (
          //Lecture 43.5 pass setVisible
          <RegisterForm setVisible={setVisible} />
        )}
        {/* //Lecture 36.8 cut Footer */}
        {/* //Lecture 36.11 call the footer */}
        <Footer />
      </div>
    </div>
  );
}
