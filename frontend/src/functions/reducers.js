//Lecture 99.5 create functions:reducer.js, paste reducer fn, change to postsReducer
export function postsReducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
//Lecture 99.7 create profileReducer
export function profileReducer(state, action) {
  switch (action.type) {
    //Lecture 99.8 PROFILE_REQUEST
    case "PROFILE_REQUEST":
      return { ...state, loading: true, error: "" };
    //Lecture 99.8 PROFILE_SUCCESS
    case "PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        //Lecture 99.8 profile
        profile: action.payload,
        error: "",
      };
    //Lecture 140.16 Create new action
    case "PROFILE_POSTS":
      return {
        loading: false,
        // profile: { ...state, posts: action.payload },
        //Lecture 144.0 Fix a big problem on profile after creating post(very important !), spread state.profile
        profile: { ...state.profile, posts: action.payload },
        error: "",
      };
    //Lecture 99.8 PROFILE_ERROR
    case "PROFILE_ERROR":
      return { ...state, loading: false, error: action.payload };

    //Lecture 99.8 default
    default:
      return state;
  }
}
//Lecture 105.6 Create photosReducer
export function photosReducer(state, action) {
  switch (action.type) {
    //Lecture 105.7 PHOTOS_REQUEST
    case "PHOTOS_REQUEST":
      return { ...state, loading: true, error: "" };
    //Lecture 105.8 PHOTOS_SUCCESS
    case "PHOTOS_SUCCESS":
      return {
        ...state,
        loading: false,
        //Lecture 105.11 photos
        photos: action.payload,
        error: "",
      };
    //Lecture 105.9 PHOTOS_ERROR
    case "PHOTOS_ERROR":
      return { ...state, loading: false, error: action.payload };

    //Lecture 105.10 default
    default:
      return state;
  }
}
//Lecture 150.15 userReducer for friendspage
export function friendspage(state, action) {
  switch (action.type) {
    //Lecture 150.16 define FRIENDS_REQUEST
    case "FRIENDS_REQUEST":
      return { ...state, loading: true, error: "" };
    //Lecture 150.17 define FRIENDS_SUCCESS
    case "FRIENDS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    //Lecture 150.18 define FRIENDS_ERROR
    case "FRIENDS_ERROR":
      return { ...state, loading: false, error: action.payload };

    //Lecture 150.19 default
    default:
      return state;
  }
}
