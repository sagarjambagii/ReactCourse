//Lecture 103.11 Create pages:profile:GridPosts.js , RFC
export default function GridPosts() {
  return (
    //Lecture 103.13 class createPost
    <div className="createPost">
      {/* //Lecture 103.13 class createPost_header */}
      <div
        className="createPost_header"
        //Lecture 103.16 add inline style
        style={{ justifyContent: "space-between" }}
      >
        {/* //Lecture 103.13 class left_header_grid */}
        <div className="left_header_grid">Posts</div>
        {/* //Lecture 103.13 class flex */}
        <div className="flex">
          {/* //Lecture 103.13 class gray_btn and icon */}
          <div className="gray_btn">
            <i className="equalize_icon"></i>
          </div>
          {/* //Lecture 103.13 class gray_btn and icon */}
          <div className="gray_btn">
            <i className="manage_icon"></i>
            Manage Posts
          </div>
        </div>
      </div>
      {/* //Lecture 103.14 class create_splitter */}
      <div className="create_splitter"></div>
      {/* //Lecture 103.15 class createPost_body */}
      <div className="createPost_body grid2">
        {/* //Lecture 103.15 class view_type and icon */}
        <div className="view_type active">
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        {/* //Lecture 103.15 class view_type and icon */}
        <div className="view_type">
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  );
}
