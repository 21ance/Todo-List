import { modalLoader } from "./DOM";
import { Todo, Project } from "./factories";
import { Storage } from "./localStorage";
import { renderMain, renderSidebarItems } from "./renderer";
import { sideBarNav } from "./DOM";
import { sidebarLoader, sideBarItem } from "./DOM";
import { mainLoader } from "./DOM";

export const sidebarEvent = (() => {
  function sidebarListener() {
    const sideBarNav = document.querySelectorAll(
      ".sidebar-dynamic button, .sidebar-static button"
    );
    sideBarNav.forEach((button) => {
      button.addEventListener("click", (e) => {
        renderMain(e.target.textContent);
      });
    });
  }

  function newProjectListener() {
    let newProject = document.querySelector("#new-project");
    newProject.addEventListener("click", (e) => {
      const toggle = (() => {
        newProject.classList.toggle("hide");
        const container = document.createElement("div");

        const input = document.createElement("input");
        input.placeholder = "Project Name";

        const btnAdd = document.createElement("ion-icon");
        btnAdd.setAttribute("name", "checkmark");

        const btnCancel = document.createElement("ion-icon");
        btnCancel.setAttribute("name", "close");

        container.append(input, btnCancel, btnAdd);
        sidebarLoader.sidebar.append(container);

        return { btnAdd, btnCancel };
      })();

      const addProjectListener = (() => {
        toggle.btnAdd.addEventListener("click", (e) => {
          const input = document.querySelector(
            'input[placeholder="Project Name"]'
          ).value;
          if (input == "") return;

          const project = Project(input);
          localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
          sidebarLoader.sidebarDynamic.append(
            sideBarItem(input, "clipboard-outline")
          );

          resetToggle();
        });
      })();

      const cancelProjectListener = (() => {
        toggle.btnCancel.addEventListener("click", (e) => {
          resetToggle();
        });
      })();

      function resetToggle() {
        newProject.classList.toggle("hide");
        let aside = document.querySelector("aside");
        aside.removeChild(aside.lastChild);
      }
    });
  }
  return { sidebarListener, newProjectListener };

  // new project();
  // buttons.newProject.addEventListener("click", (e) => {
  //   const newProj = prompt("Project Name");
  //   const project = Project(`${newProj}`);
  //   localStorage.setItem("Projects", JSON.stringify(Storage.projectList));
  //   sidebarLoader.sidebarDynamic.append(
  //     sideBarItem(`${newProj}`, "pricetag-outline")
  //   );
  // });
})();

export const mainEvent = (() => {
  function newTodoListener() {
    let newTodo = document.querySelector("#new-todo");
    newTodo.addEventListener("click", (e) => {
      toggleModal();
    });
  }

  //
  function submitTodoListener() {
    let todoSubmit = document.querySelector("form");
    todoSubmit.addEventListener("submit", (e) => {
      const todo = Todo(
        document.querySelector("main").getAttribute("id"),
        document.querySelector("#title").value,
        document.querySelector("#description").value,
        document.querySelector("#date").value
      );
      localStorage.setItem("All", JSON.stringify(Storage.allTodoList));

      toggleModal();
      todoSubmit.reset();
      renderMain(mainLoader.getAttribute("id"));

      e.preventDefault();
    });
  }

  //
  function editListener() {
    let editTodo = document.querySelectorAll('button[id="btnEdit"]');
    editTodo.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log(button);
      });
    });
  }

  function removeListener() {
    let removeTodo = document.querySelectorAll('button[id="btnRemove"]');
    removeTodo.forEach((button) => {
      button.addEventListener("click", (e) => {
        Storage.allTodoList.splice(button.dataset.id, 1);
        localStorage.setItem("All", JSON.stringify(Storage.allTodoList));
        renderMain(mainLoader.getAttribute("id"));
      });
    });
  }

  // functio
  function toggleModal() {
    modalLoader.modal.classList.toggle("show-modal");
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      toggleModal();
    }
  });

  return { newTodoListener, submitTodoListener, editListener, removeListener };
})();
