"use strict";

var _skeleton = require("./utilts/skeleton.js");

var _handleLang = require("./utilts/handleLang.js");

var _fetchFlights = require("./utilts/fetchFlights.js");

/* =================================
   HEADER & NAVIGATION
================================= */
var menuBtn = document.querySelector("#menu-btn");
var navbar = document.querySelector(".navbar");
var menuIcon = menuBtn.querySelector("i");
var navLinks = document.querySelector("#small-sc"); // Toggle mobile menu

menuBtn.addEventListener("click", function () {
  var isOpen = navbar.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
}); // Close mobile menu

function closeMenu() {
  navbar.classList.remove("show");
  menuBtn.setAttribute("aria-expanded", "false");
  menuIcon.classList.remove("fa-xmark");
  menuIcon.classList.add("fa-bars");
} // Close menu after clicking a navigation link


navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
}); // Close menu when clicking outside the header

document.addEventListener("click", function (event) {
  if (!event.target.closest(".header")) {
    closeMenu();
  }
}); // Close menu using Escape

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
    menuBtn.focus();
  }
}); // Close menu when switching to desktop

window.addEventListener("resize", function () {
  if (window.innerWidth > 850) {
    closeMenu();
  }
}); // Automatically detect active page

var currentPage = window.location.pathname.split("/").pop() || "index.html";
navLinks.querySelectorAll("a").forEach(function (link) {
  var linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});
/* =================================
   DOM ELEMENTS
================================= */
// Flight cards

var cards = document.querySelector(".cards"); // Language

var langBtn = document.getElementById("lang-btn"); // Flight search form

var flightForm = document.getElementById("flights-search"); // Templates

var skeletonTemp = document.getElementById("skeleton-template");
var cardTemp = document.getElementById("card-template"); // Search button

var submitBtn = document.getElementById("search-btn");
/* =================================
   LANGUAGE MANAGEMENT
================================= */
// Get saved language

var currentLang = localStorage.getItem("lang") || "en"; // Apply saved language on page load

(0, _handleLang.changeLanguage)(currentLang); // Switch languages

langBtn.addEventListener("click", function () {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("lang", currentLang);
  (0, _handleLang.changeLanguage)(currentLang); // Clear previous flight results

  cards.innerHTML = ""; // Restore templates

  cards.appendChild(cardTemp.content.cloneNode(true));
  cards.appendChild(skeletonTemp.content.cloneNode(true));
});
/* =================================
   FLIGHT SEARCH
================================= */

flightForm.addEventListener("submit", function _callee(e) {
  var from, to, endpoint, url, flightsData, wrapper;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          from = flightForm.elements.from.value.trim();
          to = flightForm.elements.to.value.trim(); // Show available flights section

          document.querySelector(".available-flights").style.display = "block"; // Scroll to results

          cards.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }); // Show loading state

          startLoading();
          (0, _skeleton.renderSkeleton)(2, cards, skeletonTemp); // Clear inputs

          flightForm.elements.from.value = "";
          flightForm.elements.to.value = ""; // API endpoint

          endpoint = currentLang === "en" ? "api" : "api/ar";
          url = "https://ex-api-o3fy.onrender.com/".concat(endpoint, "?from=").concat(encodeURIComponent(from), "&to=").concat(encodeURIComponent(to));
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap((0, _fetchFlights.fetchData)(url));

        case 14:
          flightsData = _context.sent;
          console.log(flightsData); // No results

          if (!(flightsData.length === 0)) {
            _context.next = 19;
            break;
          }

          cards.innerHTML = "\n                <div class=\"wrapper\">\n                    <div class=\"no-results-card\">\n                        <div class=\"icon\">\u2708\uFE0F</div>\n                        <h2>\n                            ".concat(currentLang === "ar" ? "لا توجد رحلات" : "No Flights Found", "\n                        </h2>\n                        <p>\n                            ").concat(currentLang === "ar" ? "لم نتمكن من العثور على رحلات تطابق بحثك. حاول تغيير مدينة المغادرة أو الوجهة." : "We couldn't find any flights matching your search. Try changing your departure or destination.", "\n                        </p>\n                    </div>\n                </div>\n            ");
          return _context.abrupt("return");

        case 19:
          // Clear previous results
          cards.innerHTML = ""; // Create wrapper

          wrapper = document.createElement("div");
          wrapper.className = "wrapper"; // Render flight cards

          flightsData.forEach(function (flight) {
            var clone = cardTemp.content.cloneNode(true);
            clone.querySelector(".from").textContent = flight.from;
            clone.querySelector(".to").textContent = flight.to;
            clone.querySelector(".airline").textContent = flight.airline;
            clone.querySelector(".from-country").textContent = flight.fromCountry;
            clone.querySelector(".to-country").textContent = flight.toCountry;
            clone.querySelector(".duration").textContent = flight.duration;
            clone.querySelector(".price").textContent = flight.price;
            clone.querySelector(".row-3 span").textContent = flight.totalPrice;
            clone.querySelector(".row-3 a").textContent = flight.bookBtn;
            wrapper.appendChild(clone);
          });
          cards.appendChild(wrapper);
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](11);
          console.error("Flight search error:", _context.t0);
          cards.innerHTML = "\n            <div class=\"wrapper\">\n                <div class=\"no-results-card\">\n                    <div class=\"icon\">\u2708\uFE0F</div>\n                    <h2>\n                        ".concat(currentLang === "ar" ? "حدث خطأ" : "Something went wrong", "\n                    </h2>\n                    <p>\n                        ").concat(currentLang === "ar" ? "تعذر تحميل الرحلات. يرجى المحاولة مرة أخرى." : "Unable to load flights. Please try again later.", "\n                    </p>\n                </div>\n            </div>\n        ");

        case 30:
          _context.prev = 30;
          stopLoading(); // Remove query parameters from URL

          window.history.replaceState({}, document.title, window.location.pathname);
          document.querySelector(".available-flights").style.display = "none";
          return _context.finish(30);

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 26, 30, 35]]);
});
/* =================================
   LOADING STATE
================================= */

function startLoading() {
  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === "ar" ? "جارٍ البحث..." : "Searching...";
}

function stopLoading() {
  submitBtn.disabled = false;
  submitBtn.textContent = currentLang === "ar" ? "ابحث عن رحلات" : "Search Flights";
}
/* =================================
   FOOTER
================================= */


var currentDate = new Date();
document.querySelector(".cRight").textContent = currentDate.getFullYear();