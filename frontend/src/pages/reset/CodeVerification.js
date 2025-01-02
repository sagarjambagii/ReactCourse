//Lecture 68.23 import Formik
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
//Lecture 70.1 import yup
import * as Yup from "yup";
//Lecture 73.18 import axios
import axios from "axios";
//Lecture 68.22 Create pages:reset:CodeVerificaton.js , RFc
export default function CodeVerification({
  // code, setCode, error
  //Lecture 73.13 get the props
  code,
  setCode,
  error,
  loading,
  setLoading,
  setVisible,
  setError,
  userInfos,
}) {
  //Lecture 70.2 define validateCode
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters.")
      .max("5", "Code must be 5 characters."),
  });
  //Lecture 73.19 get the email
  const { email } = userInfos;
  //Lecture 73.10 define verifyCode fn
  const verifyCode = async () => {
    //Lecture 73.11 add trycatch
    try {
      //Lecture 73.15 setLoading to true
      setLoading(true);
      //Lecture 73.18 axios post req
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        //Lecture 73.20 pass email and code
        { email, code }
      );
      //Lecture 73.21 pass email and code
      setVisible(3);
      //Lecture 73.22 seterror to ""
      setError("");
      //Lecture 73.23 setLoading to false
      setLoading(false);
    } catch (error) {
      //Lecture 73.14 setloading and seterror
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    //Lecture 68.23 class reset_form
    <div className="reset_form">
      {/* //Lecture 68.23 class reset_form_header */}
      <div className="reset_form_header">Code verification</div>
      {/* //Lecture 68.23 class reset_form_text */}
      <div className="reset_form_text">
        Please enter code that been sent to your email.
      </div>
      {/* //Lecture 68.23 Formik */}
      <Formik
        //Lecture 68.23 enableReinitialize
        enableReinitialize
        //Lecture 68.23 code
        initialValues={{
          code,
        }}
        //Lecture 70.0 Reset password part 4, validation schema
        validationSchema={validateCode}
        //Lecture 73.10 onSubmit
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            {/* //Lecture 68.23 call LoginInput */}
            <LoginInput
              //Lecture 68.24 pass type, name, onchange, placeholder
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            {/* //Lecture 68.24 error */}
            {error && <div className="error_text">{error}</div>}
            {/* //Lecture 68.24 class reset_form_btns */}
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
