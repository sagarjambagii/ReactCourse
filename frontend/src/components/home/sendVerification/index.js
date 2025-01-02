/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
//Lecture 65.9 import style.css
import "./style.css";
//Lecture 65.19 import axios
import axios from "axios";
//Lecture 65.8 Create components:home:sendverification:index.js, RFC
// export default function SendVerification() {
//Lecture 65.21 get the user
export default function SendVerification({ user }) {
  //Lecture 65.13 useState for error, success
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //Lecture 65.16 define sendVerificationLink fn
  const sendVerificationLink = async () => {
    //Lecture 65.17 add try catch
    try {
      //Lecture 65.19 get the data
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //Lecture 65.22 set success message
      setSuccess(data.message);
    } catch (error) {
      //Lecture 65.18 show error message
      setError(error.response.data.message);
    }
  };
  return (
    //Lecture 65.11 class send_verification
    <div className="send_verification">
      {/* //Lecture 65.11 span */}
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      {/* //Lecture 65.12 href link */}
      {/* <a>click here to resend verification link</a> */}
      {/* //Lecture 65.15 add onclick */}
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to resend verification link
      </a>
      {/* //Lecture 65.14 if success show div */}
      {success && <div className="success_text">{success}</div>}
      {/* //Lecture 65.14 if error show div */}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
