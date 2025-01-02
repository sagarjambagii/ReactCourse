import {
  //Lecture 106.6 import useRef
  useRef,
  //Lecture 106.13 import useState
  useState,
} from "react";
//Lecture 106.1 import style.css
import "./style.css";
//Lecture 106.23 import UpdateProfilePicture
import UpdateProfilePicture from "./UpdateProfilePicture";
//Lecture 109.31 import useOnClickOutside
import useOnClickOutside from "../../helpers/clickOutside";
//Lecture 110.20 import useSelector
import { useSelector } from "react-redux";
//Lecture 106.0 Update profile picture part 1, Create components:profiePicture folder:index.js,style.css, RFC
export default function ProfilePicture({
  //Lecture 109.3 get setShow
  setShow,
  //Lecture 109.19 get pref
  pRef,
  //Lecture 110.18 get photos
  photos,
}) {
  //Lecture 109.29 define popup
  const popup = useRef(null);
  //Lecture 110.20 get the userfrom store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 109.31 call useOnClickOutside
  useOnClickOutside(popup, () => setShow(false));
  //Lecture 106.6 useRef for refInput
  const refInput = useRef(null);
  //Lecture 106.13 useState for setImage
  const [image, setImage] = useState("");
  //Lecture 106.15 useState for setError
  const [error, setError] = useState("");
  //Lecture 106.9 define handleImage
  const handleImage = (e) => {
    //Lecture 106.14 copy paste from components:post:createComment.js -start
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      //Lecture 106.16 setImage
      setImage(event.target.result);
    };
    //Lecture 106.14 copy paste from components:post:createComment.js -end
  };
  return (
    //Lecture 106.4 add class blur
    <div className="blur">
      {/* //Lecture 106.5 input type */}
      <input
        //Lecture 106.7 pass type to hidden
        type="file"
        ref={refInput}
        hidden
        //Lecture 106.8 onclick
        onChange={handleImage}
        //Lecture 106.19 add Accept
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      {/* //Lecture 106.10 class postBox */}
      <div
        className="postBox pictureBox"
        //Lecture 109.30 reference it
        ref={popup}
      >
        {/* //Lecture 106.10 class box_header */}
        <div className="box_header">
          {/* //Lecture 106.10 class small_circle and icon */}
          <div
            className="small_circle"
            //Lecture 109.4 add onClick
            onClick={() => setShow(false)}
          >
            <i className="exit_icon"></i>
          </div>
          {/* //Lecture 106.10 span */}
          <span>Update profile picture</span>
        </div>
        {/* //Lecture 106.11 class update_picture_wrap */}
        <div className="update_picture_wrap">
          {/* //Lecture 106.11 class update_picture_buttons */}
          <div className="update_picture_buttons">
            {/* //Lecture 106.11 class light_blue_btn */}
            <button
              className="light_blue_btn"
              //Lecture 106.18 add onClick
              onClick={() => refInput.current.click()}
            >
              {/* //Lecture 106.11 class plus_icon icon */}
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            {/* //Lecture 106.11 btn class gray_btn and icon */}
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {/* //Lecture 106.17 if error is true */}
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        {/* //Lecture 106.12 class old_pictures_wrap */}
        <div className="old_pictures_wrap scrollbar">
          {/* //Lecture 110.23 add h4  */}
          <h4>your profile pictures</h4>
          {/* //Lecture 110.24 class old_pictures */}
          <div className="old_pictures">
            {/* //Lecture 110.19 filter photos  */}
            {photos
              .filter(
                (img) =>
                  img.folder ===
                  //Lecture 110.21 user.username
                  `${user.username}/profile_pictures`
              )
              //Lecture 110.22 map photos
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  //Lecture 110.27 add onclick
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          {/* //Lecture 110.25 other pictures h4 */}
          <h4>other pictures</h4>
          {/* //Lecture 110.25 class old_pictures */}
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              //Lecture 110.26 map thought
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  //Lecture 110.27 add onclick
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>
      {/* //Lecture 106.22 if have image show */}
      {image && (
        //Lecture 106.23 call UpdateProfilePicture
        <UpdateProfilePicture
          //Lecture 106.24 pass setImage
          setImage={setImage}
          //Lecture 107.1 pass image
          image={image}
          //Lecture 108.26 pass setError
          setError={setError}
          //Lecture 109.13 pass setShow
          setShow={setShow}
          //Lecture 109.20 pass pref
          pRef={pRef}
        />
      )}
    </div>
  );
}
