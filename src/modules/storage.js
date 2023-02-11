const Storage = (() => {
  let allTodoList = JSON.parse(localStorage.getItem("All") || "[]");
  let projectList = JSON.parse(localStorage.getItem("Projects") || "[]");

  const newTodoObject = (project, title, description, dueDate) => {
    const todoItem = {
      project,
      title,
      description,
      dueDate,
    };

    allTodoList.push(todoItem);
  };

  const newProjectObject = (projectName) => {
    projectList.push(projectName);
    localStorage.setItem("Projects", JSON.stringify(projectList));
  };

  return { allTodoList, projectList, newTodoObject, newProjectObject };
})();

export { Storage };
