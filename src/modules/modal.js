import { Storage } from "./storage";
import { dom } from "./DOM";

const modal = (() => {
  // modal functions
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector("form");
  const modalHeader = document.querySelector(".modal-content header");
  const modalContent = document.querySelector("form main");
  const btnCancel = document.querySelector("#btnCancel");
  const btnDynamic = document.querySelector("#btnDynamic");

  //
  const modalLabel = document.createElement("label");
  const modalTitle = document.createElement("span");
  const modalInput = document.createElement("input");

  //
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

  // new project
  function renderNewProject() {
    modalTitle.textContent = "Title*";
    modalInput.placeholder = "Enter Title";
    modalInput.required = true;
    modalInput.setAttribute("maxlength", "20");

    modalLabel.append(modalTitle, modalInput);
    modalContent.append(modalLabel);

    modalInput.focus();
  }

  // saves shz
  let projectDOM;

  // remove project
  function renderRemoveProject(element) {
    projectDOM = element;
    const elementIndex = Storage.projectList[element.dataset.index];
    const projectName = document.createElement("span");

    projectName.innerHTML = `Are you sure? <br> Project <b>${elementIndex}</b> will be removed!`;

    modalContent.append(projectName);
    btnDynamic.focus();
  }

  // edit project
  function renderEditProject(element) {
    projectDOM = element;
    const elementIndex = Storage.projectList[element.dataset.index];
    //
    modalTitle.textContent = "Title*";
    modalInput.value = elementIndex;
    modalInput.required = true;
    modalInput.setAttribute("maxlength", "20");

    modalLabel.append(modalTitle, modalInput);
    modalContent.append(modalLabel);

    modalInput.focus();
  }

  //
  function submitModal() {
    if (document.getElementById("btnCreateProject")) {
      const newProject = Storage.newProjectObject(
        document.querySelector("input[placeholder='Enter Title']").value
      );
      dom.appendSideBarProjects();
    }

    if (document.getElementById("btnRemoveProject")) {
      Storage.projectList.splice(projectDOM.dataset.index, 1);
      localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
      dom.renderSideBarProjects();
    }

    if (document.getElementById("btnEditProject")) {
      Storage.projectList[projectDOM.dataset.index] = modalInput.value;
      localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
      dom.renderSideBarProjects();
      // console.log(projectDOM.parentElement);
      // dom.resetSideBarStatus();
      // dom.activeSidebarStatus(projectDOM.parentElement.parentElement);
    }

    modalForm.reset();
  }

  return {
    revealModal,
    renderNewProject,
    renderRemoveProject,
    renderEditProject,
    toggleModal,
    submitModal,
  };
})();

export { modal };
