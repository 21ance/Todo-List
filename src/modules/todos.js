import { modal } from "./modal";

function newTodo() {
  modal.revealModal("New Task", "Add", "btnAddTask");
  modal.renderAddTodo();
}

function editTodo(target) {
  modal.revealModal("Edit Task", "Save", "btnEditTask");
  modal.renderEditTodo(target);
}

function removeTodo(target) {
  modal.revealModal("Delete Task", "Confirm", "btnRemoveTask");
  modal.renderRemoveTodo(target);
}

function expandTodo() {
  //
}

export { newTodo, editTodo, removeTodo, expandTodo };
