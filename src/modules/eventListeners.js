import { sidebarLoader, modalLoader } from "./DOM";
import { Todo, todoList } from "./newTodo";

export const events = (() => {
  modalLoader.form.addEventListener("submit", (e) => {
    // console.log("asd");
    const todo = Todo(
      document.querySelector("#title").value,
      document.querySelector("#description").value,
      document.querySelector("#date").value
    );
    e.preventDefault();

    formHelper();
  });
})();

// close modal and reset form
function formHelper() {
  toggleModal();
  document.querySelector("form").reset();
  console.log(todoList);
}

// const t1 = Todo("Go to vet", "checkup for doge", "Feb 10", "Normal");
// const t2 = Todo("Buy gift", "valentines", "Feb 14", "High");

// for (let i = 0; i < todoList.length; i++) {
//   console.log(todoList[i].title);
//   console.log(todoList[i].dueDate);
// }

// modal script
function toggleModal() {
  const modal = document.querySelector("#modal");
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

sidebarLoader.btnNewTodo.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
