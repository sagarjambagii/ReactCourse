//Lecture 86.6 import axios
import axios from "axios";
//Lecture 86.3 Create funtions folder:post.js
export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  //Lecture 86.4 add try catch
  try {
    //Lecture 86.6 get the data, put req
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        //Lecture 86.7 send the data
        type,
        background,
        text,
        images,
        user,
      },
      {
        //Lecture 86.8 send the token
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 86.9 return data
    // return data;
    //Lecture 87.1 return ok
    // return "ok";
    //Lecture 140.1 status okay and send the data
    return { status: "ok", data };
  } catch (error) {
    //Lecture 86.5 return error message
    return error.response.data.message;
  }
};
//Lecture 133.0 React on a post and get existing, copy paste createPost
export const reactPost = async (
  //Lecture 133.1 pass postid to token
  postId,
  react,
  token
) => {
  try {
    const { data } = await axios.put(
      //Lecture 133.2 change the route
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      {
        //Lecture 133.3 send it in body
        postId,
        react,
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
//Lecture 133.16 Create getReacts fn, copy paste reactPost
export const getReacts = async (
  //Lecture 133.17 pass postid and token
  postId,
  token
) => {
  try {
    const { data } = await axios.get(
      //Lecture 133.18 change route
      `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 133.19 return data
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 137.11 Create comment, copy getReacts
export const comment = async (postId, comment, image, token) => {
  try {
    //Lecture 137.12 put requrest
    const { data } = await axios.put(
      //Lecture 137.13 change the path
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      {
        //Lecture 137.14 send the info
        postId,
        comment,
        image,
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
//Lecture 141.15 create savePost fn, copy paste comment
export const savePost = async (postId, token) => {
  try {
    const { data } = await axios.put(
      //Lecture 141.16 change the route
      `${process.env.REACT_APP_BACKEND_URL}/savePost/${postId}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//Lecture 143.6 Create deletePost fn , copy paste savePost
export const deletePost = async (postId, token) => {
  try {
    const { data } = await axios.delete(
      //Lecture 143.7 change the route
      `${process.env.REACT_APP_BACKEND_URL}/deletePost/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //Lecture 143.8 return the data
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
