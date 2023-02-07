export let todoList = [];

export const Todo = (title, description, dueDate) => {
  const todoItem = {
    title,
    description,
    dueDate,
  };

  todoList.push(todoItem);
};
