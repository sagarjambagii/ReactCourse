//Lecture 50.10 Create userMenu folder: HelpSupport.js, RFC
export default function HelpSupport({ setVisible }) {
  return (
    //Lecture 50.12 name helpsupport
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        {/* //Lecture 50.12 name helpsupport */}
        Help & Support
      </div>
      {/* //Lecture 50.13 help centre */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="help_center_icon"></i>
        </div>
        <span>Help Center</span>
      </div>
      {/* //Lecture 50.14 Support Inbox */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="email_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>
      {/* //Lecture 50.15 Report a Problem */}
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>
    </div>
  );
}
