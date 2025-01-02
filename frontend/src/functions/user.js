//Lecture 108.38 import axios
import axios from "axios";
//Lecture 108.35 Create funtions:user.js , Create updateprofilePicture fn
export const updateprofilePicture = async (url, token) => {
  //Lecture 108.36 add trycatch
  try {
    //Lecture 108.38 get the data and add path
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 108.40 return ok
    return "ok";
  } catch (error) {
    //Lecture 108.37 return error
    return error.response.data.message;
  }
};
//Lecture 113.7 Create updateCover fn
export const updateCover = async (url, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 113.8 change to updateCover
      `${process.env.REACT_APP_BACKEND_URL}/updateCover`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.0 Submit requests part 1, Create addFriend fn, copyy paste updateCover
export const addFriend = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.1 change the route
      `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.2, CREate cancelRequest,  copyy paste addFriend
export const cancelRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.3 change the route
      `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.4, CREate follow,  copyy paste cancelRequest
export const follow = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.5 change route
      `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.6, CREate unfollow,  copyy paste follow
export const unfollow = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.7 change route
      `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.8, CREate acceptRequest,  copyy paste unfollow
export const acceptRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.9 change route
      `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.10, CREate unfriend,  copyy paste acceptRequest
export const unfriend = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.11 change route
      `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 127.12 CREate deleteRequest,  copyy paste unfriend
export const deleteRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 127.13 change route
      `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 145.7 define search fn, copy paste deleteRequest
export const search = async (
  //Lecture 145.8 get the search ter, and token
  searchTerm,
  token
) => {
  try {
    const { data } = await axios.post(
      //Lecture 145.9 change the url
      `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 145.10 return data
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 146.13 Create addToSearchHistory fn, copy paste search
export const addToSearchHistory = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 146.14 change the path
      `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
      {
        //Lecture 146.15 pass the information
        searchUser,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 147.6 create getSearchHistory fn, copy paste addToSearchHistory
export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      //Lecture 147.7 change the route
      `${process.env.REACT_APP_BACKEND_URL}/getSearchHistory`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 147.8 return the data
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 148.6 create removeFromSearch fn, copy paste getSearchHistory
export const removeFromSearch = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 148.7 change the path
      `${process.env.REACT_APP_BACKEND_URL}/removeFromSearch`,
      { searchUser },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 150.7 Create getFriendsPageInfos fn, Copy paste removeFromSearch
export const getFriendsPageInfos = async (token) => {
  try {
    const { data } = await axios.get(
      //Lecture 150.8 change the url
      `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 150.8 return ok and data
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};
