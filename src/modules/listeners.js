import { dom } from "./DOM";
import { modal } from "./modal";

// function sidebarListener() {
//   const sidebarProjects = document.querySelectorAll(
//     ".sidebar-static>button, .dynamic-item-container"
//   );
//   sidebarProjects.forEach((project) => {
//     project.addEventListener("click", (e) => {
//       // console.log(sidebarProjects);
//       // dom.clickProject(e.target);
//       console.log(e.target.textContent);
//     });
//   });
// }

// function sidebarListener() {
//   const sideBarNav = document.querySelectorAll(
//     ".sidebar-dynamic button, .sidebar-static button"
//   );
//   sideBarNav.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       renderMain(e.target.textContent);
//     });
//   });
// }

document.addEventListener("submit", (e) => {
  modal.toggleModal();
  modal.submitModal();
  dom.appendSideBarProjects();
  sidebarListener();
  e.preventDefault();
});

//
document.addEventListener("click", (e) => {
  const target = e.target;
  // console.log(e.target);

  if (target === btnNewProject) {
    dom.newProject();
  }
  if (target === btnCancel || target === modalID) {
    modal.toggleModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    modal.toggleModal();
  }
});

export { sidebarListener };
