import { useMediaQuery } from "react-responsive";

//Lecture 41.12 Create DateofBirthSelect
export default function DateOfBirthSelect(
  //Lecture 41.16 extract from props
  { bDay, bMonth, bYear, days, months, years, handleRegisterChange, dateError }
) {
  //Lecture 41.21 media query
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  //Lecture 41.14 paste register Grid
  return (
    <div
      className="reg_grid"
      //Lecture 41.22 adding style
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {/* //Lecture 41.8 showing date error */}
      {/* {dateError && <div className={"input_error"}> {dateError}</div>} */}
      {/* //Lecture 41.20 adding arrow */}
      {/* {dateError && (
        <div className={"input_error"}>
          //Lecture 41.20 adding arrow
          <div className="error_arrow_bottom"></div>
          {dateError}
        </div>
      )} */}
      {/* //Lecture 41.27 style for gender error */}
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
