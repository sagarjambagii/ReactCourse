//Lecture 102.7 Create pages:profile:AddFriendSmallCard.js, RFC
export default function AddFriendSmallCard({
  //Lecture 102.10 get item
  item,
}) {
  return (
    //Lecture 102.11 class addfriendCard
    <div className="addfriendCard">
      {/* //Lecture 102.11 class addfriend_imgsmall */}
      <div className="addfriend_imgsmall">
        {/* //Lecture 102.11 img */}
        <img src={item.profile_picture} alt="" />
        {/* //Lecture 102.11 class addfriend_infos */}
        <div className="addfriend_infos">
          {/* //Lecture 102.11 class addfriend_name */}
          <div className="addfriend_name">
            {/* //Lecture 102.13 lenght more then 11 */}
            {item.profile_name.length > 11
              ? `${item.profile_name.substring(0, 11)}...`
              : //Lecture 102.13 else
                item.profile_name}
          </div>
          {/* //Lecture 102.12 class light_blue_btn */}
          <div className="light_blue_btn">
            {/* //Lecture 102.12 img */}
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
}
