/* //Lecture 37.5 import Formik */
import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
//Lecture 39.2 import Yup
import * as Yup from "yup";
//Lecture 41.14 import date of birth select
import DateOfBirthSelect from "./DateOfBirthSelect";
//Lecture 41.17  import genderSelect
import GenderSelect from "./GenderSelect";
//Lecture 42.4 npm i react-spinners, npm react spinners from website, Dotloader
import DotLoader from "react-spinners/DotLoader";
//Lecture 42.8 npm i axios
import axios from "axios";
//Lecture 42.17 import useDispatch from react redux
import { useDispatch } from "react-redux";
//Lecture 42.19 npm i js-cookie
import Cookies from "js-cookie";
//Lecture 42.21 import use navigate
import { useNavigate } from "react-router-dom";

//Lecture 37.0 Register form, create Components:login:RegisterForm.js, RFC
// export default function RegisterForm() {
//Lecture 43.6 get setVisible prop
export default function RegisterForm({ setVisible }) {
  //Lecture 42.16 dispatch login
  const dispatch = useDispatch();
  //Lecture 42.22 define useNavigate
  const navigate = useNavigate();
  //Lecture 37.16 Create userInfos object
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // bYear: "",
    //Lecture 38.0 Working with dates for birthday, current year
    bYear: new Date().getFullYear(),
    // bMonth: "",
    //Lecture 38.0 current month
    bMonth: new Date().getMonth() + 1,
    // bDay: "",
    //Lecture 38.0 current day
    bDay: new Date().getDate(),
    gender: "",
  };
  //Lecture 37.13 Create useState for user
  // const [user, setUser] = useState();
  //Lecture 37.15 pass userInfos in useState
  const [user, setUser] = useState(userInfos);
  //Lecture 38.1 extract all information
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  //Lecture 38.13 stop byear from changing
  const yearTemp = new Date().getFullYear();
  //Lecture 37.11 define handleRegisterChange
  const handleRegisterChange = (e) => {
    //Lecture 37.12 get name and value
    const { name, value } = e.target;
    //Lecture 37.14 setUser values
    setUser({ ...user, [name]: value });
  };
  //Lecture 38.2 array of all years from 1915
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  //Lecture 38.5 array of all months
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  //Lecture 38.8 get number of days
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  //Lecture 38.10 array of all days
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  //Lecture 39.3 register validation funtion
  const registerValidation = Yup.object({
    //Lecture 39.4 validation for first name
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    //Lecture 39.5 validation for last_name
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    //Lecture 39.6 validation for email
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    //Lecture 39.7 validation for password
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });
  //Lecture 41.6 useState for date
  const [dateError, setDateError] = useState("");
  //Lecture 41.10 useState for gender
  const [genderError, setGenderError] = useState("");

  //Lecture 42.2 Use state for error, success and loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //Lecture 42.6 by default value is false, make it true to show
  const [loading, setLoading] = useState(false);
  //Lecture 42.1 Register submit async funtion
  const registerSubmit = async () => {
    //Lecture 42.7 adding try catch block
    try {
      //Lecture 42.10 get the data
      const { data } = await axios.post(
        //Lecture 42.11 backend route
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        //Lecture 42.12 all the data to signup
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      //Lecture 42.13 set the error and success
      setError("");
      setSuccess(data.message);
      //Lecture 42.14 remove message from data
      const { message, ...rest } = data;
      //Lecture 42.15 await 2 sec so user see meesage
      setTimeout(() => {
        //Lecture 42.18 dispatch action
        dispatch({ type: "LOGIN", payload: rest });
        //Lecture 42.20 set the cookies
        Cookies.set("user", JSON.stringify(rest));
        //Lecture 42.23 redirect from register to home page
        navigate("/");
      });
    } catch (error) {
      //Lecture 42.9 when we have error
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  //Lecture 37.0 Register form, create Components:login:RegisterForm.js, RFC
  return (
    // <div>RegisterForm</div>
    //Lecture 37.2 Add blur background
    <div className="blur">
      {/* //Lecture 37.3 register html */}
      <div className="register">
        {/* //Lecture 37.4 html */}
        <div className="register_header">
          {/* //Lecture 37.4 icon ,span */}
          <i
            className="exit_icon"
            //Lecture 43.7 add onclick, to setvisble to false
            onClick={() => setVisible(false)}
          ></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        {/* //Lecture 37.5 Formik */}
        <Formik
          ///Lecture 39.0 Register form validation, enableReinitialize and initial values
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          //Lecture 39.1 validation schema
          validationSchema={registerValidation}
          //Lecture 41.0 Finish register error handling and fix errors
          onSubmit={() => {
            //Lecture 41.1 get the current date
            let current_date = new Date();
            //Lecture 41.2 picked date
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            //Lecture 41.3 atleast 14 and 70
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            //Lecture 41.4 underage validation
            if (current_date - picked_date < atleast14) {
              //Lecture 41.7 set date error
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            }
            //Lecture 41.5 overage validation
            else if (current_date - picked_date > noMoreThan70) {
              //Lecture 41.7 set date error
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            }
            //Lecture 41.9 if gender is empty
            else if (gender === "") {
              //Lecture 41.23 set data error to nothing
              setDateError("");
              //Lecture 41.11 setGender error
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            }
            //Lecture 41.24 setting dataerror and gender error to nothing
            else {
              setDateError("");
              setGenderError("");
              //Lecture 42.0 Register submit
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            //Lecture 37.6 add classname register_form
            <Form className="register_form">
              {/* //Lecture 37.7 inputs inside reg_line */}
              <div className="reg_line">
                {/* //Lecture 37.9 call register input */}
                <RegisterInput
                  //Lecture 37.10 pass type, name, placeholder,onChange
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                {/* //Lecture 37.17 input for surname */}
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              {/* //Lecture 37.18 another reg_line */}
              <div className="reg_line">
                {/* //Lecture 37.19 input for Mobile number or email address */}
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              {/* //Lecture 37.20 another reg_line */}
              <div className="reg_line">
                {/* //Lecture 37.21 input for New password */}
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              {/* //Lecture 37.22 add reg_col */}
              <div className="reg_col">
                {/* //Lecture 37.23 add reg_line_header */}
                <div className="reg_line_header">
                  {/* //Lecture 37.24 add icon */}
                  Date of birth <i className="info_icon"></i>
                </div>
                {/* //Lecture 37.25 grid for columns for birthdate */}
                {/* //Lecture 41.14 Cut register Grid */}
                {/* <div className="reg_grid">
                //Lecture 37.26 select for dau month year 
                  <select
                    name="bDay"
                    //Lecture 38.11 default value for bday
                    value={bDay}
                    //Lecture 38.9 add onChange
                    onChange={handleRegisterChange}
                  >
                 //Lecture 38.12 map through all days
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    //Lecture 38.6 value by default for bmonth
                    value={bMonth}
                    //Lecture 38.9 add onChange
                    onChange={handleRegisterChange}
                  >
                    //Lecture 38.7 map through all months 
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    //Lecture 38.3 value by default for byear
                    value={bYear}
                    //Lecture 38.9 add onChange
                    onChange={handleRegisterChange}
                  >
                 //Lecture 38.4 map through all years 
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* //Lecture 41.14 Cut register Grid */}
                <DateOfBirthSelect
                  //Lecture 41.15 pass all the parameters
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              {/* //Lecture 37.26 add reg_col  */}
              <div className="reg_col">
                {/* //Lecture 37.27 add reg_line_header */}
                <div className="reg_line_header">
                  {/* //Lecture 37.28 add icon */}
                  Gender <i className="info_icon"></i>
                </div>
                {/* //Lecture 37.29 grid for columns for gender */}
                {/* //Lecture 41.17 cut the gender grid */}
                {/* <div className="reg_grid">
                 //Lecture 37.30 label 
                  <label htmlFor="male">
                    Male
                 //Lecture 37.31 input type radio, id, value, onchange
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
               //Lecture 37.32 label for female
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
               //Lecture 37.33 label for custom 
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div> */}
                {/* //Lecture 41.17 cut the gender grid */}
                <GenderSelect
                  //Lecture 41.18 pass all the parameters
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              {/* //Lecture 37.34 text */}
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              {/* //Lecture 37.35 reg_btn_wrapper */}
              <div className="reg_btn_wrapper">
                {/* //Lecture 37.36 signup button */}
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              {/* //Lecture 42.5 adding loader */}
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {/* //Lecture 42.3 when we have an error */}
              {error && <div className="error_text">{error}</div>}
              {/* //Lecture 42.3 when we have success */}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
