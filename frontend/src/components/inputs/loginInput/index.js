//Lecture 32.1 import style.css
import "./style.css";
//Lecture 32.10 import useField
//Lecture 33.4 import error message from formik
import { useField, ErrorMessage } from "formik";
//Lecture 34.0 Login and Register page part 4 (responsiveness), npm i react-responsive
import { useMediaQuery } from "react-responsive";

//Lecture 32.0 Login and Register page part 2 (Formik), Create Components folder:home,inputs:logininput,registerinput:index.js
//Lecture 32.6 extract placeholder
// export default function LoginInput({ placeholder }) {
//Lecture 32.9 get the rest of the props
// export default function LoginInput({ placeholder, ...props }) {
//Lecture 33.13 get the bottom
export default function LoginInput({ placeholder, bottom, ...props }) {
  //Lecture 32.10 use field from formik
  const [field, meta] = useField(props);
  //Lecture 34.1 check desktopview or not
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  //Lecture 70.7 view 1050
  const view1050 = useMediaQuery({
    query: "(max-width: 1050px)",
  });
  //Lecture 32.1 RFC
  return (
    //Lecture 32.3 Adding class name
    <div className="input_wrap">
      {/* //Lecture 33.4 error message from formik */}
      {/* <div>
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div> */}
      {/* //Lecture 33.9 Adding classname input_error */}
      {/* <div className="input_error">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div> */}
      {/* //Lecture 33.11 only when meta touched */}
      {/* {meta.touched && meta.error && (
        <div className="input_error">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      )} */}
      {/* //Lecture 33.14 if bottom is false show top */}
      {meta.touched && meta.error && !bottom && (
        // <div className="input_error">
        //Lecture 33.18 add transition
        <div
          // className="input_error"
          //Lecture 34.2 input error on left for desktop
          className={
            //Lecture 70.9 first element
            desktopView && view1050 && field.name === "password"
              ? //Lecture 70.9 first element
                "input_error input_error_desktop err_res_password"
              : desktopView
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {/* //Lecture 33.17 Adding Arrow */}
          {meta.touched && meta.error && (
            <div
              // className="error_arrow_top"
              //Lecture 34.4 arrow for desktopview
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      {/* //Lecture 32.3 input html */}
      {/* <input type="text"></input> */}
      <input
        //Lecture 33.7 add classname
        className={meta.touched && meta.error ? "input_error_border" : ""}
        //Lecture 32.12 get type and name values
        type={field.type}
        name={field.name}
        //Lecture 32.4 placeholder text
        // placeholder="Email address or mobile number"
        //Lecture 32.6 assign placeholder value
        placeholder={placeholder}
        //Lecture 32.11 spread the properties of field and props
        {...field}
        {...props}
      />
      {/* //Lecture 33.15 if bottom is true show top */}
      {meta.touched && meta.error && bottom && (
        // <div className="input_error">
        //Lecture 33.18 add transition
        <div
          // className="input_error"
          className={
            //Lecture 70.8 if true contuie else add div
            desktopView && view1050 && field.name === "conf_password"
              ? //Lecture 70.8 if true contuie else add div
                "input_error conf_password_error"
              : desktopView
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {/* //Lecture 33.17 Adding Arrow */}
          {meta.touched && meta.error && (
            <div
              // className="error_arrow_bottom"
              //Lecture 34.4 arrow for desktopview
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {/* //Lecture 33.8 Adding icon */}
      {/* {meta.touched && meta.error && <i className="error_icon"></i>} */}
      {/* //Lecture 33.16 Adding style */}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          // style={{ top: `${!bottom && "63%"}` }}
          //Lecture 34.3 desktop fix for icon
          style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
}
