//Lecture 96.3 Create components:post:MenuItem.js, RFC
export default function MenuItem({
  //Lecture 96.4 get the properties
  icon,
  title,
  subtitle,
  img,
}) {
  return (
    //Lecture 96.5 li list class hover1
    <li className="hover1">
      {/* //Lecture 96.22 if have img */}
      {img ? (
        //Lecture 96.22 show img
        <img src={img} alt="" />
      ) : (
        //Lecture 96.6 class icon
        <i className={icon}></i>
      )}
      {/* //Lecture 96.7 class post_menu_text */}
      <div className="post_menu_text">
        {/* //Lecture 96.8 titile and subtitle */}
        <span>{title}</span>
        {
          //Lecture 96.9 when subtitle is true show
          subtitle && <span className="menu_post_col">{subtitle}</span>
        }
      </div>
    </li>
  );
}
