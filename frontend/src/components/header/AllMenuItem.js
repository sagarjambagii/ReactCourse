//Lecture 48.17 Create header folder:allmenuItem.js
// export default function AllMenuItem() {
//Lecture 48.19 get the name and description and icon from props
export default function AllMenuItem({ name, description, icon }) {
  return (
    //Lecture 48.11 adding all menu item
    <div className="all_menu_item hover1">
      {/* //Lecture 48.12 image source */}
      {/* <img src={`../../left/campus.png`} alt="" /> */}
      {/* //Lecture 48.18 adding icon from prop */}
      <img src={`../../left/${icon}.png`} alt="" />
      {/* //Lecture 48.13 adding all menu column */}
      <div className="all_menu_col">
        {/* //Lecture 48.14 adding span */}
        <span>{name}</span>
        {/* //Lecture 48.18 adding name and description */}
        <span>{description}</span>
      </div>
    </div>
  );
}
