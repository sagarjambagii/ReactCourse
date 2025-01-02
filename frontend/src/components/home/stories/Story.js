//Lecture 57.10 Create components:stories:Story.js
// export default function Story() {
//Lecture 57.12 get the story
export default function Story({ story }) {
  return (
    //Lecture 57.13 class story
    <div className="story">
      {/* //Lecture 57.13 image  */}
      <img src={story.image} alt="" className="story_img" />
      {/* //Lecture 57.13 class story_profile_pic  */}
      <div className="story_profile_pic">
        {/* //Lecture 57.13 image  */}
        <img src={story.profile_picture} alt="" />
      </div>
      {/* //Lecture 57.13 class story_profile_name  */}
      <div className="story_profile_name">{story.profile_name}</div>
    </div>
  );
}
