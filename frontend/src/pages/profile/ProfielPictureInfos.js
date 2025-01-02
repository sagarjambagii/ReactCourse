//Lecture 106.2 import useState
import {
  //Lecture 109.16 import useRef
  useRef,
  useState,
} from "react";
//Lecture 106.4 import ProfilePicture
import ProfilePicture from "../../components/profielPicture";
//Lecture 126.1 import Friendship
import Friendship from "./Friendship";
//Lecture 131.5 import Link
import { Link } from "react-router-dom";
//Lecture 101.0 Profile picture, infos, menu, Create pages:profiel:ProfielPictureInfos.js, RFc
export default function ProfielPictureInfos({
  //Lecture 101.5 get the profile
  profile,
  //Lecture 104.12 get visitor
  visitor,
  //Lecture 110.16 get photos
  photos,
  //Lecture 120.42 get othername
  othername,
}) {
  //Lecture 106.2 useState for show
  //Lecture 109.0 Finish update profile picture, loader, visiblity, live change, set pop up to false
  const [show, setShow] = useState(false);
  //Lecture 109.16 create pref
  const pRef = useRef(null);
  return (
    //Lecture 101.2 class profile_img_wrap
    <div className="profile_img_wrap">
      {/* //Lecture 106.3 if show true  */}
      {show && (
        //Lecture 106.4 call ProfilePicture
        <ProfilePicture
          //Lecture 109.2 pass setShow
          setShow={setShow}
          //Lecture 109.18 pass pref
          pRef={pRef}
          //Lecture 110.17 pass photos
          photos={photos}
        />
      )}
      {/* //Lecture 101.2 class profile_w_left */}
      <div className="profile_w_left">
        {/* //Lecture 101.2 class profile_w_img */}
        <div className="profile_w_img">
          {/* //Lecture 101.2 class profile_w_bg */}
          <div
            className="profile_w_bg"
            //Lecture 101.3 style add backgroundSize adn backgroundImage
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
            //Lecture 109.17 reference it
            ref={pRef}
          ></div>
          {/* //Lecture 104.14 if not visitor */}
          {!visitor && (
            //Lecture 101.6 class profile_circle and icon
            <div
              className="profile_circle hover1"
              //Lecture 109.1 add onclick to set show
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        {/* //Lecture 101.7 class profile_w_col */}
        <div className="profile_w_col">
          {/* //Lecture 101.7 class profile_name */}
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            {/* //Lecture 101.7 class othername */}
            <div className="othername">
              {/* Othername */}
              {/* //Lecture 120.43 check for other name  */}
              {othername && `(${othername})`}
            </div>
          </div>
          {/* //Lecture 101.7 class profile_friend_count */}
          <div className="profile_friend_count">
            {/* //Lecture 131.0 Display friends pictures preview , profile?.friends */}
            {profile?.friends && (
              //Lecture 131.1 class profile_card_count
              <div className="profile_card_count">
                {/* //Lecture 131.2 if profile?.friends.length  */}
                {profile?.friends.length === 0
                  ? ""
                  : profile?.friends.length === 1
                  ? "1 Friend"
                  : `${profile?.friends.length} Friends`}
              </div>
            )}
          </div>
          {/* //Lecture 101.7 class profile_friend_imgs */}
          <div className="profile_friend_imgs">
            {/* //Lecture 131.3 check if profile.friends exist  */}
            {profile?.friends &&
              //Lecture 131.4 map pics
              profile.friends.slice(0, 6).map((friend, i) => (
                //Lecture 131.5 add Link to
                <Link to={`/profile/${friend.username}`} key={i}>
                  {/* //Lecture 131.6 img  */}
                  <img
                    src={friend.picture}
                    alt=""
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {/* //Lecture 104.13 if visitor true show none */}
      {visitor ? (
        //Lecture 101.8 class profile_w_right
        // ""
        //Lecture 126.1 call Friendship
        <Friendship
          //Lecture 126.51 pass friendship
          friendshipp={profile?.friendship}
          //Lecture 127.15 pass profileid
          profileid={profile._id}
        />
      ) : (
        //Lecture 101.8 class profile_w_right
        <div className="profile_w_right">
          {/* //Lecture 101.8 class blue_btn */}
          <div className="blue_btn">
            {/* //Lecture 101.8 img class invert and span */}
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          {/* //Lecture 101.8  class gray_btn and icon+span */}
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
