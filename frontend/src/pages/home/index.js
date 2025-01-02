//Lecture 46.9 creating ref
// import { useRef, useState } from "react";
//Lecture 44.2 call the header
import Header from "../../components/header";
//Lecture 46.15 import useClickOustside
// import useClickOutside from "../../helpers/clickOutside";
//Lecture 54.4 import useSelector
import { useSelector } from "react-redux";
//Lecture 54.5 import LeftHOme
import LeftHome from "../../components/home/left";
//Lecture 56.2 import righthome
import RightHome from "../../components/home/right";
//Lecture 57.3 import stories
import Stories from "../../components/home/stories";
//Lecture 58.2 import CreatePost
import CreatePost from "../../components/createPost";
//Lecture 65.10 import sendVerification
import SendVerification from "../../components/home/sendVerification";
//Lecture 91.2 import post
import Post from "../../components/post";
import {
  //Lecture 93.3 import useEffect
  useEffect,
  //Lecture 93.1 import useRef
  useRef,
  //Lecture 93.0 import useState
  useState,
} from "react";
//Lecture 29.7 Create Pages:Home:index.js, Create component rfc
// export default function Home() {
//Lecture 85.3 get the setVisible
export default function Home({
  setVisible,
  //Lecture 90.23 get the posts
  posts,
  //Lecture 139.1 get the loading
  loading,
  //Lecture 140.24 get getAllPosts
  getAllPosts,
}) {
  //Lecture 46.13 alternative way using useState
  // const [visible, setVisible] = useState(true);
  //Lecture 46.9 creating ref
  // const el = useRef(null);
  //Lecture 46.11 pass el and fun
  // useClickOutside(el, () => {
  //   //Lecture 46.12 hiding the area
  //   el.current.style.display = "none";
  // });
  //Lecture 46.15 hiding the area
  // useClickOutside(el, () => {
  //   //Lecture 46.16 making setVisible false
  //   el.current.style.display = "none";
  // });
  //Lecture 54.4 extract user from useSelector
  // const { user } = useSelector((user) => ({ ...user }));
  //Lecture 65.23 take the user from state
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 93.1 define useRef
  const middle = useRef(null);
  //Lecture 93.0 Responsive post and fix home problem, usestate for set height
  const [height, setHeight] = useState();
  //Lecture 93.3 use useEffect
  useEffect(() => {
    //Lecture 93.4 setHeight
    setHeight(middle.current.clientHeight);
  }, [
    //Lecture 139.2 add dependency loading and height
    loading,
    height,
  ]);
  /* //Lecture 29.7 Create component rfc*/
  // return <div>Home</div>;
  //Lecture 44.2 call the header
  return (
    //Lecture 44.2 call the header
    // <div>
    //Lecture 57.4 add class home
    <div
      className="home"
      //Lecture 93.5 add inline style
      style={{ height: `${height + 150}px` }}
    >
      {/* //Lecture 44.2 call the header */}
      <Header
        //Lecture 100.4 pass the home
        page="home"
        //Lecture 140.25 pass getAllPosts
        getAllPosts={getAllPosts}
      />
      {/* //Lecture 46.10 passing ref element */}
      {/* <div className="card" ref={el}></div> */}
      {/* //Lecture 46.14 not visible until setVisible true */}
      {/* {visible && <div className="card" ref={el}></div>} */}
      {/* //Lecture 54.2 add Left Home */}
      {/* <LeftHome  /> */}
      {/* //Lecture 54.5 pass the user */}
      <LeftHome user={user} />
      {/* //Lecture 57.0 Let's work on stories, class home_middle */}
      <div
        className="home_middle"
        //Lecture 93.2 reference to home_middle
        ref={middle}
      >
        {/* //Lecture 57.3 call the storeis */}
        <Stories />
        {/* //Lecture 65.10 call sendVerification */}
        {/* {<SendVerification  />} */}
        {/* //Lecture 65.20 pass the user */}
        {/* {<SendVerification user={user} />} */}
        {/* //Lecture 65.24 if user.verified is false then show */}
        {user.verified === false && <SendVerification user={user} />}
        {/* //Lecture 58.2 call CreatePost */}
        {/* <CreatePost /> */}
        {/* //Lecture 58.4 pass user */}
        {/* <CreatePost user={user} /> */}
        {/* //Lecture 85.4 pass the setVisible to create post  */}
        <CreatePost user={user} setVisible={setVisible} />
        {/* //Lecture 91.0 Post component-header, add class posts */}
        <div className="posts">
          {/* //Lecture 90.24 map through posts  */}
          {posts.map((post) => (
            //Lecture 90.25 class post
            // <div className="post" key={post._id}>
            //Lecture 90.26 show postid
            // {post._id}
            // </div>
            //Lecture 91.2 return post component
            <Post
              //Lecture 91.3 pass key and post
              key={post._id}
              post={post}
              //Lecture 95.3 pass the user
              user={user}
            />
          ))}
        </div>
      </div>
      {/* //Lecture 56.2 righthome */}
      {/* <RightHome /> */}
      {/* //Lecture 56.13 pass the user */}
      <RightHome user={user} />
    </div>
  );
}
