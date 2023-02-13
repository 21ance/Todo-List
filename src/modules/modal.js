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
    // for (let i = 0; i < modalContent.childElementCount; i++) {
    //   modalContent.removeChild(modalContent.lastChild);
    // }
    while (modalContent.firstChild) {
      modalContent.removeChild(modalContent.lastChild);
    }
  }

  // sidebar - projects
  let projectDOM;

  // new project
  function renderNewProject() {
    modalTitle.textContent = "Title*";
    modalInput.placeholder = "Enter Title";
    modalInput.required = true;
    modalInput.setAttribute("maxlength", "20");

    modalLabel.append(modalTitle, modalInput);
    modalContent.append(modalLabel);

    setFocus();
  }

  // remove project
  function renderRemoveProject(element) {
    projectDOM = element;
    const elementIndex = Storage.projectList[element.dataset.index];
    const projectName = document.createElement("span");

    projectName.innerHTML = `Are you sure? <br> Project <b>${elementIndex}</b> will be removed!`;

    modalContent.append(projectName);
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

    setFocus();
  }

  // set keyboard focus on first form input
  function setFocus() {
    const focusElement = document.querySelector(
      "form label:nth-child(1) input"
    );
    focusElement.focus();
  }

  //
  function dynamicForm(title, input, inputType, value, isRequired, maxlength) {
    const formLabel = document.createElement("label");
    const fromTitle = document.createElement("span");
    const formInput = document.createElement(`${input}`);

    fromTitle.textContent = title;
    formInput.required = isRequired;
    formInput.placeholder = `Enter ${title}`;
    formInput.setAttribute("maxlength", maxlength);
    formInput.setAttribute("type", inputType);
    formInput.value = value;

    if (formInput.type === "date") {
      formInput.placeholder = value;
    }

    formLabel.append(fromTitle, formInput);
    modalContent.append(formLabel);

    setFocus();
  }

  // main - todos
  let todoDom;
  function renderAddTodo() {
    dynamicForm("Title", "input", "text", "", true, 20);
    dynamicForm("Description", "textarea", "", "");
    dynamicForm("Date", "input", "date");
  }

  function renderRemoveTodo(target) {
    todoDom = target;
    const todoObject = Storage.allTodoList[target.dataset.index];
    const todoWarn = document.createElement("span");
    todoWarn.innerHTML = `Are you sure? <br> Task <b>${todoObject.title}</b> will be removed!`;
    modalContent.append(todoWarn);
  }

  function renderEditTodo(target) {
    todoDom = target;
    const todoObject = Storage.allTodoList[target.dataset.index];

    dynamicForm("Title", "input", "text", todoObject.title, true, 20);
    dynamicForm("Description", "textarea", "", todoObject.description);
    dynamicForm("Date", "input", "date", todoObject.dueDate);
  }

  // dynamic submit
  function submitModal() {
    // projects
    if (document.getElementById("btnCreateProject")) {
      Storage.newProjectObject(
        document.querySelector("input[placeholder='Enter Title']").value
      );
      dom.appendSideBarProjects();
    }

    if (document.getElementById("btnRemoveProject")) {
      // also remove the project and their tasks from all storage
      for (let i = Storage.allTodoList.length - 1; i >= 0; i--) {
        if (
          Storage.projectList[projectDOM.dataset.index] ===
          Storage.allTodoList[i].project
        ) {
          Storage.allTodoList.splice(i, 1);
          localStorage.setItem("All", JSON.stringify(Storage.allTodoList));
        }
      }
      // remove from projects storage
      Storage.projectList.splice(projectDOM.dataset.index, 1);
      localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
      dom.renderSideBarProjects();
      dom.initializeMain();
    }

    if (document.getElementById("btnEditProject")) {
      Storage.projectList[projectDOM.dataset.index] = modalInput.value;
      localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
      dom.renderSideBarProjects();
      // console.log(projectDOM.parentElement);
      // dom.resetSideBarStatus();
      // dom.activeSidebarStatus(projectDOM.parentElement.parentElement);
      dom.renderSideBarProjects();
      dom.initializeMain();
    }

    // todos
    if (document.getElementById("btnAddTask")) {
      Storage.newTodoObject(
        dom.main.id,
        false,
        document.querySelector("form input[type='text']").value,
        document.querySelector("form textarea").value,
        document.querySelector("form input[type='date']").value
      );
      localStorage.setItem("All", JSON.stringify(Storage.allTodoList));
      // console.log(dom.main.id);
      // dom.renderTodoItem();
      dom.appendTodoItem();
    }

    if (document.getElementById("btnRemoveTask")) {
      Storage.allTodoList.splice(todoDom.dataset.index, 1);
      localStorage.setItem("All", JSON.stringify(Storage.allTodoList));

      dom.renderTodoItem();
    }

    if (document.getElementById("btnEditTask")) {
      Storage.allTodoList[todoDom.dataset.index].title = document.querySelector(
        "form input[type='text']"
      ).value;
      Storage.allTodoList[todoDom.dataset.index].description =
        document.querySelector("form textarea").value;
      Storage.allTodoList[todoDom.dataset.index].dueDate =
        document.querySelector("form input[type='date").value;
      localStorage.setItem("All", JSON.stringify(Storage.allTodoList));

      dom.renderTodoItem();
    }

    modalForm.reset();
  }

  return {
    modalForm,
    revealModal,
    renderNewProject,
    renderRemoveProject,
    renderEditProject,
    toggleModal,
    submitModal,
    //
    renderAddTodo,
    //
    renderEditTodo,
    renderRemoveTodo,
  };
})();

export { modal };
