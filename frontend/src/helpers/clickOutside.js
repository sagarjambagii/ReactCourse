import { useEffect } from "react";

//Lecture 46.1 useClickOutside function(hook), pass ref and fun
export default function useClickOutside(ref, fun) {
  //Lecture 46.2 useEffect
  useEffect(
    () => {
      //Lecture 46.4 have a listener
      const listener = (e) => {
        //Lecture 46.5 check if the ref exist or we are inside ref
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
        //Lecture 46.6 run the function
        fun();
      };
      //Lecture 46.7 add mousedown and touchstart event listner count 3 buttons
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        //Lecture 46.8 removing event listners
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    //Lecture 46.3 pass the reference when ever ref changes fun run
    [ref]
  );
}
