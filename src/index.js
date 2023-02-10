import "./css/styles.scss";

const test = document.querySelector("#sidbar-toggle");
test.addEventListener("click", (e) => {
  const aside = document.querySelector("aside");
  aside.classList.toggle("show-aside");

  const container = document.querySelector(".container");
  container.classList.toggle("two-column");
});
