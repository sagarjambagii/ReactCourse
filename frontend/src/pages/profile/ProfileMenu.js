//Lecture 101.12 import Link
import { Link } from "react-router-dom";
//Lecture 101.13  import Dots
import { Dots } from "../../svg";

//Lecture 101.9 Create pages:profile:ProfileMenu.js , RFC
export default function ProfileMenu() {
  return (
    //Lecture 101.11 class profile_menu_wrap
    <div className="profile_menu_wrap">
      {/* //Lecture 101.11 class profile_menu */}
      <div className="profile_menu">
        {/* //Lecture 101.12 Links class profile_menu_active */}
        <Link to="/" className="profile_menu_active">
          Posts
        </Link>
        {/* //Lecture 101.12 Links class hover1 */}
        <Link to="/" className="hover1">
          About
        </Link>
        {/* //Lecture 101.12 Links class hover1 */}
        <Link to="/" className="hover1">
          Friends
        </Link>
        {/* //Lecture 101.12 Links class hover1 */}
        <Link to="/" className="hover1">
          Photos
        </Link>
        {/* //Lecture 101.12 Links class hover1 */}
        <Link to="/" className="hover1">
          Videos
        </Link>
        {/* //Lecture 101.12 Links class hover1 */}
        <Link to="/" className="hover1">
          Check-ins
        </Link>
        {/* //Lecture 101.12 Links class hover1 */}
        <Link to="/" className="hover1">
          More
        </Link>
        {/* //Lecture 101.13  class p10_dots */}
        <div className="p10_dots">
          <Dots />
        </div>
      </div>
    </div>
  );
}
