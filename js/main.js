document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
var nav = document.getElementById("public-nav");
document.getElementById("menu-btn").addEventListener("click", function () {
  nav.classList.toggle("public-nav-open");
});
nav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () { nav.classList.remove("public-nav-open"); });
});

// FAQ accordion
document.querySelectorAll(".faq-item button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var item = btn.parentElement;
    var wasOpen = item.classList.contains("faq-open");
    document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("faq-open"); });
    if (!wasOpen) item.classList.add("faq-open");
  });
});
