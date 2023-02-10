const dom = (() => {
  // sidebar buttons
  const sidebarProjects = document.querySelectorAll(
    "div.sidebar-static>button, .dynamic-item-container>button"
  );
  const btnNewProject = document.querySelector("button[title='New Project']");
  const btnEditProject = document.querySelectorAll(
    "button[title='Edit Project']"
  );
  const btnRemoveProject = document.querySelectorAll(
    "button[title='Remove Project']"
  );

  // sidebar functions
  function clickProject(locator) {
    removeActiveState();
    setActiveState(locator);
  }

  function setActiveState(locator) {
    if (locator.parentElement.classList.contains("dynamic-item-container")) {
      locator.parentElement.classList.toggle("active");
      return;
    }
    locator.classList.toggle("active");
  }

  function removeActiveState() {
    sidebarProjects.forEach((project) => {
      project.classList.remove("active");
      project.parentElement.classList.remove("active");
    });
  }

  return { sidebarProjects, clickProject };
})();

export { dom };
