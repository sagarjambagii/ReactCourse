//Lecture 55.9 Create home:left:Shortcut.js , RFC
// export default function Shortcut() {
//Lecture 55.13 extract link, img name
export default function Shortcut({ link, img, name }) {
  return (
    //Lecture 55.14 classname
    <a href={link} target="_blank" rel="noreferrer" className="shortcut_item">
      {/* //Lecture 55.15 img */}
      <img src={img} alt="" />
      {/* //Lecture 55.15 name */}
      <span>{name}</span>
    </a>
  );
}
