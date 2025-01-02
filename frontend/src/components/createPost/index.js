//Lecture 58.8 import svgs
import { Feeling, LiveVideo, Photo } from "../../svg";
import UserMenu from "../header/userMenu";
//Lecture 58.1 Create and import style.css
import "./style.css";
//Lecture 58.0 Create post form, Create components:createPost folder:index.js
// export default function CreatePost() {
//Lecture 58.5 get user
export default function CreatePost({
  user,
  //Lecture 85.5 get the set visible
  setVisible,
  //Lecture 103.5 get profile
  profile,
}) {
  return (
    //Lecture 58.3 class createPost
    <div className="createPost">
      {/* //Lecture 58.3 class createPost_header */}
      <div className="createPost_header">
        {/* //Lecture 58.6 img  */}
        <img src={user?.picture} alt="" />
        {/* //Lecture 58.7 class open_post and text */}
        <div
          className="open_post hover2"
          //Lecture 85.6 onClick set visible to true
          onClick={() => {
            setVisible(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      {/* //Lecture 58.7 class create_splitter */}
      <div className="create_splitter"></div>
      {/* //Lecture 58.7 class createPost_body */}
      <div className="createPost_body">
        {/* //Lecture 58.7 class createPost_icon and Live video */}
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        {/* //Lecture 58.9 Photo/Video */}
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        {/* //Lecture 103.6 if profile true  */}
        {profile ? (
          //Lecture 103.7 class createPost_icon
          <div className="createPost_icon hover1">
            <i className="lifeEvent_icon"></i>
            Life Event
          </div>
        ) : (
          //Lecture 58.9 Feeling/Activity
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Feeling/Activity
          </div>
        )}
      </div>
    </div>
  );
}
