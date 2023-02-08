import "./css/styles.scss";
import { InitializePage } from "./modules/DOM";
import { events } from "./modules/eventListeners";
import { displayTodo } from "./modules/initialPage";
import { mainLoader, resetMain, buttons } from "./modules/DOM";

InitializePage();

const projectButtons = document.querySelectorAll(".sidebar-dynamic button");
projectButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target);
    loadProjectTodo();
  });
});

function loadProjectTodo() {
  //
  resetMain();
  mainLoader.append(buttons.newTodo);
}
