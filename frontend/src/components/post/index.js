import { Link } from "react-router-dom";
//Lecture 91.1 import style.css
import "./style.css";
//Lecture 91.12 npm i react-moment
import Moment from "react-moment";
//Lecture 94.5 import ReactsPopup
import ReactsPopup from "./ReactsPopup";
//Lecture 94.8 import useState
import {
  useState,
  //Lecture 133.20 import useEffect
  useEffect,
  //Lecture 143.12 import useRef
  useRef,
} from "react";
import { Dots, Public } from "../../svg";
//Lecture 95.2 import createComment
import CreateComment from "./CreateComment";
//Lecture 96.1 import PostMenu
import PostMenu from "./PostMenu";
//Lecture 133.22 import getReacts
import {
  getReacts,
  //Lecture 134.3 import reactPost
  reactPost,
} from "../../functions/post";
//Lecture 138.9 import Comment
import Comment from "./Comment";
//Lecture 91.1 Create components:posts folder:index.js:syles.css, RFC
export default function Post({
  //Lecture 91.4 get the  post
  post,
  //Lecture 95.4 get the user
  user,
  //Lecture 105.1 get profile
  profile,
}) {
  //Lecture 94.8 useState for visible
  const [visible, setVisible] = useState(false);
  //Lecture 97.6 useState for setShowMenu
  const [showMenu, setShowMenu] = useState(false);
  //Lecture 133.25 useState for setReacts
  const [reacts, setReacts] = useState();
  //Lecture 133.29 useState for setCheck
  const [check, setCheck] = useState();
  //Lecture 135.14 useState for total
  const [total, setTotal] = useState(0);
  //Lecture 138.18 useState for count
  const [count, setCount] = useState(1);
  //Lecture 141.23 useState for checkSaved
  const [checkSaved, setCheckSaved] = useState();
  //Lecture 138.1 useState for comments
  const [comments, setComments] = useState([]);
  //Lecture 133.20 when page loads useEffect
  useEffect(() => {
    //Lecture 133.23 call getPostReacts fn
    getPostReacts();
  }, [
    //Lecture 133.24 dependency
    post,
  ]);
  //Lecture 138.2 when page loads
  useEffect(() => {
    //Lecture 138.4 set setComments
    setComments(post?.comments);
  }, [
    //Lecture 138.3 when the post changes
    post,
  ]);
  //Lecture 138.5 cl comments
  console.log(comments);

  //Lecture 133.21 Create getPostReacts fn
  const getPostReacts = async () => {
    //Lecture 133.22 get the response
    const res = await getReacts(post._id, user.token);
    //Lecture 133.26 set setReacts
    setReacts(res.reacts);
    //Lecture 133.30 set setCheck
    setCheck(res.check);
    //Lecture 135.16 setTotal
    setTotal(res.total);
    //Lecture 141.24 set setCheckSaved
    setCheckSaved(res.checkSaved);
  };

  // console.log(check);
  //Lecture 134.2 Create reactHandler fn
  const reactHandler = async (type) => {
    //Lecture 134.3 call reactPost
    reactPost(post._id, type, user.token);
    //Lecture 134.4 check type
    if (check == type) {
      setCheck();
      //Lecture 136.0 See all reacts changes live and fast, define index and check
      let index = reacts.findIndex((x) => x.react == check);
      //Lecture 136.1 check index not -1
      if (index !== -1) {
        //Lecture 136.2 setReact
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        //Lecture 136.3 setTotal
        setTotal((prev) => --prev);
      }
    }
    //Lecture 134.5 setCheck
    else {
      setCheck(type);
      //Lecture 136.4 react not exist
      let index = reacts.findIndex((x) => x.react == type);
      //Lecture 136.7 if react already exist
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        //Lecture 136.5 increase setReacts
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        //Lecture 136.6 increase setTotal
        setTotal((prev) => ++prev);
        console.log(reacts);
      }
      //Lecture 136.8 check exist
      if (index1 !== -1) {
        //Lecture 136.9 set setReacts and decrease
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        //Lecture 136.10 settotal
        setTotal((prev) => --prev);
        console.log(reacts);
      }
    }
  };
  //Lecture 138.23 define showMore
  const showMore = () => {
    //Lecture 138.24 setCount
    setCount((prev) => prev + 3);
  };
  //Lecture 143.12 useRef for postRef
  const postRef = useRef(null);
  return (
    //Lecture 91.5 class post
    <div
      className="post"
      //Lecture 105.2 add inline style
      style={{ width: `${profile && "100%"}` }}
      //Lecture 143.13 reference it to whole post
      ref={postRef}
    >
      {/* //Lecture 91.5 class post_header  */}
      <div className="post_header">
        {/* //Lecture 91.5 Link to profile post.user.username */}
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          {/* //Lecture 91.7 img */}
          <img src={post.user.picture} alt="" />
          {/* //Lecture 91.7 class header_col */}
          <div className="header_col">
            {/* //Lecture 91.8 class post_profile_name */}
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              {/* //Lecture 91.9 class updated_p */}
              <div className="updated_p">
                {/* //Lecture 91.10 for profilepic */}
                {post.type == "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {/* //Lecture 91.10 for coverpic  */}
                {post.type ==
                  //  "cover"
                  //Lecture 113.28 change type to coverPicture
                  "coverPicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            {/* //Lecture 91.11 class post_profile_privacy_date */}
            <div className="post_profile_privacy_date">
              {/* //Lecture 91.12 call the component  */}
              <Moment
                //Lecture 91.14 fromNow update every 30s
                fromNow
                interval={30}
              >
                {/* //Lecture 91.13 add post created at  */}
                {post.createdAt}
              </Moment>
              {/* //Lecture 91.16 add dot and world svg  */}
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        {/* //Lecture 91.17 class post_header_right */}
        <div
          className="post_header_right hover1"
          //Lecture 97.8 onlick troggle setShowMenu
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {/* //Lecture 92.0 Post component-background & images, if post.background true */}
      {post.background ? (
        //Lecture 92.1 class post_bg
        <div
          className="post_bg"
          //Lecture 92.2 inline style
          style={{ backgroundImage: `url(${post.background})` }}
        >
          {/* //Lecture 92.3 class post_bg_text */}
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : //Lecture 111.0 Updated profile picture post, if post.type null
      post.type === null ? (
        //  (
        //Lecture 92.4 empty div
        <>
          {/* //Lecture 92.5 class post_text */}
          <div className="post_text">{post.text}</div>
          {/* //Lecture 92.6 for images */}
          {post.images && post.images.length && (
            //Lecture 92.7 div for images
            <div
              className={
                //Lecture 92.10 if lenth 1 till 5
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {/* //Lecture 92.8 post images  */}
              {/* {post.images.map((image, i) => ( */}
              {/* //Lecture 92.11 using slice */}
              {post.images.slice(0, 5).map((image, i) => (
                <img
                  src={image.url}
                  key={i}
                  alt=""
                  //Lecture 92.9 classname img+index
                  className={`img-${i}`}
                />
              ))}
              {/* //Lecture 92.12 if images more then 5*/}
              {post.images.length > 5 && (
                //Lecture 92.13 class more-pics-shadow
                <div className="more-pics-shadow">
                  {/* //Lecture 92.14 left imgs number */}+
                  {post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : //Lecture 111.1 else
      post.type === "profilePicture" ? (
        //Lecture 111.2 class post_profile_wrap
        <div className="post_profile_wrap">
          {/* //Lecture 111.4 class post_updated_bg */}
          <div className="post_updated_bg">
            {/* //Lecture 111.5 show img */}
            <img src={post.user.cover} alt="" />
          </div>
          {/* //Lecture 111.6 class updated picture */}
          <img
            src={post.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        //Lecture 111.3 else show cover wrap
        <div className="post_cover_wrap">
          {/* //Lecture 113.25 show img  */}
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      {/* //Lecture 94.0 Post reacts and actions, class post_infos */}
      <div className="post_infos">
        {/* //Lecture 94.0 class reacts_count */}
        <div className="reacts_count">
          {/* //Lecture 94.0 class reacts_count_imgs */}
          <div className="reacts_count_imgs">
            {/* //Lecture 135.9 check if reacts is true  */}
            {reacts &&
              //Lecture 135.10 map throught react
              reacts
                //Lecture 136.12 sort it before maping
                .sort((a, b) => {
                  return b.count - a.count;
                })
                //Lecture 135.10 map throught react
                .slice(0, 3)
                .map(
                  (react, i) =>
                    //Lecture 135.12 if more then 0
                    react.count > 0 && (
                      //Lecture 135.11 show reacts
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=""
                        //Lecture 144.2 add key
                        key={i}
                      />
                    )
                )}
          </div>
          {/* //Lecture 94.0 class reacts_count_num */}
          <div className="reacts_count_num">
            {/* //Lecture 135.15 if total exist */}
            {total > 0 && total}
          </div>
        </div>
        {/* //Lecture 94.1 class to_right */}
        <div className="to_right">
          {/* //Lecture 94.1 class comments_count */}
          <div className="comments_count">
            {/* 13 comments */}
            {/* //Lecture 138.32 show comments count  */}
            {comments.length} comments
          </div>
          {/* //Lecture 94.1 class share_count */}
          <div className="share_count">1 share</div>
        </div>
      </div>
      {/* //Lecture 94.2 class post_actions */}
      <div className="post_actions">
        {/* //Lecture 94.5 call ReactsPopup */}
        <ReactsPopup
          //Lecture 94.9 pass visible and setVisible
          visible={visible}
          setVisible={setVisible}
          //Lecture 133.6 pass postId
          // postId={post._id}
          //Lecture 134.6 pass reactHandler and remove postid
          reactHandler={reactHandler}
        />
        {/* //Lecture 94.2 class post_action */}
        <div
          className="post_action hover1"
          //Lecture 94.13 onMouse hover setVisible to true
          onMouseOver={() => {
            //Lecture 94.15 setTime out fn
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          //Lecture 94.14 onMouse leave
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          //Lecture 134.8 add onclick
          onClick={() => reactHandler(check ? check : "like")}
        >
          {/* //Lecture 133.31 if check true */}
          {check ? (
            <img
              //Lecture 133.32 show react pass src to style
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            //Lecture 94.2 class like_icon
            <i className="like_icon"></i>
          )}

          <span
            //Lecture 134.1 add style color
            style={{
              color: `
        
        ${
          check === "like"
            ? "#4267b2"
            : check === "love"
            ? "#f63459"
            : check === "haha"
            ? "#f7b125"
            : check === "sad"
            ? "#f7b125"
            : check === "wow"
            ? "#f7b125"
            : check === "angry"
            ? "#e4605a"
            : ""
        }
        `,
            }}
          >
            {/* Like */}
            {/* //Lecture 134.0 React and unReact and like button,styles, if check true */}
            {check ? check : "Like"}
          </span>
        </div>
        {/* //Lecture 94.2 class comment_icon */}
        <div className="post_action hover1">
          {/* //Lecture 94.2 class comment_icon */}
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        {/* //Lecture 94.2 class post_action */}
        <div className="post_action hover1">
          {/* //Lecture 94.2 class share_icon */}
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      {/* //Lecture 95.0 Create comment,emojis,image, class comments_wrap */}
      <div className="comments_wrap">
        {/* //Lecture 95.0 Create comment,emojis,image, class comments_order */}
        <div className="comments_order"></div>
        {/* //Lecture 95.2 call createComment */}
        <CreateComment
          //Lecture 95.5 pass the user
          user={user}
          //Lecture 137.15 pass post._id
          postId={post._id}
          //Lecture 138.4 pass setComments
          setComments={setComments}
          //Lecture 138.29 pass setCount
          setCount={setCount}
        />
        {/* //Lecture 138.6 if we have commetns */}
        {comments &&
          //Lecture 138.7 slice and map through
          comments
            //Lecture 138.25 sort comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(
              0,
              // 3
              //Lecture 138.19 add count
              count
            )
            .map((comment, i) => (
              //Lecture 138.9 call Comment
              <Comment
                //Lecture 138.10 pass comment and key
                comment={comment}
                key={i}
              />
            ))}
        {/* //Lecture 138.20 check if count is less  */}
        {count < comments.length && (
          //Lecture 138.21 add class view_comments and text
          <div
            className="view_comments"
            //Lecture 138.22 add onclick
            onClick={() => showMore()}
          >
            View more comments
          </div>
        )}
      </div>
      {/* //Lecture 97.7 if showmenu true */}
      {showMenu && (
        //Lecture 96.1 call PostMenu
        <PostMenu
          //Lecture 96.11 pass userid, postUserId,imagesLength
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          //Lecture 97.11 pass setShowMenu
          setShowMenu={setShowMenu}
          //Lecture 141.18 pass postId and token
          postId={post._id}
          token={user.token}
          //Lecture 141.25 pass checkSaved and setCheckSaved
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          //Lecture 142.4 pass images
          images={post.images}
          //Lecture 143.14 pass postRef
          postRef={postRef}
        />
      )}
    </div>
  );
}
