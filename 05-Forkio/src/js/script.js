var burgerBtn = document.getElementById("btn");

burgerBtn.addEventListener("click", function () {
  var burgerList = document.querySelector(".header__list");
  var spanLine = document.querySelector(".header__btn-first-line");
  var firstLine = document.querySelector(".header__btn-second-line");
  var thirdLine = document.querySelector(".header__btn-third-line");
    burgerList.classList.toggle("active");
    spanLine.classList.toggle("deletedLine");
    firstLine.classList.toggle("rotatedRigth");
    thirdLine.classList.toggle("rotatedLeft");
});