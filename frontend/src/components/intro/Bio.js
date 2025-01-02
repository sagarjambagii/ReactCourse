//Lecture 116.8 Create components:intro:Bio.js , RFC
export default function Bio({
  //Lecture 116.15 get infos
  infos,
  //Lecture 116.19 get handleBioChange
  // handleBioChange,
  //Lecture 119.3 change the name
  handleChange,
  //Lecture 116.27 get max
  max,
  //Lecture 116.33 get setShowBio
  setShowBio,
  //Lecture 117.14 get updateDetails
  updateDetails,
  //Lecture 118.22 get the bio and name
  placeholder,
  name,
  //Lecture 119.16 get detail
  detail,
  //Lecture 119.19 get setShow
  setShow,
  //Lecture 120.24 get rel
  rel,
}) {
  return (
    //Lecture 116.12 add class add_bio_wrap
    <div className="add_bio_wrap">
      {/* //Lecture 120.25 if rel true */}
      {rel ? (
        //Lecture 120.26 add select
        <select
          //Lecture 120.27 pass class to onchange
          className="select_rel"
          name={name}
          value={infos.relationship}
          onChange={handleChange}
        >
          {/* //Lecture 120.28 option value */}
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        //Lecture 116.12 add textarea
        <textarea
          //Lecture 116.13 placeholder
          // placeholder="Add Bio"
          //Lecture 118.21 prop bio and name
          placeholder={placeholder}
          // name="bio"
          //Lecture 118.22 set name as prop
          name={name}
          //Lecture 116.16 value to className
          // value={infos?.bio}
          //Lecture 119.14 infos.name as property
          value={infos?.[name]}
          // maxLength="100"
          //Lecture 120.37 check for detail
          maxLength={detail ? 25 : 100}
          className="textarea_blue details_input"
          //Lecture 116.20 add onChange
          // onChange={handleBioChange}
          //Lecture 119.4 change the name
          onChange={handleChange}
        ></textarea>
      )}

      {/* //Lecture 119.17 when we have detail  */}
      {!detail && (
        //Lecture 116.21 class remaining
        <div className="remaining">
          {/* //Lecture 116.28 show max */}
          {max} characters remaining
        </div>
      )}
      {/* //Lecture 116.22 class flex */}
      <div className="flex">
        {/* //Lecture 116.22 class flex_left and icon */}
        <div className="flex flex_left">
          <i className="public_icon"></i>Public
        </div>
        {/* //Lecture 116.23 class flex_right */}
        <div className="flex flex_right">
          {/* //Lecture 116.24 class gray_btn */}
          <button
            className="gray_btn"
            //Lecture 116.34 add onlclick
            onClick={() =>
              // {setShowBio(false)}
              //Lecture 119.20 if we are in detail
              !detail ? setShowBio(false) : setShow(false)
            }
          >
            Cancel
          </button>
          {/* //Lecture 116.24 Save gray_btn */}
          <button
            className="blue_btn"
            //Lecture 117.15 add onClick
            onClick={() => {
              updateDetails();
              //Lecture 119.23 after update setShow false
              setShow(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
