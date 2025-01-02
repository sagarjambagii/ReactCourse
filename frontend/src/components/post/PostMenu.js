import {
  useRef,
  //Lecture 96.13 import usestate
  useState,
} from "react";
//Lecture 96.10 import MenuItem
import MenuItem from "./MenuItem";
//Lecture 97.13 import useOnClickOutside
import useOnClickOutside from "../../helpers/clickOutside";
//Lecture 141.17 import savePost
import {
  savePost,
  //Lecture 143.11 import deletePost
  deletePost,
} from "../../functions/post";
//Lecture 142.0 Download post images, npm i file-saver and import
import { saveAs } from "file-saver";
//Lecture 96.0 Post menu part 1, Create components:post:PostMenu.js, RFC
export default function PostMenu({
  //Lecture 96.12 get userid, postUserId,imagesLength
  postUserId,
  userId,
  imagesLength,
  //Lecture 97.12 get setShowMenu
  setShowMenu,
  //Lecture 141.19 get postId and token
  token,
  postId,
  //Lecture 141.26 get checkSaved and setCheckSaved
  checkSaved,
  setCheckSaved,
  //Lecture 142.5 get images
  images,
  //Lecture 143.15 get postRef
  postRef,
}) {
  //Lecture 96.13 useState for setTest
  const [test, setTest] = useState(postUserId === userId ? true : false);
  //Lecture 97.9 useRef for menu
  const menu = useRef(null);
  //Lecture 97.13 call useOnClickOutside
  useOnClickOutside(menu, () => setShowMenu(false));
  //Lecture 141.14 define saveHandler fn
  const saveHandler = async () => {
    //Lecture 141.17 call savePost
    savePost(postId, token);
    //Lecture 141.29 if checkSaved true
    if (checkSaved) {
      setCheckSaved(false);
    }
    //Lecture 141.30 else
    else {
      setCheckSaved(true);
    }
  };
  //Lecture 142.3 define downloadImages
  const downloadImages = async () => {
    //Lecture 142.6 map through
    images.map((img) => {
      //Lecture 142.7 call saveAs
      saveAs(img.url, "image.jpg");
    });
  };
  //Lecture 143.10 define deleteHandler fn
  const deleteHandler = async () => {
    //Lecture 143.11 call deletePost
    const res = await deletePost(postId, token);
    //Lecture 143.16 check status
    if (res.status === "ok") {
      //Lecture 143.17 remove the div
      postRef.current.remove();
    }
  };
  return (
    //Lecture 96.2 create ul list class post_menu
    <ul
      className="post_menu"
      //Lecture 97.10 referece post_menu
      ref={menu}
    >
      {/* //Lecture 96.14 visible only when your post  */}
      {test && (
        //Lecture 96.10 call MenuItem
        <MenuItem icon="pin_icon" title="Pin Post" />
      )}
      {/* //Lecture 141.13 add div and onclick */}
      <div onClick={() => saveHandler()}>
        {/* //Lecture 141.27 when checksave is true  */}
        {checkSaved ? (
          //Lecture 141.28 if true unsave post change title
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          //Lecture 96.15 Menuitem for savepost
          <MenuItem
            //  Lecture 96.16 pass icon to subtitle
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      {/* //Lecture 96.17 class line */}
      <div className="line"></div>
      {/* //Lecture 96.18  menuiten for Edit Post */}
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {/* //Lecture 96.19 if imagelengh true */}
      {imagesLength && (
        // <MenuItem icon="download_icon" title="Download" />
        //Lecture 142.1 add div
        <div
          //Lecture 142.2 add onclick
          onClick={() => downloadImages()}
        >
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {/* //Lecture 96.20 show Fullscreen */}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {/* //Lecture 96.21  show Edit audience */}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {/* //Lecture 96.23 notification  */}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {/* //Lecture 96.24 Turn off translations  */}
      {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {/* //Lecture 97.0 Post menu part 2, Edit Date  */}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {/* //Lecture 97.1 Refresh share attachment  */}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {/* //Lecture 97.2 Move to archive  */}
      {test && (
        //  <MenuItem icon="archive_icon" title="Move to archive" />
        //Lecture 143.8 add a div
        <div
          //Lecture 143.9 add onclick
          onClick={() => deleteHandler()}
        >
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {/* //Lecture 97.3 Move to trash  */}
      {test && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      )}
      {/* //Lecture 97.4 when test is false, class line*/}
      {!test && <div className="line"></div>}
      {/* //Lecture 97.5 Report post*/}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}
