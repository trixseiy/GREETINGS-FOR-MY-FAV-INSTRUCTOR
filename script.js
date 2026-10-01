const pages = [...document.querySelectorAll(".page")];
const current = document.getElementById("current");
const total = document.getElementById("total");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots");
const photo = document.getElementById("teacherPhoto");
const photoFrame = document.querySelector(".photo-polaroid");

let page = 0;
total.textContent = String(pages.length).padStart(2, "0");

pages.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to page ${i + 1}`);
  dot.addEventListener("click", () => showPage(i));
  dots.appendChild(dot);
});

function showPage(index) {
  page = Math.max(0, Math.min(index, pages.length - 1));

  pages.forEach((item, i) => {
    item.classList.toggle("active", i === page);
  });

  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === page);
  });

  current.textContent = String(page + 1).padStart(2, "0");
  prevBtn.disabled = page === 0;
  nextBtn.disabled = page === pages.length - 1;
}

prevBtn.addEventListener("click", () => showPage(page - 1));
nextBtn.addEventListener("click", () => showPage(page + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPage(page - 1);
  if (event.key === "ArrowRight") showPage(page + 1);
});

photo.addEventListener("load", () => photoFrame.classList.add("has-photo"));
photo.addEventListener("error", () => photoFrame.classList.remove("has-photo"));

showPage(0);
