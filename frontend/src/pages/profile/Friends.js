//Lecture 105.29 import Link
import { Link } from "react-router-dom";
//Lecture 105.27 Create pages:profile:Friends.js
export default function Friends({
  //Lecture 105.28 get friends
  friends,
}) {
  return (
    //Lecture 105.29 class profile_card
    <div className="profile_card">
      {/* //Lecture 105.29 class profile_card_header */}
      <div className="profile_card_header">
        Friends
        {/* //Lecture 105.29 class profile_header_link */}
        <div className="profile_header_link">See all friends</div>
      </div>
      {/* //Lecture 105.29 if friends exist */}
      {friends && (
        //Lecture 105.29 check friends count
        <div className="profile_card_count">
          {friends.length === 0
            ? ""
            : friends.length === 1
            ? "1 Friend"
            : `${friends.length} Friends`}
        </div>
      )}
      {/* //Lecture 105.29 class profile_card_grid */}
      <div className="profile_card_grid">
        {/* //Lecture 105.29 if friends exist */}
        {friends &&
          //Lecture 105.29 map through
          friends.slice(0, 9).map((friend, i) => (
            <Link
              //Lecture 105.29 map through
              to={`/profile/${friend.username}`}
              className="profile_photo_card"
              //Lecture 128.10 add key
              key={i}
            >
              {/* //Lecture 130.2 add img  */}
              <img src={friend.picture} alt="" />
              {/* //Lecture 130.3 add span name  */}
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
