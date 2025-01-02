//Lecture 78.13 import EmojiPickerBackgrounds
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
//Lecture 79.4 import useRef
import { useRef } from "react";

//Lecture 78.0 Preview Images part 1, Create components:createPostPopup:imagePreview.js, RFC
export default function ImagePreview({
  //Lecture 78.15 get text to settext
  text,
  user,
  setText,
  //Lecture 79.7 get images to setimages
  images,
  setImages,
  //Lecture 80.11 get setShowPrev
  setShowPrev,
  //Lecture 89.3 get the seterror
  setError,
}) {
  //Lecture 79.3 def imageInputRef
  const imageInputRef = useRef(null);
  //Lecture 79.4 def handleImages fn
  const handleImages = (e) => {
    //Lecture 79.12 get files
    let files = Array.from(e.target.files);
    //Lecture 79.13 go through all img
    files.forEach((img) => {
      //Lecture 89.1 check type of file
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        //Lecture 89.4 setError
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        //Lecture 89.8 filter all img except unsupported one
        files = files.filter((item) => item.name !== img.name);
        //Lecture 89.4 setError
        return;
      }
      //Lecture 89.6 check img size
      else if (img.size > 1024 * 1024) {
        //Lecture 89.7 setError
        setError(`${img.name} size is too large max 5mb allowed.`);
        //Lecture 89.8 filter all img except unsupported one
        files = files.filter((item) => item.name !== img.name);
        //Lecture 89.7 setError
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
      //Lecture 79.14 def reader
      // const reader = new FileReader();
      //Lecture 79.15 read as dataurl
      // reader.readAsDataURL(img);
      //Lecture 79.16 onload setimages
      // reader.onload = (readerEvent) => {
      //   setImages((images) => [...images, readerEvent.target.result]);
      // };
    });
  };
  return (
    //Lecture 78.12 class overflow_a
    <div className="overflow_a scrollbar">
      {/* //Lecture 78.13 call EmojiPickerBackgrounds */}
      <EmojiPickerBackgrounds
        //Lecture 78.16 passing props text to settext
        text={text}
        user={user}
        setText={setText}
        //Lecture 78.17 pass type2
        type2
      />
      {/* //Lecture 79.0 Preview Images part 2, class add_pics_wrap */}
      <div className="add_pics_wrap">
        {/* //Lecture 79.1 input  */}
        <input
          //Lecture 79.2 type to onChange
          type="file"
          //Lecture 89.0 Finish post submit fixing errors,validation, accept imgs only
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {/* //Lecture 79.8 single images and lenght */}
        {images && images.length ? (
          //Lecture 80.0 Preview Images part 3 , class add_pics_inside1
          <div className="add_pics_inside1 p0">
            {/* //Lecture 80.1 class preview_actions */}
            <div className="preview_actions">
              {/* //Lecture 80.2 button edit_icon */}
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              {/* //Lecture 80.3 button addPhoto_icon */}
              <button
                className="hover1"
                //Lecture 80.8 adding onClick
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            {/* //Lecture 80.4 class small_white_circle exit_icon */}
            <div
              className="small_white_circle"
              //Lecture 80.9 setImages to empty array
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            {/* //Lecture 80.5 div */}
            <div
              //Lecture 80.7 className
              className={
                //Lecture 80.7 className preview1 to preview6
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4 "
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {/* //Lecture 80.6 map through images */}
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          //Lecture 79.9 when we dont have images, class add_pics_inside1
          <div className="add_pics_inside1">
            {/* //Lecture 79.9 class small_white_circle */}
            <div
              className="small_white_circle"
              //Lecture 80.12 setShowPrev false
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            {/* //Lecture 79.9 class add_col */}
            <div
              className="add_col"
              //Lecture 79.11 span  addphone_btnadd onClick
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              {/* //Lecture 79.9 class add_circle */}
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              {/* //Lecture 79.9  span  */}
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        {/* //Lecture 79.10 class add_pics_inside2  */}
        <div className="add_pics_inside2">
          {/* //Lecture 79.10 class add_circle  */}
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          {/* //Lecture 79.10 class mobile_text  */}
          <div className="mobile_text">Add phots from your mobile device.</div>
          {/* //Lecture 79.10 span  addphone_btn */}
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
}
