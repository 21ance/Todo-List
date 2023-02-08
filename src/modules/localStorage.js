export const Storage = (() => {
  let allTodoList = [];
  allTodoList = JSON.parse(localStorage.getItem("All") || "[]");

  let projectList = [];
  projectList = JSON.parse(localStorage.getItem("Projects") || "[]");

  return { allTodoList, projectList };
})();
