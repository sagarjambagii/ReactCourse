//Lecture 88.15 import axios
import axios from "axios";

//Lecture 88.9 define uplaodImages fn
export const uploadImages = async (formData, path, token) => {
  //Lecture 88.14 add trycatch
  try {
    //Lecture 88.15 get the data from axios
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      formData,
      {
        //Lecture 88.16 send authorization and content-type
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    //Lecture 88.17 return data
    return data;
  } catch (error) {
    //Lecture 88.14 return error message
    return error.response.data.message;
  }
};
