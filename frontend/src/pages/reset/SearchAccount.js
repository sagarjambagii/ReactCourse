//Lecture 68.4 paste imports
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
//Lecture 69.10 import yup
import * as Yup from "yup";
//Lecture 71.17 import axios
import axios from "axios";
//Lecture 68.2 Create pages:reset:searchAccount.js, RFC
// export default function SearchAccount() {
//Lecture 68.7 get from props
export default function SearchAccount({
  email,
  setEmail,
  error,
  //Lecture 71.13 get setError, setLoading, setUserInfos,setVisible
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  //Lecture 69.10 define validatePassword
  const validateEmail = Yup.object({
    //Lecture 69.11 validate email
    email: Yup.string()
      .required("Email address ir required.")
      .email("Must be a valid email address.")
      .max(50, "Email address can't be more than 50 characters."),
  });
  //Lecture 71.10 define handle fn
  const handleSearch = async () => {
    //Lecture 71.14 add try catch
    try {
      //Lecture 71.16 set loading to true
      setLoading(true);

      //Lecture 71.17 get the data
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      //Lecture 71.18 set userinfo
      setUserInfos(data);
      //Lecture 71.19 set visible to 1
      setVisible(1);
      //Lecture 71.20 set error ""
      setError("");
      //Lecture 73.17 setLoading to false
      setLoading(false);
    } catch (error) {
      //Lecture 71.15 setloading and error
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    //Lecture 68.3 paste reset_form
    <div className="reset_form">
      {/* //Lecture 67.12 class reset_form_header */}
      <div className="reset_form_header">Find Your Account</div>
      {/* //Lecture 67.12 class reset_form_text */}
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      {/* //Lecture 67.13 Formik */}
      <Formik
        //Lecture 67.14 enableReinitialize
        enableReinitialize
        //Lecture 67.14 initialValues
        initialValues={{
          email,
        }}
        //Lecture 69.9 validation Schema
        validationSchema={validateEmail}
        //Lecture 71.9 add on submit
        onSubmit={() => {
          handleSearch();
        }}
      >
        {/* //Lecture 67.16 formik return  */}
        {(formik) => (
          <Form>
            {/* //Lecture 67.17 call login input */}
            <LoginInput
              //Lecture 67.17 pass type name,onChang, placeholder
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {/* //Lecture 67.19 error */}
            {error && <div className="error_text">{error}</div>}
            {/* //Lecture 67.20 class reset_form_btns */}
            <div className="reset_form_btns">
              {/* //Lecture 67.20 Link to cancel */}
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              {/* //Lecture 67.20 submit button */}
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
