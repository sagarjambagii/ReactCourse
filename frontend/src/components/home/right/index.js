//Lecture 56.5 import svgs
import { Dots, NewRoom, Search } from "../../../svg";
import Contact from "./Contact";
//Lecture 56.1 Create style.css, import style.css
import "./style.css";
//Lecture 56.0 Right home side, Create home:right:index.js
// export default function RightHome() {
//Lecture 56.14 get the user
export default function RightHome({ user }) {
  //Lecture 56.6 define the color
  const color = "#65676b";
  return (
    //Lecture 56.3 classname right_home
    <div className="right_home">
      {/* //Lecture 56.3 classname heading */}
      <div className="heading">Sponsored</div>
      {/* //Lecture 56.3 classname splitter1 */}
      <div className="splitter1"></div>
      {/* //Lecture 56.3 classname contacts_wrap */}
      <div className="contacts_wrap">
        {/* //Lecture 56.3 classname contacts_header */}
        <div className="contacts_header">
          {/* //Lecture 56.3 classname contacts_header_left */}
          <div className="contacts_header_left">Contacts</div>
          {/* //Lecture 56.3 classname contacts_header_right */}
          <div className="contacts_header_right">
            {/* //Lecture 56.4 class contact_circle */}
            <div className="contact_circle hover1">
              {/* //Lecture 56.7 Newroom svg and color */}
              <NewRoom color={color} />
            </div>
            {/* //Lecture 56.8 Search svg */}
            <div className="contact_circle hover1">
              <Search color={color} />
            </div>
            {/* //Lecture 56.8 Dots svg */}
            <div className="contact_circle hover1">
              <Dots color={color} />
            </div>
          </div>
        </div>
        {/* //Lecture 56.9 class contacts_list */}
        <div className="contacts_list">
          {/* //Lecture 56.11 call Contact */}
          {/* <Contact /> */}
          {/* //Lecture 56.15 pass the user */}
          <Contact user={user} />
        </div>
      </div>
    </div>
  );
}
