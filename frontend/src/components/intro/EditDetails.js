//Lecture 118.10 import Detail
import Detail from "./Detail";
import {
  //Lecture 120.34 import useref
  useRef,
} from "react";
//Lecture 120.36 import useOnCLickOutside
import useOnCLickOutside from "../../helpers/clickOutside";

//Lecture 118.3 create components:intro:EditDetails.js, RFC
export default function EditDetails({
  //Lecture 118.12 get details
  details,
  //Lecture 119.5 get handleChange
  handleChange,
  //Lecture 119.10 get updateDetails and infos
  updateDetails,
  infos,
  //Lecture 120.31 get setVisible
  setVisible,
}) {
  //Lecture 120.34 define useref
  const modal = useRef(null);
  //Lecture 120.36 call useOnCLickOutside
  useOnCLickOutside(modal, () => setVisible(false));
  return (
    //Lecture 118.6 class blur
    <div className="blur">
      {/* //Lecture 118.7 class postBox infosBox */}
      <div
        className="postBox infosBox"
        //Lecture 120.35 onclick close popup
        ref={modal}
      >
        {/* //Lecture 118.7 class box_header */}
        <div className="box_header">
          {/* //Lecture 118.7 class small_circle and icon */}
          <div
            className="small_circle"
            //Lecture 120.33 onclick close popup
            onClick={() => setVisible(false)}
          >
            <i className="exit_icon"></i>
          </div>
          {/* //Lecture 118.7 span */}
          <span>Edit Details</span>
        </div>
        {/* //Lecture 118.8 class details_wrapper */}
        <div className="details_wrapper scrollbar">
          {/* //Lecture 118.8 class details_col */}
          <div className="details_col">
            {/* //Lecture 118.8 span and span */}
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          {/* //Lecture 120.3 add it here */}
          <div className="details_header">Other Name</div>
          {/* //Lecture 118.10 call Detail */}
          <Detail
            //Lecture 118.13 pass  header to img
            //Lecture 120.4 remove header
            // header="Other Name"
            value={details?.otherName}
            img="studies"
            //Lecture 118.24 pass placeholder and name
            placeholder="add other name"
            name="otherName"
            //Lecture 119.6 pass it to component
            handleChange={handleChange}
            //Lecture 119.11 pass updateDetails and infos
            updateDetails={updateDetails}
            infos={infos}
            //Lecture 119.26 pass text
            text="other Name"
          />
          {/* //Lecture 120.5 class details_header for work */}
          <div className="details_header">Work</div>
          <Detail
            //Lecture 120.6 pass value to infos
            value={details?.job}
            img="job"
            placeholder="Add job title"
            name="job"
            text="a job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          {/* //Lecture 120.7 workplace  */}
          <Detail
            //Lecture 120.8 pass value to infos
            value={details?.workplace}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            text="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          {/* //Lecture 120.9 class details_header, education */}
          <div className="details_header">Education</div>
          <Detail
            //Lecture 120.10 pass value  to infos
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            text="a high school"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          {/* //Lecture 120.11 collage */}
          <Detail
            //Lecture 120.12 pass value  to infos
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          {/* //Lecture 120.13 class details_header, currentCity */}
          <div className="details_header">Current City</div>
          <Detail
            //Lecture 120.14 pass value  to infos
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            text="a current city"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          {/* //Lecture 120.15 class details_header, Hometown */}
          <div className="details_header">Hometown</div>
          <Detail
            //Lecture 120.16 pass value  to infos
            value={details?.hometown}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            text="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          {/* //Lecture 120.17 class details_header, Relationship */}
          <div className="details_header">Relationship</div>
          <Detail
            //Lecture 120.18 pass value to infos
            value={details?.relationship}
            img="relationship"
            placeholder="Add instagram"
            name="relationship"
            text="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            //Lecture 120.21 pass rel
            rel
          />
          {/* //Lecture 120.19 class details_header ,Instagram */}
          <div className="details_header">Instagram</div>
          <Detail
            //Lecture 120.20 pass value to infos
            value={details?.instagram}
            img="home"
            placeholder="Add instagram"
            name="instagram"
            text="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
        </div>
      </div>
    </div>
  );
}
