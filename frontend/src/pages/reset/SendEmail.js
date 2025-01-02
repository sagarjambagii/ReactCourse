//Lecture 68.20 import Link
import { Link } from "react-router-dom";
//Lecture 72.25 import axios
import axios from "axios";

//Lecture 68.9 Create pages:reset:SendEmail.js , RFC
// export default function SendEmail() {
//Lecture 68.17 get the user
export default function SendEmail({
  // user
  //Lecture 71.22 get the userINfos
  // userInfos,
  //Lecture 72.21 get the props
  userInfos,
  email,
  error,
  setError,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
}) {
  //Lecture 72.19 define sendEmail fn
  const sendEmail = async () => {
    //Lecture 72.22 add try catch
    try {
      //Lecture 72.24 set the loading to true
      setLoading(true);
      //Lecture 72.25 axios post req
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      //Lecture 72.26 set error ""
      setError("");
      //Lecture 72.27 set visible to 2
      setVisible(2);
      //Lecture 73.16 setLoading to false
      setLoading(false);
    } catch (error) {
      //Lecture 72.23 setLoading and setError
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    //Lecture 68.11 class reset_form dynamic_height
    <div className="reset_form dynamic_height">
      {/* //Lecture 68.11 class reset_form_header */}
      <div className="reset_form_header">Reset Your Password</div>
      {/* //Lecture 68.11 class reset_grid */}
      <div className="reset_grid">
        {/* //Lecture 68.11 class reset_left */}
        <div className="reset_left">
          {/* //Lecture 68.13 reset_form_text */}
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          {/* //Lecture 68.14 label */}
          <label htmlFor="email" className="hover1">
            {/* //Lecture 68.15 input type */}
            <input type="radio" name="" id="email" checked readOnly />
            {/* //Lecture 68.15 class label_col */}
            <div className="label_col">
              <span>Send code via email</span>
              {/* <span>email@email.email</span> */}
              {/* //Lecture 71.23 userInfo .email */}
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        {/* //Lecture 68.12 reset_right */}
        <div className="reset_right">
          {/* //Lecture 68.18 img */}
          {/* <img src={user.picture} alt="" /> */}
          {/* //Lecture 71.24 userInfos.picture */}
          <img src={userInfos.picture} alt="" />
          {/* //Lecture 68.18 span */}
          {/* <span>email@email.email</span> */}
          {/* //Lecture 71.25 userInfo .email   */}
          <span>{userInfos.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {/* //Lecture 72.28 if error  */}
      {error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      {/* //Lecture 68.19 reset form buttons */}
      <div className="reset_form_btns">
        {/* //Lecture 68.20 Link to login */}
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        {/* //Lecture 68.21 submit button */}
        <button
          // type="submit"
          //Lecture 72.18 change it to onClick
          onClick={() => {
            sendEmail();
          }}
          className="blue_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
