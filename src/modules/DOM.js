const dom = (() => {
  // sidebar buttons
  const sidebarProjects = document.querySelectorAll(
    "div.sidebar-static>button, .dynamic-item-container>button"
  );
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

  // sidebar new project
  function newProject() {
    revealModal("New Project", "Create Project", "btnCreateProject");
  }

  // main content functions
  function loadMainContent() {
    console.log("testMain");
  }

  // modal functions
  const modal = document.querySelector(".modal");
  const modalHeader = document.querySelector(".modal-content header");
  const modalContent = document.querySelector("form");
  const btnCancel = document.querySelector("#btnCancel");
  const btnDynamic = document.querySelector("#btnDynamic");

  function revealModal(modalTitle, btnName, btnId) {
    toggleModal();

    modalHeader.textContent = `${modalTitle}`;
    // modalContent.textContent = `${modalContent}`;
    btnDynamic.textContent = `${btnName}`;

    btnDynamic.setAttribute("id", btnId);
  }

  function toggleModal() {
    modal.classList.toggle("show-modal");
  }

  return {
    sidebarProjects,
    clickProject,
    newProject,
    toggleModal,
  };
})();

export { dom };
