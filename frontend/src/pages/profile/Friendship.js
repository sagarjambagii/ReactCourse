import {
  //Lecture 126.19 import useRef
  useRef,
  useState,
  //Lecture 127.21 import useEffect
  useEffect,
} from "react";
//Lecture 126.21 import useClickOutside
import useClickOutside from "../../helpers/clickOutside";
//Lecture 127.14 import useSelector
import { useSelector } from "react-redux";
import {
  //Lecture 127.19 import addFriend
  addFriend,
  //Lecture 127.26 import cancelRequest
  cancelRequest,
  //Lecture 127.30 import follow
  follow,
  //Lecture 127.33 import unfollow
  unfollow,
  //Lecture 128.1 import acceptRequest
  acceptRequest,
  //Lecture 128.4 import unfriend
  unfriend,
  //Lecture 128.7 import deleteRequest
  deleteRequest,
} from "../../functions/user";

//Lecture 126.0 Show the requests buttons, Create pages:profile:Friends.js, RFC
export default function Friendship({
  //Lecture 126.52 get friendship
  // friendship,
  //Lecture 127.20 make it friendshipp
  friendshipp,
  //Lecture 127.16 get profileid
  profileid,
}) {
  //Lecture 126.2 predefined
  //Lecture 126.50 remove it
  // const friendship = {
  //   friends: false,
  //   following: false,
  //   //Lecture 126.27 when request sent true
  //   requestSent: false,
  //   //Lecture 126.30 make it to true
  //   requestReceived: false,
  // };
  //Lecture 127.20 useState for setFriendship
  const [friendship, setFriendship] = useState(friendshipp);
  //Lecture 127.21 when page loads
  useEffect(() => {
    //Lecture 127.22 set setFriendship
    setFriendship(friendshipp);
  }, [friendshipp]);
  //Lecture 126.17 make it false
  //Lecture 126.8 useState for friendsMenu
  const [friendsMenu, setFriendsMenu] = useState(false);
  //Lecture 126.29 useState for respondMenu
  const [respondMenu, setRespondMenu] = useState(false);
  //Lecture 126.19 useRef for menu
  const menu = useRef(null);
  //Lecture 126.39 useRef for menu1
  const menu1 = useRef(null);
  //Lecture 126.21 call useClickOutside
  useClickOutside(menu, () => setFriendsMenu(false));
  //Lecture 126.41 call useClickOutside
  useClickOutside(menu1, () => setRespondMenu(false));
  //Lecture 127.14 get the user from store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 127.18 Create addFriendHandler fn
  const addFriendHandler = async () => {
    //Lecture 127.23 set setFriendship with data
    setFriendship({ ...friendship, requestSent: true, following: true });
    //Lecture 127.19 call addFriend
    await addFriend(profileid, user.token);
  };
  //Lecture 127.24 define cancelRequestHandler fn
  const cancelRequestHandler = async () => {
    //Lecture 127.25 set setFriendship
    setFriendship({ ...friendship, requestSent: false, following: false });
    //Lecture 127.26 call cancelRequest
    await cancelRequest(profileid, user.token);
  };
  //Lecture 127.28 define followHandler fn
  const followHandler = async () => {
    //Lecture 127.29 set setFriendship
    setFriendship({ ...friendship, following: true });
    //Lecture 127.30 call follow
    await follow(profileid, user.token);
  };
  //Lecture 127.31 define unfollowHandler fn
  const unfollowHandler = async () => {
    //Lecture 127.32 set setFriendship
    setFriendship({ ...friendship, following: false });
    //Lecture 127.33 call unfollow
    await unfollow(profileid, user.token);
  };
  //Lecture 128.0 Submit requests part 2, Create acceptRequestHanlder fn
  const acceptRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    //Lecture 128.1 call acceptRequest
    await acceptRequest(profileid, user.token);
  };
  //Lecture 128.3 create unfriendHandler fn
  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    //Lecture 128.4 call unfriend
    await unfriend(profileid, user.token);
  };
  //Lecture 128.6 define deleteRequestHanlder fn
  const deleteRequestHanlder = async () => {
    //Lecture 128.8 setFriendship
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    //Lecture 128.7 call deleteRequest
    await deleteRequest(profileid, user.token);
  };
  return (
    //Lecture 126.3 class friendship
    <div className="friendship">
      {/* //Lecture 126.4 friendship?.friends true  */}
      {friendship?.friends ? (
        //Lecture 126.5 class friends_menu_wrap
        <div className="friends_menu_wrap">
          {/* //Lecture 126.6 class gray_btn */}
          <button
            className="gray_btn"
            //Lecture 126.18 add onclick
            onClick={() => setFriendsMenu(true)}
          >
            {/* //Lecture 126.7 img and span */}
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {/* //Lecture 126.9 if friendsMenu is true  */}
          {friendsMenu && (
            //Lecture 126.10 class open_cover_menu
            <div
              className="open_cover_menu"
              //Lecture 126.20 reference it
              ref={menu}
            >
              {/* //Lecture 126.11 class open_cover_menu_item and img */}
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              {/* //Lecture 126.12 class open_cover_menu_item and img */}
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              {/* //Lecture 126.13 friendship?.following true */}
              {friendship?.following ? (
                //Lecture 126.14 class open_cover_menu_item and img
                <div
                  className="open_cover_menu_item hover1"
                  //Lecture 127.35 add unfollowHandler
                  onClick={() => unfollowHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                //Lecture 126.15 class open_cover_menu_item and img
                <div
                  className="open_cover_menu_item hover1"
                  //Lecture 127.34 add follow handler
                  onClick={() => followHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              {/* //Lecture 126.16 class open_cover_menu_item and img */}
              <div
                className="open_cover_menu_item hover1"
                //Lecture 128.5 add unfriendHandler
                onClick={() => unfriendHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        //Lecture 126.22 when not friends
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          //Lecture 126.23 class blue_btn, img and span
          <button
            className="blue_btn"
            //Lecture 127.17 add onclick
            onClick={() => addFriendHandler()}
          >
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {/* //Lecture 126.24 check for friendship?.requestSent */}
      {friendship?.requestSent ? (
        //Lecture 126.25 class blue_btn
        <button
          className="blue_btn"
          //Lecture 127.27 add onClick
          onClick={() => cancelRequestHandler()}
        >
          {/* //Lecture 126.26 img and span  */}
          <img
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        //Lecture 126.28 else check for friendship?.requestReceived
        friendship?.requestReceived && (
          //Lecture 126.31 class friends_menu_wrap
          <div className="friends_menu_wrap">
            {/* //Lecture 126.32 class gray_btn */}
            <button
              className="gray_btn"
              //Lecture 126.33 add onclick
              onClick={() => setRespondMenu(true)}
            >
              {/* //Lecture 126.34 image and span  */}
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {/* //Lecture 126.35 if respondMenu true */}
            {respondMenu && (
              //Lecture 126.36 class open_cover_menu
              <div
                className="open_cover_menu"
                //Lecture 126.40 reference it
                ref={menu1}
              >
                {/* //Lecture 126.37 class open_cover_menu_item confirm */}
                <div
                  className="open_cover_menu_item hover1"
                  //Lecture 128.2 add acceptRequestHanlder
                  onClick={() => acceptRequestHanlder()}
                >
                  Confirm
                </div>
                {/* //Lecture 126.38 class open_cover_menu_item Delete */}
                <div
                  className="open_cover_menu_item hover1"
                  //Lecture 128.9 add deleteRequestHanlder
                  onClick={() => deleteRequestHanlder()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      {/* //Lecture 129.0 Css ,responsive,fix issues, add class flex */}
      <div className="flex">
        {/* //Lecture 126.42 check if friendship?.following */}
        {friendship?.following ? (
          //Lecture 126.43 class gray_btn
          <button
            className="gray_btn"
            //Lecture 127.37 add unfollowHandler
            onClick={() => unfollowHandler()}
          >
            {/* //Lecture 126.44 img and span  */}
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          //Lecture 126.45 else class blue_btn
          <button
            className="blue_btn"
            //Lecture 127.36 add followHandler
            onClick={() => followHandler()}
          >
            {/* //Lecture 126.46 img and span  */}
            <img src="../../../icons/follow.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        )}
        {/* //Lecture 126.47 button for message  */}
        <button
          //Lecture 126.48 check for classname
          className={friendship?.friends ? "blue_btn" : "gray_btn"}
        >
          {/* //Lecture 126.49 img and span */}
          <img
            src="../../../icons/message.png"
            className={friendship?.friends ? "invert" : ""}
            alt=""
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
}
