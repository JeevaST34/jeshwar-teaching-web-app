// nav-link

// nav-link
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    { name: "Dashboard", icon: "fas fa-home", link: "../index.html" },
    { name: "Batches", icon: "fa-solid fa-users", link: "./batches.html" },
    {
      name: "My Courses",
      icon: "fa-solid fa-book-open",
      link: "./mycourse.html",
    },
    {
      name: "Podcast",
      icon: "fa-solid fa-podcast",
      link: "./podcast.html",
    },
    { name: "Test", icon: "fa-solid fa-list-check", link: "./quiz.html" },
    { name: "Settings", icon: "fas fa-cog", link: "./setting.html" },
  ];

  const menuContainer = document.getElementById("sidebarMenu");
  if (!menuContainer) return;

  // Detect active page (works with .html, clean URLs, and trailing slashes)
  let currentPath = window.location.pathname;
  let currentPage = currentPath.split("/").pop() || "index.html";
  currentPage = currentPage
    .replace(".html", "")
    .replace(/\/$/, "")
    .toLowerCase();

  menuContainer.innerHTML = menuItems
    .map((item) => {
      const itemPage = item.link
        .split("/")
        .pop()
        .replace(".html", "")
        .toLowerCase();
      let isActive = false;

      // Make "My Courses" active for related pages
      if (
        item.name === "My Courses" &&
        (currentPath.includes("course-beforeEnroll") ||
          currentPath.includes("coursepage-afterEnroll"))
      ) {
        isActive = true;
      }
      // Match for both clean and .html URLs
      else if (currentPage === itemPage || currentPath.includes(itemPage)) {
        isActive = true;
      }

      return `
        <li class="nav-item mb-2">
          <a href="${item.link}" class="nav-link ${isActive ? "active" : ""}">
            <i class="${item.icon}"></i> ${item.name}
          </a>
        </li>`;
    })
    .join("");
});

// =======================
// Mobile Menu (Sidebar)
// =======================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuToggle && sidebar && overlay) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// Carousel

const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".course-card");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (track && cards.length > 0 && prevBtn && nextBtn) {
  let index = 0;
  let visibleCards = 3;
  let cardWidth = 0;

  function updateLayout() {
    const wrapper = document.querySelector(".carousel-wrapper");
    if (!wrapper) return;

    const wrapperWidth = wrapper.offsetWidth;

    if (wrapperWidth >= 992) visibleCards = 3;
    else if (wrapperWidth >= 768) visibleCards = 2;
    else visibleCards = 1;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    cardWidth = (wrapperWidth - gap * (visibleCards - 1)) / visibleCards;

    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;
    });

    if (index > cards.length - visibleCards)
      index = Math.max(cards.length - visibleCards, 0);

    updateCarousel();
  }

  function updateCarousel() {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
      index++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateLayout);
  updateLayout();
}

// Tabs + Sidebar Switch
const tabs = document.querySelectorAll(".tabs-header .tab");
const panes = document.querySelectorAll(".tab-content .tab-pane");

// Sidebar content IDs
const sidebarContents = {
  "tab-1": document.getElementById("overviewSidebarContent"),
  "tab-2": document.getElementById("modulesSidebarContent"),
  "tab-3": document.getElementById("sessionSidebarContent"),
};

// Function to toggle sidebar content visibility
function showSidebar(tabId) {
  Object.values(sidebarContents).forEach((el) => {
    if (el) el.classList.add("d-none");
  });
  const activeSidebar = sidebarContents[tabId];
  if (activeSidebar) activeSidebar.classList.remove("d-none");
}

// Handle tab switching
if (tabs.length && panes.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panes.forEach((pane) => pane.classList.remove("active"));

      tab.classList.add("active");
      const targetPane = document.getElementById(tab.dataset.tab);
      if (targetPane) targetPane.classList.add("active");

      // Show corresponding sidebar
      showSidebar(tab.dataset.tab);
    });
  });
}

// Default tab + sidebar on load
window.addEventListener("DOMContentLoaded", () => {
  const firstTab = tabs[0];
  if (firstTab) {
    firstTab.classList.add("active");
    const firstPane = document.getElementById(firstTab.dataset.tab);
    if (firstPane) firstPane.classList.add("active");
    showSidebar(firstTab.dataset.tab);
  }
});

function toggleSection(element) {
  const allSections = document.querySelectorAll(".unit-content");
  const allIcons = document.querySelectorAll(".unit-header i");

  const sectionContent = element.nextElementSibling;
  const icon = element.querySelector("i");

  // Close all other sections
  allSections.forEach((sec) => {
    if (sec !== sectionContent) {
      sec.classList.remove("show");
    }
  });

  // Reset all other icons
  allIcons.forEach((ic) => {
    if (ic !== icon) {
      ic.classList.remove("fa-chevron-up");
      ic.classList.add("fa-chevron-down");
    }
  });

  // Toggle clicked section
  if (sectionContent.classList.contains("show")) {
    sectionContent.classList.remove("show");
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  } else {
    sectionContent.classList.add("show");
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  }
}

// Highlight the clicked content item
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".content-item").forEach((item) => {
    item.addEventListener("click", function () {
      // remove active from all items
      document.querySelectorAll(".content-item").forEach((i) => {
        i.classList.remove("active");
      });
      // add active to clicked one
      this.classList.add("active");
    });
  });
});
