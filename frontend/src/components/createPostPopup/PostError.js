import React from "react";

//Lecture 87.4 Create components:createPostPopup:PostError.js
export default function PostError({ error, setError }) {
  return (
    //Lecture 87.6 class postError
    <div className="postError">
      {/* //Lecture 87.6 error div */}
      <div
        //Lecture 89.5 add class postError_error
        className="postError_error"
      >
        {error}
      </div>
      {/* //Lecture 87.6 class blue_btn */}
      <button
        className="blue_btn"
        //Lecture 87.7 setError ""
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </button>
    </div>
  );
}
