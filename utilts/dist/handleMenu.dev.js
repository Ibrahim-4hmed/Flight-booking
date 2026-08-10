"use strict";

//////////// Borgar Menu /////////////
var ulNav = document.getElementById("small-sc");
var links = document.querySelector(".nav-links a");
document.querySelector(".menu-icon").addEventListener("click", function () {
  ulNav.classList.toggle("sm-sc");
}); // Close menu when clicking outside 

document.addEventListener("click", function (event) {
  var isClickInside = ulNav.contains(event.target) || event.target.classList.contains("menu-icon");

  if (!isClickInside) {
    ulNav.classList.remove("sm-sc");
  }
});