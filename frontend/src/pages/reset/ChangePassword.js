import { Form, Formik } from "formik";
import { useState } from "react";
import {
  Link,
  //Lecture 74.16 import Navigate
  useNavigate,
} from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
//Lecture 70.4 import yup
import * as Yup from "yup";
//Lecture 74.14 import axios
import axios from "axios";
//Lecture 69.0 Reset password part 3,Create pages:reset:ChangePassword.js  RFC
// export default function ChangePassword({}) {
//Lecture 69.5 get the props
export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  //Lecture 74.7 getting error setError
  error,
  loading,
  setLoading,
  userInfos,
  setError,
}) {
  //Lecture 74.16 define Navigate
  const navigate = useNavigate();
  //Lecture 70.5 define validatePassword
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    //Lecture 70.5 define conf_password
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  //Lecture 74.8 get the email
  const { email } = userInfos;
  //Lecture 74.10 define changePassword
  const changePassword = async () => {
    //Lecture 74.11 add try catch
    try {
      //Lecture 74.13 setLoading to true
      setLoading(true);
      //Lecture 74.14 axios post req
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });
      //Lecture 74.15 set error ""
      setError("");
      //Lecture 74.17 navigate to home
      navigate("/");
    } catch (error) {
      //Lecture 74.12 setloading and seterror
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    //Lecture 69.1 class reset_form
    <div className="reset_form" style={{ height: "310px" }}>
      {/* //Lecture 69.1 class reset_form_header */}
      <div className="reset_form_header">Change Password</div>
      {/* //Lecture 69.1 class reset_form_text */}
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        //Lecture 69.6 enableReinitialize
        enableReinitialize
        //Lecture 69.6 initialValues
        initialValues={{
          password,
          conf_password,
        }}
        //Lecture 70.3 validationSchema
        validationSchema={validatePassword}
        //Lecture 74.9 onSubmit
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            {/* //Lecture 69.7 call LoginInput */}
            <LoginInput
              //Lecture 69.7 pass props
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
            {/* //Lecture 69.7 call LoginInput */}
            <LoginInput
              //Lecture 69.7 pass props
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Confirm new password"
              //Lecture 70.6 pass bottom
              bottom
            />
            {/* //Lecture 69.8 rest same */}
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
