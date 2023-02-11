import "./css/styles.scss";
import { dom } from "./modules/DOM";
import { sideProjectListener } from "./modules/listeners";
// const test = document.querySelector("#sidbar-toggle");
// test.addEventListener("click", (e) => {
//   const aside = document.querySelector("aside");
//   aside.classList.toggle("show-aside");

//   const container = document.querySelector(".container");
//   container.classList.toggle("two-column");
// });
sideProjectListener();

dom.renderSideBarProjects();

// document.addEventListener("click", (e) => {
//   console.log(e.target);

//   if (e.target === document.querySelector("button[title='Edit Item']")) {
//     console.log("asdasadas");
//   }
// });

// console.log(
//   document.querySelectorAll(
//     "div.sidebar-static>button, .dynamic-item-container"
//   )
// );

// console.log(dom.sidebarProjects);
