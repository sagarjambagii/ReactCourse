//Lecture 56.10 Create home:right:Contact.js
// export default function Contact() {
//Lecture 56.16 get the user
export default function Contact({ user }) {
  return (
    //Lecture 56.12 class contact
    <div className="contact hover3">
      {/* //Lecture 56.12 class contact_img */}
      <div className="contact_img">
        {/* //Lecture 56.17 img */}
        <img src={user.picture} alt="" />
      </div>
      {/* //Lecture 56.17 span */}
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
}
