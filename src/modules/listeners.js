import { dom } from "./DOM";

document.addEventListener("submit", (e) => {
  dom.toggleModal();
  dom.submitModal();
  dom.renderSideBarProjects();
  e.preventDefault();
});

// event listeners for elements with unique ID
document.addEventListener("click", (e) => {
  const target = e.target;
  console.log(e.target);

  if (target === btnNewProject) {
    dom.newProject();
  }
  // if(e.key === "Escape")
  if (target === btnCancel || target === modal) {
    dom.toggleModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    dom.toggleModal();
  }
});
