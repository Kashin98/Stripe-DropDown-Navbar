import sublinks from "./data.js";

// target Elements
const modalContent = document.querySelector(".modal-content");
const navLinks = [...document.querySelectorAll(".nav-item")];
const submenu = document.querySelector(".submenu");
const hero = document.getElementById("hero");
const nav = document.querySelector(".navbar");

// Sidebar for phones setup
sublinks
  .map((item) => {
    const { page, links } = item;
    modalContent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modal-header">
        <h4 class="modal-title ">${page}</h4>
      </div>
      <div class="modal-body row">${links
        .map((item) => {
          // No point in using URL, doesn't go anywhere anyways
          const { icon, label, url } = item;
          return `
        <a href="#" class="col-6 py-3 link"><i class="px-1 ${icon}"></i> ${label}</a>
        `;
        })
        .join("")}</div>
      `
    );
  })
  .join("");

navLinks.forEach((btn) => {
  btn.addEventListener("mouseover", (e) => {
    const text = e.target.textContent.toLowerCase();
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.right + tempBtn.left) / 2;
    // const bottom = tempBtn - 3;
    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      const { page, links } = tempPage;
      submenu.innerHTML = `
      <section >
        <h4 class="py-2">${page}</h4>
      <div class="row">${links
        .map((item) => {
          // No point in using URL, doesn't go anywhere anyways
          const { icon, label } = item;
          return `<a href="#" class="col-6 py-2 link "><i class="px-2 ${icon}"></i> ${label}</a>`;
        })
        .join("")}</div>
      </section>
      `;
    }
  });
});

hero.addEventListener("mouseover", () => {
  submenu.classList.remove("show");
});

nav.addEventListener("mouseover", (e) => {
  if (
    !e.target.classList.contains("nav-link") &&
    !e.target.classList.contains("nav-item")
  ) {
    submenu.classList.remove("show");
  }
});
