//Lecture 62.8 import dot loader
import PropagateLoader from "react-spinners/PropagateLoader";
//Lecture 62.3 Create pages:home:ActivateForm.js, RFC
// export default function ActivateForm({ type, header, text, loading }) {
//Lecture 62.6 getting the props
export default function ActivateForm({ type, header, text, loading }) {
  return (
    //Lecture 62.7 class blur
    <div className="blur">
      {/* //Lecture 62.7 class popup */}
      <div className="popup">
        {/* //Lecture 62.7 class popup_header */}
        {/* <div className="popup_header">For Testing</div> */}
        <div
          //Lecture 62.10 class for success and error
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        {/* //Lecture 62.7 class popup_message */}
        {/* <div className="popup_message">For Testing</div> */}
        {/* //Lecture 62.12 pass the text */}
        <div className="popup_message">{text}</div>
        {/* //Lecture 62.9 passs color and size in loader */}
        {/* <PropagateLoader color="#1876f2" size={30} loading={true} /> */}
        {/* //Lecture 62.11 pass loading */}
        <PropagateLoader color="#1876f2" size={30} loading={loading} />
      </div>
    </div>
  );
}
