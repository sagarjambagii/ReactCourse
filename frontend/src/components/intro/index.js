//Lecture 115.4 import useState
import {
  useState,
  //Lecture 117.23 import useEffect
  useEffect,
} from "react";
//Lecture 115.1 import style.css
import "./style.css";
//Lecture 116.11 import bio
import Bio from "./Bio";
//Lecture 117.11 import axios
import axios from "axios";
//Lecture 117.20 import useSelector
import { useSelector } from "react-redux";
//Lecture 118.5 import EditDetails
import EditDetails from "./EditDetails";
//Lecture 115.0 Display profile infos intro part 1, Create components:intro folder:index.js:style.css, RFC
export default function Intro({
  //Lecture 115.7 get details
  // details,
  //Lecture 117.19 make ss to detailss
  detailss,
  //Lecture 116.2 get visitor
  visitor,
  //Lecture 120.45 get setOthername
  setOthername,
}) {
  //Lecture 117.20 get the user
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 117.21 create state for details
  const [details, setDetails] = useState();
  //Lecture 118.4 useState for setVisible
  // const [visible, setVisible] = useState(1);
  //Lecture 120.29 visible make it false
  const [visible, setVisible] = useState(false);
  //Lecture 117.23 useEffect to avoid null
  useEffect(() => {
    setDetails(detailss);
    //Lecture 119.22 setInfos
    setInfos(detailss);
  }, [detailss]);
  //Lecture 115.5 Create obj initial
  const initial = {
    //Lecture 115.8 check if value exists bio to instagram
    // bio: details?.bio ? details.bio : "",
    // otherName: details?.otherName ? details.otherName : "",
    // job: details?.job ? details.job : "",
    // workplace: details?.workplace ? details.workplace : "Google",
    // highSchool: details?.highSchool ? details.highSchool : "some high school",
    // college: details?.college ? details.college : "some college",
    // currentCity: details?.currentCity ? details.currentCity : "Tanger",
    // hometown: details?.hometown ? details.hometown : "Morocco",
    // relationship: details?.relationship ? details.relationship : "Single",
    // instagram: details?.instagram ? details.instagram : "med_hajji7",
    //Lecture 117.16 empty all values
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  //Lecture 115.4 useState for setInfos
  const [infos, setInfos] = useState(initial);
  //Lecture 116.9 useState for bio
  //Lecture 117.16 make it false
  const [showBio, setShowBio] = useState(false);
  //Lecture 116.25 useState for setMax
  const [max, setMax] = useState(
    //Lecture 116.29 calculate max
    infos?.bio ? 100 - infos?.bio.length : 100
  );
  //Lecture 119.0 Edit details part 2, Cut the handleBioChange fn
  //Lecture 116.17 define handleBioChange fn
  // const handleBioChange = (e) => {
  //   //Lecture 116.30 setInfos, spread and add value
  //   setInfos({ ...infos, bio: e.target.value });
  //   //Lecture 116.31 set setMax
  //   setMax(100 - e.target.value.length);
  // };
  //Lecture 117.8 define updateDetails fn
  const updateDetails = async () => {
    //Lecture 117.9 add trycatch
    try {
      console.log("sent");
      //Lecture 117.11 extracct data
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          //Lecture 117.12 send infos as body
          infos,
        },
        {
          //Lecture 117.18 pass headers
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //Lecture 117.17 set setShowBio to false
      setShowBio(false);
      //Lecture 117.22 set the details to new data
      setDetails(data);
      //Lecture 120.46 after getting the data set
      setOthername(data.otherName);
    } catch (error) {
      //Lecture 117.10 return error message
      console.log(error.response.data.message);
    }
  };
  // console.log(details);
  //Lecture 118.27 Create handleChange fn
  const handleChange = (e) => {
    //Lecture 118.28 extrac name and value
    const { name, value } = e.target;
    //Lecture 118.29 setInfos
    setInfos({ ...infos, [name]: value });
    //Lecture 118.31 setMax
    setMax(100 - e.target.value.length);
  };
  return (
    //Lecture 115.3 class profile_card
    <div className="profile_card">
      {/* //Lecture 115.3 class profile_card_header */}
      <div className="profile_card_header">Intro</div>
      {/* //Lecture 116.0 Display profile infos intro part 2 , if bio exists*/}
      {/* {infos?.bio && !showBio && ( */}
      {/* //Lecture 117.17 change it to details  */}
      {details?.bio && !showBio && (
        <div className="info_col">
          {/* //Lecture 117.17 change it to details  */}
          <span className="info_text">{details.bio}</span>
          {/* //Lecture 116.3 if not visitor  */}
          {!visitor && (
            //Lecture 116.4 button to edit bio
            <button
              className="gray_btn hover1"
              //Lecture 116.35 add onlclick for edit
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {/* //Lecture 118.0 Edit details part 1, add bio */}
      {!details?.bio && !showBio && !visitor && (
        //Lecture 118.1 add button
        <button
          className="gray_btn hover1 w100"
          //Lecture 118.2 add onClick
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {/* //Lecture 116.10 if true */}
      {showBio && (
        //Lecture 116.11 call bio
        <Bio
          //Lecture 116.14 pass infos
          infos={infos}
          //Lecture 116.26 pass it to bio
          max={max}
          //Lecture 116.18 pass handleBioChange
          // handleBioChange={handleBioChange}
          //Lecture 118.30 pass it to handleChange
          // handleBioChange={handleChange}
          //Lecture 119.1 change name
          handleChange={handleChange}
          //Lecture 116.32 pass setShowBio
          setShowBio={setShowBio}
          //Lecture 117.13 pass updateDetails
          updateDetails={updateDetails}
          //Lecture 118.23 pass bio and name
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {/* //Lecture 115.9 if infos.job have  */}
      {/* {infos.job && infos.workplace ? ( */}
      {/* //Lecture 117.17 change it to details  */}
      {details?.job && details?.workplace ? (
        //Lecture 115.9 class info_profile
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          {/* works as {infos.job} at <b>{infos.workplace}</b> */}
          {/* //Lecture 117.17 change it to details  */}
          works as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : //Lecture 115.10 job exist but not workplace
      // infos.job && !infos.workplace ? (
      //Lecture 117.17 change it to details
      details?.job && !details?.workplace ? (
        //Lecture 115.10 class info_profile
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          {/* works as {infos.job} */}
          {/* //Lecture 117.17 change it to details */}
          works as {details?.job}
        </div>
      ) : (
        //Lecture 115.11 job not exist but  workplace exist
        // infos.workplace &&
        // !infos.job && (
        //Lecture 117.17 change it to details
        details?.workplace &&
        !details?.job && (
          //Lecture 115.11 class info_profile
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            {/* works at {infos.workplace} */}
            {/* //Lecture 117.17 change it to details */}
            works at {details?.workplace}
          </div>
        )
      )}
      {/* //Lecture 115.18 relationship */}
      {/* {infos?.relationship && ( */}
      {/* //Lecture 117.17 change it to details */}
      {details?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {/* {infos.relationship} */}
          {/* //Lecture 117.17 change it to details */}
          {details?.relationship}
        </div>
      )}
      {/* //Lecture 115.12 college */}
      {/* {infos?.college && ( */}
      {/* //Lecture 117.17 change it to details */}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          {/* studied at {infos.college} */}
          {/* //Lecture 117.17 change it to details */}
          studied at {details?.college}
        </div>
      )}
      {/* //Lecture 115.13 highSchool */}
      {/* {infos?.highSchool && ( */}
      {/* //Lecture 117.17 change it to details */}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          {/* studied at {infos.highSchool} */}
          {/* //Lecture 117.17 change it to details */}
          studied at {details?.highSchool}
        </div>
      )}
      {/* //Lecture 115.14 currentCity */}
      {/* {infos?.currentCity && ( */}
      {/* //Lecture 117.17 change it to details */}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          {/* Lives in {infos.currentCity} */}
          {/* //Lecture 117.17 change it to details */}
          Lives in {details?.currentCity}
        </div>
      )}
      {/* //Lecture 115.15 hometown */}
      {/* {infos?.hometown && ( */}
      {/* //Lecture 117.17 change it to details */}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          {/* From {infos.hometown} */}
          {/* //Lecture 117.17 change it to details */}
          From {details?.hometown}
        </div>
      )}
      {/* //Lecture 115.16 hometown */}
      {/* {infos?.instagram && ( */}
      {/* //Lecture 117.17 change it to details */}
      {details?.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          {/* //Lecture 115.17 Link */}
          <a
            // href={`https://www.instagram.com/${infos.instagram}`}
            //Lecture 117.17 change it to details
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {/* {infos.instagram} */}
            {/* //Lecture 117.17 change it to details */}
            {details?.instagram}
          </a>
        </div>
      )}
      {/* //Lecture 116.5 if not visitor, add Edit Details */}
      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          //Lecture 120.32 onclick open popup
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {/* //Lecture 118.5 add edit details and call edit details */}
      {visible && !visitor && (
        <EditDetails
          //Lecture 118.11 pass details
          details={details}
          //Lecture 119.2 pass handleChange
          handleChange={handleChange}
          //Lecture 119.9 pass updateDetails and infos
          updateDetails={updateDetails}
          infos={infos}
          //Lecture 120.30 pass setVisible
          setVisible={setVisible}
        />
      )}
      {/* //Lecture 116.6 if not visitor, add Add Hobbies */}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {/* //Lecture 116.7 if not visitor, add Add Featured */}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
}
