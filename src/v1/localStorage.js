export const Storage = (() => {
  let allTodoList = JSON.parse(localStorage.getItem("All") || "[]");

  let projectList = JSON.parse(localStorage.getItem("Projects") || "[]");

  return { allTodoList, projectList };
})();
