//Lecture 138.17 import Moment
import Moment from "react-moment";

//Lecture 138.8 Create components:post:comment.js, RFC
export default function Comment({
  //Lecture 138.11 get comment
  comment,
}) {
  return (
    //Lecture 138.12 class comment
    <div className="comment">
      {/* //Lecture 138.13 img and src  */}
      <img src={comment.commentBy.picture} alt="" className="comment_img" />
      {/* //Lecture 138.13 class comment_col  */}
      <div className="comment_col">
        {/* //Lecture 138.13 class comment_wrap  */}
        <div className="comment_wrap">
          {/* //Lecture 138.13 class comment_name  */}
          <div className="comment_name">
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          {/* //Lecture 138.14 class comment_text  */}
          <div className="comment_text">{comment.comment}</div>
        </div>
        {/* //Lecture 138.15 if img exist  */}
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        {/* //Lecture 138.16 class comment_actions  */}
        <div className="comment_actions">
          {/* //Lecture 138.16 span like and reply  */}
          <span>Like</span>
          <span>Reply</span>
          {/* //Lecture 138.17 moment and time  */}
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
