//Lecture 41.25 import media query
import { useMediaQuery } from "react-responsive";

//Lecture 41.13 Create GenderSelect
export default function GenderSelect({
  //Lecture 41.19 extract from props
  handleRegisterChange,
  genderError,
}) {
  //Lecture 41.25 media query for gender select
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  //Lecture 41.17 paste the gender grid
  return (
    <div
      className="reg_grid"
      //Lecture 41.26 style for gender error
      style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
    >
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegisterChange}
        />
      </label>
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
      {/* //Lecture 41.8 showing date error */}
      {/* {dateError && <div className={"input_error"}> {dateError}</div>} */}
      {/* //Lecture 41.26 style for gender error */}
      {/* {dateError && (
        <div className={"input_error"}>
          <div className="error_arrow_bottom"></div>
          {dateError}
        </div>
      )} */}
      {/* //Lecture 41.28 adding view 3 */}
      {genderError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
