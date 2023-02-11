import { Storage } from "./storage";

const modal = (() => {
  // modal functions
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector("form");
  const modalHeader = document.querySelector(".modal-content header");
  const modalContent = document.querySelector("form main");
  const btnCancel = document.querySelector("#btnCancel");
  const btnDynamic = document.querySelector("#btnDynamic");

  function revealModal(modalTitle, btnName, btnId) {
    resetModal();
    toggleModal();

    modalHeader.textContent = `${modalTitle}`;
    btnDynamic.textContent = `${btnName}`;
    btnDynamic.setAttribute("id", btnId);
  }

  function toggleModal() {
    modal.classList.toggle("show-modal");
  }

  function resetModal() {
    // remove all element of modalContent
    for (let i = 0; i < modalContent.childElementCount; i++) {
      modalContent.removeChild(modalContent.lastChild);
    }
  }

  // modal content based on shz
  function renderNewProjectModal() {
    const modalLabel = document.createElement("label");
    const modalTitle = document.createElement("span");
    const modalInput = document.createElement("input");

    modalTitle.textContent = "Title*";
    modalInput.placeholder = "Enter Title";
    modalInput.required = true;

    modalLabel.append(modalTitle, modalInput);
    modalContent.append(modalLabel);

    modalInput.focus();
  }

  function submitModal() {
    if (document.getElementById("btnCreateProject")) {
      const newProject = Storage.newProjectObject(
        document.querySelector("input[placeholder='Enter Title']").value
      );
      console.log("new proj added to storage");
    }
  }

  return {
    revealModal,
    renderNewProjectModal,
    toggleModal,
    renderNewProjectModal,
    submitModal,
  };
})();

export { modal };
