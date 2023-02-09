import { Storage } from "./localStorage";

export const Todo = (project, title, description, dueDate) => {
  const todoItem = {
    project,
    title,
    description,
    dueDate,
  };

  Storage.allTodoList.push(todoItem);
};

export const Project = (projectName) => {
  Storage.projectList.push(projectName);
};
