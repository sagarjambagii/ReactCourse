import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";
//Lecture 37.8 Create registerinput folder:index.js, copy from Login input
export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  //Lecture 40.5 break points
  // const desktopView = useMediaQuery({
  //   query: "(min-width: 850px)",
  // });
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  //Lecture 40.5 break points
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  //Lecture 40.5 break points
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  //Lecture 40.9 creating test1 and test 2
  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";

  return (
    //Lecture 40.3 add classname register_input_wrap
    // <div className="input_wrap">
    <div className="input_wrap register_input_wrap">
      {/* //Lecture 40.0 Register form error handling ,Remove above error popup*/}
      {/* {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )} */}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        //Lecture 40.4 adding style to fix width for firstname and lastname
        style={{
          //Lecture 40.6 width for first and last name with turnary
          width: `${
            view1 && (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view1 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "300px"
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {/* //Lecture 40.1 Remove bottom validation */}
      {/* {meta.touched && meta.error && bottom && ( */}
      {meta.touched && meta.error && (
        <div
          //Lecture 40.7 classname view3
          // className={
          //   desktopView ? "input_error input_error_desktop" : "input_error"
          // }
          className={view3 ? "input_error input_error_desktop" : "input_error"}
          style={{
            transform: "translateY(2px)",
            //Lecture 40.8 adding left, if test1 and test 2 is true
            left: `${test1 ? "-107%" : test2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              //Lecture 40.7 classname view3
              className={
                // desktopView ? "error_arrow_left" : "error_arrow_bottom"
                //Lecture 40.9 field.name not equal to lastname
                // view3 ? "error_arrow_left" : "error_arrow_bottom"
                view3 && field.name !== "last_name"
                  ? "error_arrow_left"
                  : //Lecture 40.10 field.name equal to lastname
                  view3 && field.name === "last_name"
                  ? "error_arrow_right"
                  : !view3 && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon"
          //Lecture 40.2 Remove the style to fix icon
          // style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
}
