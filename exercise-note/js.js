document.querySelector(".navbar__menu").addEventListener("click", () => {
  document.querySelector(".navbar").classList.toggle("active");

  document.body.classList.toggle("active");
});

window.onresize = function () {
  if (document.querySelector(".navbar").classList.contains("active")) {
    document.querySelector(".navbar__menu").click();
  }
};

window.onscroll = function () {
  if (window.scrollY > 0) {
    document.querySelector(".navbar").classList.add("scrolling");
  } else {
    document.querySelector(".navbar").classList.remove("scrolling");
  }
};

document.querySelector("#home__icon").addEventListener("click", () => {
  document.documentElement.scrollTop =
    document.querySelector(".home").offsetHeight;
});
