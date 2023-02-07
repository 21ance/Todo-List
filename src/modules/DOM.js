function loadHeader() {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "Todo List";

  header.append(h1);
  return header;
}

function loadSidebar() {
  const sidebar = document.createElement("aside");

  const sidebarStatic = document.createElement("div");
  sidebarStatic.classList.add("sidebar-static");

  const sidebarDynamic = document.createElement("div");
  sidebarDynamic.classList.add("sidebar-dynamic");

  const projSpan = document.createElement("span");
  projSpan.classList.add("project-text");
  projSpan.textContent = "Projects";

  sidebarStatic.append(
    sideBarItem("All", "calendar-clear-outline"),
    sideBarItem("Today", "today-outline"),
    sideBarItem("Upcoming", "calendar-outline")
  );

  sidebarDynamic.append(projSpan);

  sidebar.append(sidebarStatic, sidebarDynamic);

  return sidebar;
}

// loadsidebar helper
function sideBarItem(text, ionicIcon) {
  const itemContainer = document.createElement("span");

  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", `${ionicIcon}`);

  const button = document.createElement("button");
  button.textContent = `${text}`;
  button.setAttribute("id", `button-${text}`);

  itemContainer.append(icon, button);
  return itemContainer;
}

// function loadMainContent() {
//   const main = document.createElement("main");
//   main.textContent = "main";

//   return main;
// }

function loadFooter() {
  const footer = document.createElement("footer");
  const footerSpan = document.createElement("span");
  footerSpan.textContent = "by 21ance";

  footer.append(footerSpan);
  return footer;
}

export function InitializePage() {
  container.append(
    loadHeader(),
    loadSidebar(),
    // loadMainContent(),
    loadFooter()
  );
}
