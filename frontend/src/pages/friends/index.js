import {
  //Lecture 150.9 import useEffect
  useEffect,
  //Lecture 150.20 import useReducer
  useReducer,
} from "react";
//Lecture 150.12 import useSelector
import { useSelector } from "react-redux";
//Lecture 149.5 import Header
import Header from "../../components/header";
import { friendspage } from "../../functions/reducers";
//Lecture 150.11 import getFriendsPageInfos
import { getFriendsPageInfos } from "../../functions/user";
//Lecture 149.0 import style
import "./style.css";
//Lecture 151.5 import Card
import Card from "./Card";
//Lecture 149.10 import Link
import {
  Link,
  //Lecture 153.1 import import
  useParams,
} from "react-router-dom";
//Lecture 149.0 Friends page-header & left menu, Create pages:friends folder:index.js:style.css, RFC
export default function Friends() {
  //Lecture 150.12 get the user
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 153.1 get the type
  const { type } = useParams();

  //Lecture 150.20 get the data from reducer
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  });
  //Lecture 150.9 when page loads
  useEffect(() => {
    //Lecture 150.14 call the fn
    getData();
  }, []);
  //Lecture 150.10 Create getdata fn
  const getData = async () => {
    //Lecture 150.21 call dispatch fn
    dispatch({ type: "FRIENDS_REQUEST" });
    //Lecture 150.11 get the data, call getFriendsPageInfos
    const data = await getFriendsPageInfos(user.token);
    //Lecture 150.13 cl data
    // console.log(data);
    //Lecture 150.22 if data is ok
    if (data.status === "ok") {
      //Lecture 150.23 dispatch FRIENDS_SUCCESS
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      //Lecture 150.24 else dispatch FRIENDS_ERROR
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };
  console.log(data);

  return (
    //Lecture 149.4 add empty div
    <>
      {/* //Lecture 149.5 call Header */}
      <Header
        //Lecture 149.6 pass page
        page="friends"
      />
      {/* //Lecture 149.9 class friends  */}
      <div className="friends">
        {/* //Lecture 149.9 class friends_left  */}
        <div className="friends_left">
          {/* //Lecture 149.9 class friends_left_header  */}
          <div className="friends_left_header">
            {/* //Lecture 149.9 H3 Friends  */}
            <h3>Friends</h3>
            {/* //Lecture 149.9 class small_circle and icon  */}
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          {/* //Lecture 149.10 class friends_left_wrap  */}
          <div className="friends_left_wrap">
            {/* //Lecture 149.10 class mmenu_item  */}
            <Link
              //  className="mmenu_item  active_friends"
              //Lecture 153.2 add to
              to="/friends"
              //Lecture 153.12 class mmenu_item and test
              className={`mmenu_item hover3 ${
                type === undefined && "active_friends"
              }`}
            >
              {/* //Lecture 149.10 class small_circle and span  */}
              <div className="small_circle" style={{ background: "#1876f2" }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Home</span>
            </Link>
            {/* //Lecture 149.11 class mmenu_item   */}
            <Link
              // className="mmenu_item hover3"
              //Lecture 153.3 add to
              to="/friends/requests"
              //Lecture 153.13 class mmenu_item and test
              className={`mmenu_item hover3 ${
                type === "requests" && "active_friends"
              }`}
            >
              {/* //Lecture 149.11 class small_circle and span  */}
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            {/* //Lecture 149.12 class mmenu_item Sent Requests  */}
            <Link
              // className="mmenu_item hover3"
              //Lecture 153.4 add to
              to="/friends/sent"
              //Lecture 153.14 class mmenu_item and test
              className={`mmenu_item hover3 ${
                type === "sent" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            {/* //Lecture 149.13 class mmenu_item Suggestions  */}
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            {/* //Lecture 149.14 class mmenu_item All Friends  */}
            <Link
              // className="mmenu_item hover3"
              //Lecture 153.5 add to
              to="/friends/all"
              //Lecture 153.15 class mmenu_item and test
              className={`mmenu_item hover3 ${
                type === "all" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            {/* //Lecture 149.15 class mmenu_item Birthdays  */}
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            {/* //Lecture 149.16 class mmenu_item Custom Lists  */}
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom Lists</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        {/* //Lecture 149.17 class friends_right  */}
        <div className="friends_right">
          {/* //Lecture 153.9 if type is undefine or requests  */}
          {(type === undefined || type === "requests") && (
            //Lecture 151.0 class friends_right_wrap
            <div className="friends_right_wrap">
              {/* //Lecture 151.0 class friends_left_header */}
              <div className="friends_left_header">
                {/* //Lecture 151.0 H3 and a */}
                <h3>Friend Requests</h3>
                {/* //Lecture 153.16 if type undefined */}
                {type === undefined && (
                  <Link
                    className="see_link hover3"
                    //Lecture 153.6 add to
                    to="/friends/requests"
                  >
                    See all
                  </Link>
                )}
              </div>
              {/* //Lecture 151.1 class flex_wrap */}
              <div className="flex_wrap">
                {/* //Lecture 151.2 if data.requests is true */}
                {data.requests &&
                  //Lecture 151.3 map through data.requests
                  data.requests.map((user) => (
                    //Lecture 151.5 call Card
                    <Card
                      //Lecture 151.6 pass user key
                      userr={user}
                      key={user._id}
                      //Lecture 151.10 pass type
                      type="request"
                      //Lecture 152.4 pass getData fn
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {/* //Lecture 153.10 if type is undefine or sent  */}
          {(type === undefined || type === "sent") && (
            //Lecture 151.12 for sent request
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests</h3>
                {/* //Lecture 153.17 if type undefined */}
                {type === undefined && (
                  <Link
                    className="see_link hover3"
                    //Lecture 153.7 add to
                    to="/friends/sent"
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {/* //Lecture 151.12 sentRequests is true */}
                {data.sentRequests &&
                  data.sentRequests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      //Lecture 151.12 type sent
                      type="sent"
                      //Lecture 152.4 pass getData fn
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {/* //Lecture 153.11 if type is undefine or all  */}
          {(type === undefined || type === "all") && (
            //Lecture 151.13 friends
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {/* //Lecture 153.18 if type undefined */}
                {type === undefined && (
                  <Link
                    className="see_link hover3"
                    //Lecture 153.8 add to
                    to="/friends/all"
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {/* //Lecture 151.13 if friends is true  */}
                {data.friends &&
                  data.friends.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      //Lecture 151.13 type friends
                      type="friends"
                      //Lecture 152.4 pass getData fn
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
