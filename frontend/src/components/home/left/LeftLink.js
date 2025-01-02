//Lecture 54.8 Create home:left:LeftLink.js , RFC
// export default function LeftLink() {
//Lecture 54.11 get the img, text, notification
export default function LeftLink({ img, text, notification }) {
  return (
    //Lecture 54.10 add classname
    <div className="left_link hover1">
      {/* //Lecture 54.12 img */}
      <img src={`../../../left/${img}.png`} alt="" />
      {/* //Lecture 54.12 if notification is not undefined show div */}
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        //Lecture 54.12 if notification is undefined show span
        <span>{text}</span>
      )}
    </div>
  );
}
