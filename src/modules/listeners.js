import { dom } from "./DOM";

function sideProjectListener() {
  console.log(dom.sidebarProjects);
  dom.sidebarProjects.forEach((project) => {
    project.addEventListener("click", (e) => {
      dom.clickProject(project);
      console.log(project.parentNode);
    });
  });
}

export { sideProjectListener };
