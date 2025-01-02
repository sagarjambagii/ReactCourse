import {
  //Lecture 100.21 import useRef
  useRef,
  //Lecture 100.16 import useState
  useState,
  //Lecture 112.24 import useEffect
  useEffect,
  //Lecture 112.13 import useCallback
  useCallback,
} from "react";
//Lecture 100.23 import useClickOutside
import useClickOutside from "../../helpers/clickOutside";
//Lecture 112.11 import Cropper
import Cropper from "react-easy-crop";
//Lecture 112.15 import cropped img
import getCroppedImg from "../../helpers/getCroppedImg";
//Lecture 113.12 import uploadImages
import { uploadImages } from "../../functions/uploadImages";
import { useSelector } from "react-redux";
//Lecture 113.14 import updateCover
import { updateCover } from "../../functions/user";
//Lecture 113.15 import createPost
import { createPost } from "../../functions/post";
//Lecture 113.23 import PulseLoader
import PulseLoader from "react-spinners/PulseLoader";
//Lecture 114.2 import OldCovers
import OldCovers from "./OldCovers";

//Lecture 100.10 Create components:profile:Cover.js, rfc
export default function Cover({
  //Lecture 100.12 get the cover
  cover,
  //Lecture 104.9 get visitor
  visitor,
  //Lecture 114.7 get the photos
  photos,
}) {
  //Lecture 100.16 useState for showCoverMneu
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  //Lecture 100.21 define useRef
  const menuRef = useRef(null);
  //Lecture 100.23 call useClickOutside
  useClickOutside(menuRef, () => setShowCoverMenu(false));

  //Lecture 112.4 useState for coverPicture
  const [coverPicture, setCoverPicture] = useState("");
  //Lecture 113.11 useState for loading
  const [loading, setLoading] = useState(false);
  //Lecture 114.1 useState for setShow
  const [show, setShow] = useState(false);
  //Lecture 113.13 get the user from store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 112.1 define refInput
  const refInput = useRef(null);
  //Lecture 113.21 define cRef
  const cRef = useRef(null);
  //Lecture 112.7 copy from components: profilePicture:index.js, paste - start
  const [error, setError] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      setShowCoverMenu(false);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      setShowCoverMenu(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      //Lecture 112.8 set setCoverPicture
      setCoverPicture(event.target.result);
    };
  };
  //Lecture 112.7 copy from components: profilePicture:index.js, paste - end
  //Lecture 112.14 paste crop to croppedAreaPixels
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  //Lecture 112.17 paste onCropComplete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  //Lecture 112.13 paste cropped img
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        //Lecture 112.15 call getCroppedImg and pass coverPicture
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          //Lecture 112.16 change it to setCoverPicture
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  //Lecture 112.20 coverRef for width
  const coverRef = useRef(null);
  //Lecture 112.22 useState for setWidth
  const [width, setWidth] = useState();
  //Lecture 112.23 when page loads
  useEffect(
    () => {
      //Lecture 112.24 get the client width and set
      setWidth(coverRef.current.clientWidth);
    },
    //Lecture 112.26 add dependency
    [window.innerWidth]
  );

  //Lecture 113.9 paste from updateprofilepicture.js
  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      //Lecture 113.17 change path cover_pictures
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      //Lecture 113.12 call uploadImages
      const res = await uploadImages(formData, path, user.token);
      //Lecture 113.14 call updateCover
      const updated_picture = await updateCover(res[0].url, user.token);
      if (updated_picture === "ok") {
        //Lecture 113.15 call createPost
        const new_post = await createPost(
          //Lecture 113.24 cover upload failed, fix
          "coverPicture",
          null,
          //Lecture 113.16 description null
          null,
          res,
          user.id,
          user.token
        );
        console.log(new_post);
        if (new_post === "ok") {
          setLoading(false);
          //Lecture 113.19 setcover
          setCoverPicture("");
          //Lecture 113.18 remove cookies dispatch

          //Lecture 113.22 set image
          cRef.current.src = res[0].url;
        } else {
          setLoading(false);

          setError(new_post);
        }
      } else {
        setLoading(false);

        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div
      className="profile_cover"
      //Lecture 112.21 reference it
      ref={coverRef}
    >
      {/* //Lecture 112.30 if cover picture true  */}
      {coverPicture && (
        //Lecture 112.27 add class save_changes_cover
        <div className="save_changes_cover">
          {/* //Lecture 112.27 add class save_changes_left */}
          <div className="save_changes_left">
            {/* //Lecture 112.29 icon and text */}
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          {/* //Lecture 112.28 add class save_changes_right */}
          <div className="save_changes_right">
            {/* //Lecture 112.29 button class blue_btn cancel */}
            <button
              className="blue_btn opacity_btn"
              //Lecture 113.29 add onclick
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            {/* //Lecture 112.30 button class blue_btn Save changes */}
            <button
              className="blue_btn "
              //Lecture 113.10 add onclick
              onClick={() => updateCoverPicture()}
            >
              {/* //Lecture 113.23 if loader is true  */}
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
            </button>
          </div>
        </div>
      )}
      {/*//Lecture 112.0 Update cover picture part 1, input type */}
      <input
        type="file"
        //Lecture 112.2 reference it
        ref={refInput}
        //Lecture 112.3 add hidden and accept
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        //Lecture 112.6 onChange for handleImage
        onChange={handleImage}
      />
      {/* //Lecture 112.9 if error true  */}
      {error && (
        <div className="postError comment_error cover_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {/* //Lecture 112.18 show when coverPhoto true  */}
      {coverPicture && (
        //Lecture 112.10 add class cover_crooper
        <div className="cover_crooper">
          {/* //Lecture 112.11 paste the cropper, components:profilepicture:updateprofilepicture  */}
          <Cropper
            //Lecture 112.12 change it to coverPicture
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            //Lecture 112.25 add the width in aspect ratio
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            //Lecture 112.19 change show grid to true and objectFit
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {/* //Lecture 100.13 if cover true ~ */}
      {cover &&
        //Lecture 113.26 check for coverPicture
        !coverPicture && (
          <img
            src={cover}
            className="cover"
            alt=""
            //Lecture 113.20 reference cref
            ref={cRef}
          />
        )}
      {/* //Lecture 104.10 if we are not visitor show */}
      {!visitor && (
        //Lecture 100.15 class udpate_cover_wrapper
        <div className="udpate_cover_wrapper">
          {/* //Lecture 100.15 class open_cover_update*/}
          <div
            className="open_cover_update"
            //Lecture 100.18 onlcick
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            {/* //Lecture 100.15 icon text*/}
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {/* //Lecture 100.17 if showCoverMneu true  */}
          {showCoverMneu && (
            //Lecture 100.18 class open_cover_menu
            <div
              className="open_cover_menu"
              //Lecture 100.22 reference it
              ref={menuRef}
            >
              {/* //Lecture 100.19 class open_cover_menu_item and photo_icon */}
              <div
                className="open_cover_menu_item hover1"
                //Lecture 114.19 add onclick
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              {/* //Lecture 100.20 class open_cover_menu_item and upload_icon */}
              <div
                className="open_cover_menu_item hover1"
                //Lecture 112.5 add onclick
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon"></i>
                Uplaod Photo
              </div>
            </div>
          )}
          {/* //Lecture 114.2 when show is true  */}
          {show && (
            //Lecture 114.2 call OldCovers
            <OldCovers
              //Lecture 114.8 pass photos
              photos={photos}
              //Lecture 114.11 pass setCoverPicture
              setCoverPicture={setCoverPicture}
              //Lecture 114.16 pass setShow
              setShow={setShow}
            />
          )}
        </div>
      )}
    </div>
  );
}
