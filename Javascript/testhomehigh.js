document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname.split("/").pop(); // Get current file name (e.g., "index.html")

  // 1. Mobile Menu Toggle
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // 2. Active Page Highlighting
  navLinks.forEach((link) => {
    // Compare the data-page attribute or href with the current page
    const linkPage =
      link.getAttribute("data-page") ||
      link.getAttribute("href").split("/").pop();

    if (
      linkPage === currentPath ||
      (currentPath === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");

      // If the active link is inside a dropdown, open the dropdown
      const parentDetails = link.closest("details");
      if (parentDetails) {
        parentDetails.setAttribute("open", "");
      }
    }
  });

  // Close sidebar if a link is clicked on mobile (optional, but good UX)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
      }
    });
  });
});
