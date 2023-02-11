import { dom } from "./DOM";

// event listeners for multiple same element (loops)
function sideProjectListener() {
  // console.log(dom.sidebarProjects);
  dom.sidebarProjects.forEach((project) => {
    project.addEventListener("click", (e) => {
      dom.clickProject(project);
    });
  });
}

document.addEventListener("submit", (e) => {
  dom.toggleModal();
  dom.submitModal();
  dom.renderSideBarProjects();
  e.preventDefault();
});

// event listeners for elements with unique ID
document.addEventListener("click", (e) => {
  const target = e.target;
  // console.log(e.target);
  // console.log(dom.sidebarProjects);
  // console.log(
  //   document.querySelectorAll(
  //     "div.sidebar-static>button, .dynamic-item-container"
  //   )
  // );
  if (target === btnNewProject) {
    dom.newProject();
  }

  if (target === btnCancel || target === modal) {
    dom.toggleModal();
  }
});

export { sideProjectListener };
