
import { renderSkeleton } from "./utilts/skeleton.js";
import { changeLanguage } from "./utilts/handleLang.js";
import { fetchData } from "./utilts/fetchFlights.js";

/* =================================
   HEADER & NAVIGATION
================================= */

const menuBtn = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar");
const menuIcon = menuBtn.querySelector("i");
const navLinks = document.querySelector("#small-sc");

// Toggle mobile menu
menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("show");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
});

// Close mobile menu
function closeMenu() {
    navbar.classList.remove("show");

    menuBtn.setAttribute("aria-expanded", "false");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
}

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Close menu when clicking outside the header
document.addEventListener("click", (event) => {
    if (!event.target.closest(".header")) {
        closeMenu();
    }
});

// Close menu using Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
        menuBtn.focus();
    }
});

// Close menu when switching to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        closeMenu();
    }
});

// Automatically detect active page
const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

navLinks.querySelectorAll("a").forEach(link => {
    const linkPage = link.getAttribute("href");

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
const cards = document.querySelector(".cards");

// Language
const langBtn = document.getElementById("lang-btn");

// Flight search form
const flightForm = document.getElementById("flights-search");

// Templates
const skeletonTemp = document.getElementById("skeleton-template");
const cardTemp = document.getElementById("card-template");

// Search button
const submitBtn = document.getElementById("search-btn");


/* =================================
   LANGUAGE MANAGEMENT
================================= */

// Get saved language
let currentLang = localStorage.getItem("lang") || "en";

// Apply saved language on page load
changeLanguage(currentLang);

// Switch languages
langBtn.addEventListener("click", () => {

    currentLang = currentLang === "en" ? "ar" : "en";

    localStorage.setItem("lang", currentLang);

    changeLanguage(currentLang);

    // Clear previous flight results
    cards.innerHTML = "";

    // Restore templates
    cards.appendChild(cardTemp.content.cloneNode(true));
    cards.appendChild(skeletonTemp.content.cloneNode(true));

});


/* =================================
   FLIGHT SEARCH
================================= */

flightForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const from = flightForm.elements.from.value.trim();
    const to = flightForm.elements.to.value.trim();

    // Show available flights section
    document.querySelector(".available-flights").style.display = "block";

    // Scroll to results
    cards.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    // Show loading state
    startLoading();

    renderSkeleton(2, cards, skeletonTemp);

    // Clear inputs
    flightForm.elements.from.value = "";
    flightForm.elements.to.value = "";

    // API endpoint
    const endpoint = currentLang === "en" ? "api" : "api/ar";

    const url =
        `https://ex-api-o3fy.onrender.com/${endpoint}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

    try {

        const flightsData = await fetchData(url);

        console.log(flightsData);

        // No results
        if (flightsData.length === 0) {

            cards.innerHTML = `
                <div class="wrapper">
                    <div class="no-results-card">
                        <div class="icon">✈️</div>
                        <h2>
                            ${currentLang === "ar" ? "لا توجد رحلات" : "No Flights Found"}
                        </h2>
                        <p>
                            ${currentLang === "ar"
                                ? "لم نتمكن من العثور على رحلات تطابق بحثك. حاول تغيير مدينة المغادرة أو الوجهة."
                                : "We couldn't find any flights matching your search. Try changing your departure or destination."
                            }
                        </p>
                    </div>
                </div>
            `;

            return;
        }

        // Clear previous results
        cards.innerHTML = "";

        // Create wrapper
        const wrapper = document.createElement("div");

        wrapper.className = "wrapper";

        // Render flight cards
        flightsData.forEach(flight => {

            const clone = cardTemp.content.cloneNode(true);

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

    } catch (error) {

        console.error("Flight search error:", error);

        cards.innerHTML = `
            <div class="wrapper">
                <div class="no-results-card">
                    <div class="icon">✈️</div>
                    <h2>
                        ${currentLang === "ar" ? "حدث خطأ" : "Something went wrong"}
                    </h2>
                    <p>
                        ${currentLang === "ar"
                            ? "تعذر تحميل الرحلات. يرجى المحاولة مرة أخرى."
                            : "Unable to load flights. Please try again later."
                        }
                    </p>
                </div>
            </div>
        `;

    } finally {

        stopLoading();

        // Remove query parameters from URL
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

        document.querySelector(".available-flights").style.display = "none";

    }

});


/* =================================
   LOADING STATE
================================= */

function startLoading() {

    submitBtn.disabled = true;

    submitBtn.textContent =
        currentLang === "ar" ? "جارٍ البحث..." : "Searching...";

}

function stopLoading() {

    submitBtn.disabled = false;

    submitBtn.textContent =
        currentLang === "ar" ? "ابحث عن رحلات" : "Search Flights";

}


/* =================================
   FOOTER
================================= */

const currentDate = new Date();

document.querySelector(".cRight").textContent =
    currentDate.getFullYear();
