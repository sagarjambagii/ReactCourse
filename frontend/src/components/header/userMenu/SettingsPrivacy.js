//Lecture 49.29 Create userMenu:SettingsPrivacy.js,  RFC
// export default function SettingsPrivacy() {
//Lecture 50.7 get setVisible
export default function SettingsPrivacy({ setVisible }) {
  return (
    //Lecture 49.31 class absolute_wrap
    <div className="absolute_wrap">
      {/* //Lecture 49.32 class absolute_wrap_header */}
      <div className="absolute_wrap_header">
        {/* //Lecture 49.33 class circle */}
        <div
          // className="circle"
          //Lecture 50.5 adding hover1
          className="circle hover1"
          //Lecture 50.8 onClick and setVisible to 0
          onClick={() => {
            setVisible(0);
          }}
        >
          {/* //Lecture 49.34 icon */}
          <i className="arrow_back_icon"></i>
        </div>
        {/* //Lecture 49.35 name */}
        Settings & privacy
      </div>
      {/* //Lecture 49.36 class mmenu_item */}
      <div className="mmenu_item hover3">
        {/* //Lecture 49.37 class small_circle */}
        <div className="small_circle">
          {/* //Lecture 49.37 icon */}
          <i className="settings_filled_icon"></i>
        </div>
        {/* //Lecture 49.37 span */}
        <span>Settings</span>
      </div>
      {/* //Lecture 50.0 User menu part 2, Privacy Chekup */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="privacy_checkup_icon"></i>
        </div>
        <span>Privacy Chekup</span>
      </div>
      {/* //Lecture 50.1 Privacy Shortcuts */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="privacy_shortcuts_icon"></i>
        </div>
        <span>Privacy Shortcuts</span>
      </div>
      {/* //Lecture 50.2 Activity log */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="activity_log_icon"></i>
        </div>
        <span>Activity log</span>
      </div>
      {/* //Lecture 50.3 News Feed Prefrences */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="news_icon"></i>
        </div>
        <span>News Feed Prefrences</span>
      </div>
      {/* //Lecture 50.4 Language */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="language_icon"></i>
        </div>
        <span>Language</span>
      </div>
    </div>
  );
}
