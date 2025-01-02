//Lecture 50.17 Create userMenu: DisplayAccessibility.js, RFC
// export default function DisplayAccessibility() {
//Lecture 50.25 get the setVisible
export default function DisplayAccessibility({ setVisible }) {
  return (
    //Lecture 50.19 class absolute_wrap
    <div className="absolute_wrap">
      {/* //Lecture 50.19 class absolute_wrap_header */}
      <div className="absolute_wrap_header">
        {/* //Lecture 50.19 class circle hover1 */}
        <div
          className="circle hover1"
          //Lecture 50.25 setVisible to 0
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        {/* //Lecture 50.19 display and accesibility */}
        Display & Accessibility
      </div>
      {/* //Lecture 50.20 class mmenu_main  */}
      <div className="mmenu_main">
        {/* //Lecture 50.21  class small_circle */}
        {/* <div className="small_circle" > */}
        {/* //Lecture 50.31 fix style */}
        <div className="small_circle" style={{ width: "50px" }}>
          {/* //Lecture 50.22  icon */}
          <i className="dark_filled_icon"></i>
        </div>
        {/* //Lecture 50.23  class mmenu_col */}
        <div className="mmenu_col">
          {/* //Lecture 50.24  menu span1 and span 2 */}
          <span className="mmenu_span1">Dark Mode</span>
          <span className="mmenu_span2">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      {/* //Lecture 50.27 Label for darkOff */}
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      {/* //Lecture 50.28 Label for darkOn */}
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
      {/* //Lecture 50.29 copy mmenu_main */}
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          {/* //Lecture 50.29 Compact mode */}
          <span className="mmenu_span1">Compact mode</span>
          <span className="mmenu_span2">
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      {/* //Lecture 50.29 label for compactOff */}
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      {/* //Lecture 50.29 label for compactOn */}
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      {/* //Lecture 50.30 mmenu_item */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}
