import { useRef } from "react";
//Lecture 48.15 import menu and Create data from allMenu
import { menu, create } from "../../data/allMenu";
import useClickOutside from "../../helpers/clickOutside";
import AllMenuItem from "./AllMenuItem";
//Lecture 48.0 All Menu, Create header:AllMenu.js
export default function AllMenu() {
  return (
    //Lecture 48.2 adding classname
    <div className="all_menu">
      {/* //Lecture 48.3 all menu header class */}
      <div className="all_menu_header">Menu</div>
      {/* //Lecture 48.4 allMenuWrap and Scroll */}
      <div className="all_menu_wrap scrollbar">
        {/* //Lecture 48.5 adding class */}
        <div className="all_left">
          {/* //Lecture 48.6 all menu search */}
          <div className="all_menu_search">
            {/* //Lecture 48.7 adding icon */}
            <i className="amm_s_ic"></i>
            {/* //Lecture 48.8 adding input */}
            <input type="text" placeholder="Search Menu" />
          </div>
          {/* //Lecture 48.9 allmenu group */}
          <div className="all_menu_group">
            {/* //Lecture 48.10 adding all_menu_group_header */}
            <div className="all_menu_group_header">Social</div>
            {/* //Lecture 48.16 Cut allmenuitem */}
            {/* //Lecture 48.11 adding all menu item */}
            {/* <div className="all_menu_item hover1">
              <img src={`../../left/${icon}.png`} alt="" />
              <div className="all_menu_col">
                <span>name</span>
                <span>description</span>
              </div>
            </div> */}
            {/* //Lecture 48.20 call all menu item and pass the props with slice method */}
            {menu.slice(0, 6).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          {/* //Lecture 48.21 for entertainment */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">Entertainment</div>
            {menu.slice(6, 9).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          {/* //Lecture 48.21 for Shopping */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {menu.slice(9, 11).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          {/* //Lecture 48.21 for Personal */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menu.slice(11, 15).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          {/* //Lecture 48.21 for Professional */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">Professional</div>
            {menu.slice(15, 17).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          {/* //Lecture 48.21 for Community Resources */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">Community Resources</div>
            {menu.slice(17, 21).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          {/* //Lecture 48.21 for More from Meta */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">More from Meta</div>
            {menu.slice(21, 23).map((item, i) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
        </div>
        {/* //Lecture 48.22 all right class */}
        <div className="all_right">
          {/* //Lecture 48.23 all_right_header class */}
          <div className="all_right_header">Create</div>
          {/* //Lecture 48.24 map through create */}
          {create.map((item, i) => (
            //Lecture 48.25 all_right_item classname
            <div className="all_right_item hover1" key={i}>
              {/* //Lecture 48.26 all_right_item classname */}
              <div className="all_right_circle">
                {/* //Lecture 48.27 icon */}
                <i className={item.icon}></i>
              </div>
              {/* //Lecture 48.28 item name */}
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
