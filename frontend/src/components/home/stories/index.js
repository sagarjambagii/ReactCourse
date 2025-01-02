//Lecture 57.6 import svg
import { ArrowRight, Plus } from "../../../svg";
//Lecture 57.2 create styles.css, import
import "./style.css";
//Lecture 57.9 import stories
import { stories } from "../../../data/home";
//Lecture 57.11 import story
import Story from "./Story";
//Lecture 59.0 import media querry
import { useMediaQuery } from "react-responsive";
//Lecture 57.1 Create components:stories folder:index
export default function Stories() {
  //Lecture 59.0 Responsive home advanced tricks 1
  const query1175px = useMediaQuery({
    query: "(max-width: 1175px)",
  });
  //Lecture 59.3 media querry 1030px
  const query1030px = useMediaQuery({
    query: "(max-width: 1030px)",
  });
  //Lecture 60.0 Responsive home advanced tricks 2
  const query960px = useMediaQuery({
    query: "(max-width: 960px)",
  });
  //Lecture 60.2 querry 885px
  const query885px = useMediaQuery({
    query: "(max-width: 885px)",
  });
  //Lecture 59.1 define max
  //Lecture 59.4 define max
  //Lecture 60.1 define max
  //Lecture 60.3 difine max
  const max = query885px
    ? 5
    : query960px
    ? 4
    : query1030px
    ? 5
    : query1175px
    ? 4
    : stories.length;
  return (
    //Lecture 57.5 add class stories
    <div className="stories">
      {/* //Lecture 57.5 add class create_story_card */}
      <div className="create_story_card">
        {/* //Lecture 57.5 add img */}
        <img
          src="../../../images/default_pic.png"
          alt=""
          className="create_story_img"
        />
        {/* //Lecture 57.5 class plus_story */}
        <div className="plus_story">
          {/* //Lecture 57.5 class plus_story */}
          {/* //Lecture 57.6 plus svg */}
          <Plus color="#fff" />
        </div>
        {/* //Lecture 57.7 class story_create_text */}
        <div className="story_create_text">Create Story</div>
      </div>
      {/* //Lecture 57.9 map stories */}
      {/* {stories.map((story, i) => ( */}
      {/* //Lecture 59.2 show max */}
      {stories.slice(0, max).map((story, i) => (
        //Lecture 57.11 call Story and pass stories
        <Story story={story} key={i} />
      ))}
      {/* //Lecture 57.14 class white_circle */}
      <div className="white_circle">
        {/* //Lecture 57.14 ArrowRight */}
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
