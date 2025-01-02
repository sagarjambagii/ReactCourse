//Lecture 105.18 import axios
import axios from "axios";
import {
  //Lecture 105.13 import useEffect
  useEffect,
  useReducer,
} from "react";
//Lecture 105.12 import photosReducer
import { photosReducer } from "../../functions/reducers";

//Lecture 105.3 Create pages:profile:Photos.js, RFC
export default function Photos({
  //Lecture 105.23 get username to token
  username,
  token,
  //Lecture 110.4 get the photos
  photos,
}) {
  //Lecture 110.0 Get old profile pictures and others and update using it, remove loading reducer
  //Lecture 105.12 get the data
  // const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
  //   loading: false,
  //   photos: {},
  //   error: "",
  // });
  //Lecture 110.1 remove useEffect
  //Lecture 105.13 when page loads
  // useEffect(() => {
  //   //Lecture 105.20 call getPhotos
  //   getPhotos();
  // }, [username]);
  //Lecture 105.18 path to sort
  //Lecture 110.11 cut data to sort
  // const path = `${username}/*`;
  // const max = 30;
  // const sort = "desc";

  //Lecture 110.2 remove dispatch trycatch
  //Lecture 110.6 cut the data request
  // //Lecture 105.14 define getPhotos
  // const getPhotos = async () => {
  //   //Lecture 105.15 add trycatch
  //   try {
  //     //Lecture 105.17 PHOTOS_REQUEST
  //     dispatch({
  //       type: "PHOTOS_REQUEST",
  //     });
  //     //Lecture 105.18 get the data and pass url
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BACKEND_URL}/listImages`,
  //       { path, sort, max },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     //Lecture 105.19 send data PHOTOS_SUCCESS
  //     dispatch({
  //       type: "PHOTOS_SUCCESS",
  //       payload: data,
  //     });
  //   } catch (error) {
  //     //Lecture 105.16 return PHOTOS_ERROR
  //     dispatch({
  //       type: "PHOTOS_ERROR",
  //       payload: error.response.data.message,
  //     });
  //   }
  // };
  //Lecture 105.21 cl
  // console.log("---->", photos);
  return (
    //Lecture 105.5 class profile_card
    <div className="profile_card">
      {/* //Lecture 105.5 class profile_card_header */}
      <div className="profile_card_header">
        Photos
        {/* //Lecture 105.5 class profile_header_link */}
        <div className="profile_header_link">See all photos</div>
      </div>
      {/* //Lecture 105.22 class profile_card_count */}
      <div className="profile_card_count">
        {/* //Lecture 105.23 if count 0 ,1, many */}
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      {/* //Lecture 105.24 class profile_card_grid */}
      <div className="profile_card_grid">
        {/* //Lecture 105.25 check if exists and map */}
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            //Lecture 105.26 class profile_photo_card
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
