import { buttons, mainLoader, modalLoader } from "./DOM";
import { renderMain } from "./renderer";

export const Modal = (() => {
  function formHelper() {
    document.querySelector("form").reset();
    toggleModal();
    renderMain(mainLoader.getAttribute("id"));
  }

  function toggleModal() {
    modalLoader.modal.classList.toggle("show-modal");
  }

  function windowOnClick(event) {
    if (event.target === modal) {
      toggleModal();
    }
  }

  buttons.newTodo.addEventListener("click", () => {
    modalLoader.modal.classList.toggle("show-modal");
  });

  window.addEventListener("click", windowOnClick);

  return { formHelper };
})();
