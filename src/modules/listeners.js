import { dom } from "./DOM";
import { modal } from "./modal";

document.addEventListener("submit", (e) => {
  modal.toggleModal();
  modal.submitModal();
  dom.appendSideBarProjects();
  e.preventDefault();
});

//
document.addEventListener("click", (e) => {
  const target = e.target;
  console.log(e.target);

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
