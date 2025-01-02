import {
  //Lecture 114.20 import  useref
  useRef,
} from "react";
//Lecture 114.14 import useSelector
import { useSelector } from "react-redux";
//Lecture 114.22 import useClickOutside
import useClickOutside from "../../helpers/clickOutside";
//Lecture 114.0 Select old cover pictures and update, Create pages:profile:OldCovers.js, RFC
export default function OldCovers({
  //Lecture 114.9 get photos
  photos,
  //Lecture 114.12 get setCoverPicture
  setCoverPicture,
  //Lecture 114.17 get setShow
  setShow,
}) {
  //Lecture 114.14 get the user from store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 114.20 define useref
  const Ref = useRef(null);
  //Lecture 114.22 call useClickOutside
  useClickOutside(Ref, () => setShow(false));
  return (
    //Lecture 114.3 class blur
    <div className="blur">
      {/* //Lecture 114.3 class postBox */}
      <div
        className="postBox selectCoverBox"
        //Lecture 114.21 reference it to postbox
        ref={Ref}
      >
        {/* //Lecture 114.3 class box_header */}
        <div className="box_header">
          {/* //Lecture 114.3 class small_circle and icon */}
          <div
            className="small_circle"
            onClick={() => {
              setShow(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          {/* //Lecture 114.4 span select photo*/}
          <span>Select photo</span>
        </div>
        {/* //Lecture 114.5 class selectCoverBox_links*/}
        <div className="selectCoverBox_links">
          {/* //Lecture 114.5 class selectCoverBox_link*/}
          <div className="selectCoverBox_link">Recent Photos</div>
          {/* //Lecture 114.5 class selectCoverBox_link*/}
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        {/* //Lecture 114.10 components:profilePicture:index.js paste here  */}
        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  //Lecture 114.15 get the coverpicture
                  (img) => img.folder === `${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    onClick={() => {
                      //Lecture 114.13 set setCoverPicture
                      setCoverPicture(photo.secure_url);
                      //Lecture 114.18 setShow false
                      setShow(false);
                    }}
                  />
                ))}
          </div>
          <div className="old_pictures">
            {photos &&
              photos
                //Lecture 114.15 get the post_images
                .filter((img) => img.folder !== `${user.username}/post_images`)
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    onClick={() => {
                      //Lecture 114.13 set setCoverPicture
                      setCoverPicture(photo.secure_url);
                      //Lecture 114.18 setShow false
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
