"use strict";

var _skeleton = require("./utilts/skeleton.js");

var _handleLang = require("./utilts/handleLang.js");

var _fetchFlights = require("./utilts/fetchFlights.js");

// variables 
var cards = document.querySelector(".cards"); //language button

var langBtn = document.getElementById('lang-btn');
var flightForm = document.getElementById("flights-search");
var skeletonTemp = document.getElementById('skeleton-template');
var cardTemp = document.getElementById("card-template");
var submitBtn = document.getElementById("search-btn");
var ulNav = document.getElementById("small-sc");
var links = document.querySelector(".nav-links a"); //Get current language

var currentLang = localStorage.getItem("lang") || "en"; // Apply saved language on page load

(0, _handleLang.changeLanguage)(currentLang); //form submttion

flightForm.addEventListener("submit", function _callee(e) {
  var from, to, endpoint, url, flightsData, wrapper;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          document.querySelector('.available-flights').style.display = "block";
          cards.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          startLoading();
          (0, _skeleton.renderSkeleton)(2, cards, skeletonTemp);
          from = flightForm.elements.from.value.trim();
          to = flightForm.elements.to.value.trim();
          flightForm.elements.from.value = "";
          flightForm.elements.to.value = "";
          endpoint = currentLang === "en" ? "flights" : "flights/ar";
          url = "https://flights-api-1.onrender.com/".concat(endpoint, "?from=").concat(encodeURIComponent(from), "&to=").concat(encodeURIComponent(to));
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap((0, _fetchFlights.fetchData)(url));

        case 14:
          flightsData = _context.sent;

          if (!(flightsData.length === 0)) {
            _context.next = 18;
            break;
          }

          cards.innerHTML = cards.innerHTML = "\n        <div class=\"wrapper\">\n            <div class=\"no-results-card\">\n                <div class=\"icon\">\u2708\uFE0F</div>\n                <h2>No Flights Found</h2>\n                <p>\n                    We couldn't find any flights matching your search.\n                    Try changing your departure or destination.\n                </p>\n            </div>\n        </div>\n        ";
          return _context.abrupt("return");

        case 18:
          cards.innerHTML = "";
          wrapper = document.createElement("div");
          wrapper.className = "wrapper";
          flightsData.forEach(function (flight) {
            var clone = cardTemp.content.cloneNode(true);
            clone.querySelector(".from").textContent = flight.from;
            clone.querySelector(".to").textContent = flight.to;
            clone.querySelector(".airline").textContent = flight.airline;
            clone.querySelector(".from-country").textContent = flight.fromCountry;
            clone.querySelector(".to-country").textContent = flight.toCountry;
            clone.querySelector(".duration").textContent = flight.duration;
            clone.querySelector(".price").textContent = flight.price;
            clone.querySelector('.row-3 span').textContent = flight.totalPrice;
            clone.querySelector('.row-3 a').textContent = flight.bookBtn;
            wrapper.appendChild(clone);
          });
          cards.appendChild(wrapper);
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](11);
          cards.innerHTML = cards.innerHTML = "\n        <div class=\"wrapper\">\n            <div class=\"no-results-card\">\n                <div class=\"icon\">\u2708\uFE0F</div>\n                <h2>".concat(currentLang === 'ar' ? "لا توجد رحلات" : "No Flights Found", "</h2>\n                <p>\n                    ").concat(_context.t0, "\n                </p>\n            </div>\n        </div>\n        ");

        case 28:
          _context.prev = 28;
          stopLoading(); // remove queries from the url => /index.html

          window.history.replaceState({}, document.title, window.location.pathname);
          document.querySelector('.available-flights').style.display = "none";
          return _context.finish(28);

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 25, 28, 33]]);
}); //Switch between languages

langBtn.addEventListener('click', function () {
  var newLang = currentLang === "en" ? "ar" : "en";
  currentLang = newLang;
  localStorage.setItem("lang", newLang);
  (0, _handleLang.changeLanguage)(newLang);
  cards.innerHTML = "";
  cards.appendChild(cardTemp);
  cards.appendChild(skeletonTemp);
}); //////////// Borgar Menu /////////////

document.querySelector(".menu-icon").addEventListener("click", function () {
  ulNav.classList.toggle("sm-sc");
}); // Close menu when clicking outside 

document.addEventListener("click", function (event) {
  var isClickInside = ulNav.contains(event.target) || event.target.classList.contains("menu-icon");

  if (!isClickInside) {
    ulNav.classList.remove("sm-sc");
  }
});

function startLoading() {
  submitBtn.disabled = true;
  submitBtn.textContent = "Searching...";
}

function stopLoading() {
  submitBtn.disabled = false;
  submitBtn.textContent = "Search Flights";
} // footer with current time


var currentDate = new Date();
document.querySelector(".cRight").textContent = currentDate.getFullYear();