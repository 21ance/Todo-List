import { dom } from "./DOM";

// event listeners for multiple same element (loops)
function sideProjectListener() {
  console.log(dom.sidebarProjects);
  dom.sidebarProjects.forEach((project) => {
    project.addEventListener("click", (e) => {
      dom.clickProject(project);
    });
  });
}

// event listeners for elements with unique ID
document.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target);

  if (target === btnNewProject) {
    dom.newProject();
  }

  if (target === btnCancel || target === modal) {
    dom.toggleModal();
  }

  if (target === btnCreateProject) {
    dom.toggleModal();
    console.log("created project");
  }
});

export { sideProjectListener };
