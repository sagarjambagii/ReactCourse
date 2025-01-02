//Lecture 106.30  import useState
import {
  useState,
  //Lecture 107.4 import onCropComplete
  useCallback,
  //Lecture 107.14 import useRef
  useRef,
} from "react";
//Lecture 107.0 npm i react-easy-crop, and import
import Cropper from "react-easy-crop";
//Lecture 108.7 import getCroppedImg
import getCroppedImg from "../../helpers/getCroppedImg";
//Lecture 108.30 import useSelector
import {
  useSelector,
  //Lecture 109.24 import dispatch
  useDispatch,
} from "react-redux";
//Lecture 108.41 import updateprofilePicture
import { updateprofilePicture } from "../../functions/user";
//Lecture 108.44 import Create post
import { createPost } from "../../functions/post";
//Lecture 108.34 import uploadimages
import { uploadImages } from "../../functions/uploadImages";
//Lecture 109.7 import PulseLoader
import PulseLoader from "react-spinners/PulseLoader";
//Lecture 109.25 import Cookies
import Cookies from "js-cookie";
//Lecture 106.20 Create components:profilePicture:UpdateProfilePicture.js, RFC
export default function UpdateProfilePicture({
  //Lecture 106.25 get setImage
  setImage,
  //Lecture 107.2 get the image
  image,
  //Lecture 108.27 get setError
  setError,
  //Lecture 109.14 get setShow
  setShow,
  //Lecture 109.21 get pref
  pRef,
}) {
  //Lecture 109.24 define dispatch
  const dispatch = useDispatch();
  //Lecture 106.30 useState for description
  const [description, setDescription] = useState("");

  //Lecture 107.3 define description to zoom
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  //Lecture 108.6 useState for setCroppedAreaPixels
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  //Lecture 107.14 define slider
  const slider = useRef(null);
  //Lecture 108.30 get the user from state
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 109.6 useState for loading
  const [loading, setLoading] = useState(false);

  //Lecture 107.4 define onCropComplete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //Lecture 107.4 define onCropComplete
    // console.log(croppedArea, croppedAreaPixels);
    //Lecture 108.13 set setCroppedAreaPixels
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  //Lecture 107.12 define zoomIn fn
  const zoomIn = () => {
    //Lecture 107.16 stepUP
    slider.current.stepUp();
    //Lecture 107.17 setXoom value
    setZoom(slider.current.value);
  };
  //Lecture 107.13 define zoomOut fn
  const zoomOut = () => {
    //Lecture 107.18 stepdown
    slider.current.stepDown();
    //Lecture 107.19 setzoom
    setZoom(slider.current.value);
  };
  // console.log(zoom);
  //Lecture 108.0 Update profile picture and create post part 3, define getCroppedImage img
  const getCroppedImage = useCallback(
    async (
      //Lecture 108.8 pass show
      show
    ) => {
      //Lecture 108.1 add try catch
      try {
        //Lecture 108.7 get the img
        const img = await getCroppedImg(image, croppedAreaPixels);
        //Lecture 108.8 if show true
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          //Lecture 108.10 return img
          setImage(img);
          console.log("just show");
        }
        //Lecture 108.9 if show true
        else {
          console.log("not show");
          //Lecture 108.11 cl
          console.log(img);
          //Lecture 108.12 return img
          return img;
        }
      } catch (error) {
        //Lecture 108.2 console log error
        console.log(error);
      }
    },
    //Lecture 108.4 pass dependency array
    [croppedAreaPixels]
  );
  //Lecture 108.23 define updateProfielPicture fn
  const updateProfielPicture = async () => {
    //Lecture 108.24 add trycatch
    try {
      //Lecture 109.9 setLoading to true
      setLoading(true);
      //Lecture 108.28 get the img
      let img = await getCroppedImage();
      //Lecture 108.29 store blob
      let blob = await fetch(img).then((b) => b.blob());
      //Lecture 108.31 path
      const path = `${user.username}/profile_pictures`;
      //Lecture 108.32 deffine form data
      let formData = new FormData();
      //Lecture 108.33 append to formdata
      formData.append("file", blob);
      formData.append("path", path);
      //Lecture 108.34 call uploadimages
      const res = await uploadImages(formData, path, user.token);
      //Lecture 108.41 updated_picture
      const updated_picture = await updateprofilePicture(
        res[0].url,
        user.token
      );
      //Lecture 108.47 cl
      console.log(updated_picture);
      //Lecture 108.42 check if updated pictire == ok
      if (updated_picture === "ok") {
        //Lecture 108.44 Create post
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user.id,
          user.token
        );
        //Lecture 108.45 check for new post
        if (new_post === "ok") {
          //Lecture 109.12 if post is ok
          setLoading(false);
          setImage("");
          //Lecture 109.22 update the profile pic
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          //Lecture 109.26 update Cookies
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          );
          //Lecture 109.27 disptach UPDATEPICTURE
          dispatch({
            type: "UPDATEPICTURE",
            payload: res[0].url,
          });
          //Lecture 109.15 setShow to false
          setShow(false);
        } else {
          //Lecture 109.11 setLoading to false
          setLoading(false);
          //Lecture 108.46 setError
          setError(new_post);
        }
      } else {
        //Lecture 109.11 setLoading to false
        setLoading(false);
        //Lecture 108.43 setError
        setError(updated_picture);
      }
    } catch (error) {
      //Lecture 109.10 setLoading to false
      setLoading(false);
      //Lecture 108.25 return setErrro
      setError(error.response.data.message);
    }
  };
  return (
    //Lecture 106.21 class postBox update_img
    <div className="postBox update_img">
      {/* //Lecture 106.21 class box_header */}
      <div className="box_header">
        {/* //Lecture 106.21 class small_circle and icon */}
        <div
          className="small_circle"
          //Lecture 106.26 setImage to ""
          onClick={() => setImage("")}
        >
          <i className="exit_icon"></i>
        </div>
        {/* //Lecture 106.21 span */}
        <span>Update profile picture</span>
      </div>
      {/* //Lecture 106.27 class update_image_desc */}
      <div className="update_image_desc">
        {/* //Lecture 106.28 textarea class textarea_blue */}
        <textarea
          //Lecture 106.29 pass placeholder
          placeholder="Description"
          //Lecture 106.31 add value n onChange
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      {/* //Lecture 106.32 class update_center */}
      <div className="update_center">
        {/* //Lecture 106.32 class crooper */}
        <div className="crooper">
          {/* //Lecture 107.0 Update profile picture part 2 (Crooper), add cropper */}
          <Cropper
            //Lecture 107.5 pass image to showGrid
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        {/* //Lecture 107.6 class slider */}
        <div className="slider">
          {/* //Lecture 107.6 class slider_circle and icon */}
          <div
            className="slider_circle hover1"
            //Lecture 107.10 onclick for zoomOut
            onClick={() => zoomOut()}
          >
            <i className="minus_icon"></i>
          </div>
          {/* //Lecture 107.8 input type range */}
          <input
            //Lecture 107.9 pass type to onChange
            type="range"
            min={1}
            max={3}
            step={0.2}
            //Lecture 107.15 reference it
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          {/* //Lecture 107.7 class slider_circle and icon */}
          <div
            className="slider_circle hover1"
            //Lecture 107.11 onclick for zoomIn
            onClick={() => zoomIn()}
          >
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      {/* //Lecture 107.20 class flex_up */}
      <div className="flex_up">
        {/* //Lecture 107.20 class gray_btn and icon */}
        <div
          className="gray_btn"
          //Lecture 108.14 onclick to getCroppedImage
          onClick={() => getCroppedImage("show")}
        >
          <i className="crop_icon"></i>Crop photo
        </div>
        {/* //Lecture 107.20 class gray_btn and icon */}
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      {/* //Lecture 107.21 class flex_p_t and icon */}
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      {/* //Lecture 107.22 class update_submit_wrap */}
      <div className="update_submit_wrap">
        {/* //Lecture 107.22 class blue_link */}
        <div
          className="blue_link"
          //Lecture 109.5 add onClick to setimg to ""
          onClick={() => setImage("")}
        >
          Cancel
        </div>
        {/* //Lecture 107.22 class blue_btn */}
        <button
          className="blue_btn"
          //Lecture 108.22 add onlclick
          onClick={() => updateProfielPicture()}
          //Lecture 109.8 disabled when loading is true
          disabled={loading}
        >
          {/* //Lecture 109.7 show loading */}
          {loading ? (
            <PulseLoader color="#fff" size={5} />
          ) : (
            //Lecture 107.22 class blue_btn
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
