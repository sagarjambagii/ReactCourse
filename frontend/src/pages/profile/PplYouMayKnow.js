//Lecture 102.4 import dot
import { Dots } from "../../svg";
//Lecture 102.6 import stories
import { stories } from "../../data/home";
//Lecture 102.8 import AddFriendSmallCard
import AddFriendSmallCard from "./AddFriendSmallCard";
//Lecture 102.1 Create pages:profile:PplYouMayKnow.js, RFC
export default function PplYouMayKnow() {
  return (
    //Lecture 102.3 class pplumayknow
    <div className="pplumayknow">
      {/* //Lecture 102.3 class pplumayknow_header */}
      <div className="pplumayknow_header">
        People You May Know
        {/* //Lecture 102.4 class post_header_right and dot */}
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      {/* //Lecture 102.5 class pplumayknow_list */}
      <div className="pplumayknow_list">
        {/* //Lecture 102.6 map through stories */}
        {stories.map((item, i) => (
          //Lecture 102.8 call AddFriendSmallCard
          <AddFriendSmallCard
            //Lecture 102.9 pass item
            item={item}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
