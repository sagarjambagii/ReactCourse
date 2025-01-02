import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
//Lecture 47.18 import useClickOutside
import useClickOutside from "../../helpers/clickOutside";
import {
  //Lecture 145.20 import search fn
  search,
  //Lecture 146.18 import addToSearchHistory
  addToSearchHistory,
  //Lecture 147.12 import getSearchHistory
  getSearchHistory,
  //Lecture 148.10 import removeFromSearch
  removeFromSearch,
} from "../../functions/user";
//Lecture 145.26 import link
import { Link } from "react-router-dom";

//Lecture 47.0 Search menu, Create header:SearchMenu.js
// export default function SearchMenu({ color }) {
//Lecture 47.21 get the props
export default function SearchMenu({
  color,
  setShowSearchMenu,
  //Lecture 145.22 get token
  token,
}) {
  //Lecture 47.27 state for icon
  const [iconVisible, setIconVisible] = useState(true);
  //Lecture 145.11 useState for searchTerm
  const [searchTerm, setSearchTerm] = useState("");
  //Lecture 145.12 useState for results
  const [results, setResults] = useState([]);
  //Lecture 147.9 useState for searchHistory
  const [searchHistory, setSearchHistory] = useState([]);
  //Lecture 47.16 define useRef
  const menu = useRef(null);
  //Lecture 47.24 focus on whole div , define useRef
  const input = useRef(null);
  //Lecture 47.19 pass the menu and fun
  useClickOutside(menu, () => {
    //Lecture 47.22 making setShowSearchMenu false
    setShowSearchMenu(false);
  });
  //Lecture 147.10 when page loads
  useEffect(() => {
    //Lecture 147.14 call getHistory
    getHistory();
  }, []);
  //Lecture 147.11 define getHistory fn
  const getHistory = async () => {
    //Lecture 147.12 call getSearchHistory
    const res = await getSearchHistory(token);
    //Lecture 147.13 set setSearchHistory
    setSearchHistory(res);
  };
  //Lecture 47.31 on component load using useeffect
  useEffect(() => {
    input.current.focus();
  }, []);

  //Lecture 145.16 define searchHandler fn
  const searchHandler = async () => {
    //Lecture 145.17 check if search term is ""
    if (searchTerm === "") {
      //Lecture 145.18 setResults ""
      setResults("");
    }
    //Lecture 145.19 else
    else {
      //Lecture 145.20 call search fn
      const res = await search(searchTerm, token);
      //Lecture 145.23 setResults
      setResults(res);
    }
  };
  //Lecture 146.17 Create addToSearchHistoryHandler fn
  const addToSearchHistoryHandler = async (searchUser) => {
    //Lecture 146.18 call addToSearchHistory
    const res = await addToSearchHistory(searchUser, token);
    //Lecture 147.22 call get history
    getHistory();
  };
  //Lecture 148.9 Create handleRemove fn
  const handleRemove = async (searchUser) => {
    //Lecture 148.10 call removeFromSearch
    removeFromSearch(searchUser, token);
    //Lecture 148.11 call getHistory
    getHistory();
  };
  return (
    //Lecture 47.2 adding class
    // <div className="header_left search_area scrollbar">
    //Lecture 47.17 ref will be div
    <div className="header_left search_area scrollbar" ref={menu}>
      {/* //Lecture 47.3 search wrap */}
      <div className="search_wrap">
        {/* //Lecture 47.4 header logo */}
        <div className="header_logo">
          {/* //Lecture 47.5 circle hover */}
          <div
            className="circle hover1"
            //Lecture 47.23 hiding when we click back button
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            {/* //Lecture 47.6 return svg */}
            <Return color={color} />
          </div>
        </div>
        {/* //Lecture 47.7 search div */}
        <div
          className="search"
          //Lecture 47.26 take ref and focus
          onClick={() => {
            input.current.focus();
          }}
        >
          {/* //Lecture 47.28 if iconVisible true show */}
          {iconVisible && (
            <div>
              {/* //Lecture 47.8 search icon */}
              <Search color={color} />
            </div>
          )}
          {/* //Lecture 47.9 input type */}
          {/* <input type="text" placeholder="Search Facebook" /> */}
          <input
            type="text"
            placeholder="Search Facebook"
            //Lecture 47.25 add input ref
            ref={input}
            //Lecture 47.29 onFocus set iconvisible to false
            onFocus={() => {
              setIconVisible(false);
            }}
            //Lecture 47.30 onBlur set iconvisible to true
            onBlur={() => {
              setIconVisible(true);
            }}
            //Lecture 145.13 add value
            value={searchTerm}
            //Lecture 145.14 onChange
            onChange={(e) => setSearchTerm(e.target.value)}
            //Lecture 145.15 add onkeyup
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      {/* //Lecture 47.10 history div */}
      <div className="search_history_header">
        {/* //Lecture 47.11 span and edit */}
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      {/* //Lecture 47.12 search history and scrollbar */}
      <div className="search_history scrollbar">
        {/* //Lecture 147.15 when searchHistory true and results ""  */}
        {searchHistory &&
          results == "" &&
          //Lecture 147.16 sort and map searchHistory
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              //Lecture 147.17 class search_user_item and add key
              <div className="search_user_item hover1" key={user._id}>
                {/* //Lecture 147.18 link class flex */}
                <Link
                  className="flex"
                  //Lecture 147.19 to profile
                  to={`/profile/${user.user.username}`}
                  //Lecture 147.23 add onclick
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  {/* //Lecture 147.20 show img and span  */}
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                {/* //Lecture 147.21 icon  */}
                <i
                  className="exit_icon"
                  //Lecture 148.8 add onclick
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {/* //Lecture 145.24 if results true  */}
        {results &&
          //Lecture 145.25 map through result
          results.map((user) => (
            //Lecture 145.26 Link to
            <Link
              //Lecture 145.27 pass to
              to={`/profile/${user.username}`}
              //Lecture 145.29 add class search_user_item
              className="search_user_item hover1"
              //Lecture 146.16 add onclick
              onClick={() => addToSearchHistoryHandler(user._id)}
            >
              {/* //Lecture 145.28 img and span  */}
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
