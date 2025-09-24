document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  // Toggle sidebar on menu button click
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});
