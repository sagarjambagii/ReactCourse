//Lecture 77.12 import all svg
import { Dots, Feeling, Photo } from "../../svg";
//Lecture 77.9 Create components:createPostPopup:AddToYourPost.js
export default function AddToYourPost({
  //Lecture 80.14 get setShowPrev
  setShowPrev,
}) {
  return (
    //Lecture 77.11 class addtoyourpost
    <div className="addtoyourpost">
      {/* //Lecture 77.11 class addto_text */}
      <div className="addto_text">Add to your post</div>
      {/* //Lecture 77.12 class post_header_right */}
      <div
        className="post_header_right hover1"
        //Lecture 80.15 setShowPrev to true
        onClick={() => {
          setShowPrev(true);
        }}
      >
        <Photo color="#45bd62" />
      </div>
      {/* //Lecture 77.13 class post_header_right */}
      <div className="post_header_right hover1">
        <i className="tag_icon"></i>
      </div>
      {/* //Lecture 77.13 class post_header_right */}
      <div className="post_header_right hover1">
        <Feeling color="#f7b928" />
      </div>
      {/* //Lecture 77.13 class post_header_right */}
      <div className="post_header_right hover1">
        <i className="maps_icon"></i>
      </div>
      {/* //Lecture 77.13 class post_header_right */}
      <div className="post_header_right hover1">
        <i className="microphone_icon"></i>
      </div>
      {/* //Lecture 77.13 class post_header_right */}
      <div className="post_header_right hover1">
        <Dots color="#65676b" />
      </div>
    </div>
  );
}
