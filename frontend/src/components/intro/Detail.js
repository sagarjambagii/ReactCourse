import {
  //Lecture 118.19 import useState
  useState,
} from "react";
import Bio from "./Bio";

//Lecture 118.9 Create components:intro:Detail.js, RFC
export default function Detail({
  //Lecture 118.14 get values header to name
  //Lecture 120.2 remove header
  // header,
  img,
  value,
  //Lecture 118.25 get placeholder and name
  placeholder,
  name,
  //Lecture 119.7 get handleChange
  handleChange,
  //Lecture 119.12 get updateDetails and infos
  updateDetails,
  infos,
  //Lecture 119.25 get the text
  text,
  //Lecture 120.22 get rel
  rel,
}) {
  //Lecture 120.0 Edit details part 3, made setShow false
  //Lecture 118.19 useState for setShow
  const [show, setShow] = useState(true);
  return (
    //Lecture 118.15 emtty div
    <div>
      {/* //Lecture 120.1 remove header div */}
      {/* //Lecture 118.15 class details_header */}
      {/* <div className="details_header">{header}</div> */}
      {/* //Lecture 118.15 class add_details_flex */}
      <div
        className="add_details_flex "
        //Lecture 119.21 onClick setShow to true
        onClick={() => setShow(true)}
      >
        {/* //Lecture 118.16 if values true */}
        {value ? (
          //Lecture 118.17 class info_profile
          <div className="info_profile no_underline">
            {/* //Lecture 118.17 img , value and icon */}
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          //Lecture 118.18 else show icon
          <>
            {/* //Lecture 118.18 else show icon */}
            <i className="rounded_plus_icon"></i>
            {/* Add {header} */}
            {/* //Lecture 119.24 add span and change header to text */}
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {/* //Lecture 118.20 whens show is true  */}
      {show && (
        <Bio
          //Lecture 118.26 pass placeholder and name
          placeholder={placeholder}
          name={name}
          //Lecture 119.8 pass handleChange
          handleChange={handleChange}
          //Lecture 119.13 pass updateDetails and infos
          updateDetails={updateDetails}
          infos={infos}
          //Lecture 119.15 pass detail
          detail
          //Lecture 119.18 pass setShow
          setShow={setShow}
          //Lecture 120.23 pass rel
          rel={rel}
        />
      )}
    </div>
  );
}
