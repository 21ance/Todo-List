import "./css/styles.scss";
import { InitializePage } from "./modules/DOM";
import { renderMain } from "./modules/renderer";
import { events } from "./modules/eventListeners";

InitializePage();
const sideBarNav = document.querySelectorAll(
  ".sidebar-dynamic button, .sidebar-static button"
);

sideBarNav.forEach((button) => {
  button.addEventListener("click", (e) => {
    renderMain(e.target.textContent);
    console.log(e.target);
  });
});
