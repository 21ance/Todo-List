import { dom } from "./DOM";
import { modal } from "./modal";

// modal form submit
document.addEventListener("submit", (e) => {
  e.preventDefault();

  modal.toggleModal();
  modal.submitModal();
  dom.appendSideBarProjects();
});

// close modal on keyboard escape
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    modal.toggleModal();
  }
});

// general clicky
document.addEventListener("click", (e) => {
  const target = e.target;
  // console.log(e.target);

  if (target === btnNewProject) {
    dom.newProject();
  }

  if (target === btnCancel || target === modalID) {
    modal.toggleModal();
  }

  if (target.classList.contains("static-button")) {
    dom.resetSideBarStatus();
    dom.activeSidebarStatus(target);
  }

  if (target.classList.contains("dynamic-button")) {
    dom.resetSideBarStatus();
    dom.activeSidebarStatus(target.parentElement);
  }
});
