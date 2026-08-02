import { renderSkeleton } from "./js/skeleton.js"
import { changeLanguage } from "./js/handleLang.js"
import { fetchData } from "./js/fetchFlights.js";


// variables 
const cards = document.querySelector(".cards");
//language button
const langBtn = document.getElementById('lang-btn');
const flightForm = document.getElementById("flights-search");
const skeletonTemp = document.getElementById('skeleton-template')
const cardTemp = document.getElementById("card-template");
const submitBtn = document.getElementById("search-btn")
const ulNav = document.getElementById("small-sc");
const links = document.querySelector(".nav-links a")


//Get current language
let currentLang = localStorage.getItem("lang") || "en";


// Apply saved language on page load
changeLanguage(currentLang);


//form submttion
flightForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelector('.available-flights').style.display = "block";
  
  cards.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    startLoading()

  renderSkeleton(2,cards,skeletonTemp)

  const from = flightForm.elements.from.value.trim();
  const to = flightForm.elements.to.value.trim();

  flightForm.elements.from.value = "";
  flightForm.elements.to.value = "";

  const endpoint = currentLang === "en" ? "flights" : "flights/ar";

  const url = 
  `https://flights-api-1.onrender.com/${endpoint}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;


  try {
    const flightsData = await fetchData(url);
    cards.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    flightsData.forEach(flight => {
        const clone = cardTemp.content.cloneNode(true);
        clone.querySelector(".from").textContent = flight.from;
        clone.querySelector(".to").textContent = flight.to;
        clone.querySelector(".airline").textContent = flight.airline;
        clone.querySelector(".from-country").textContent = flight.fromCountry;
        clone.querySelector(".to-country").textContent = flight.toCountry;
        clone.querySelector(".duration").textContent = flight.duration;
        clone.querySelector(".price").textContent = flight.price;
        clone.querySelector('.row-3 span').textContent =flight.totalPrice;
        clone.querySelector('.row-3 a').textContent =flight.bookBtn;
        
        wrapper.appendChild(clone);
    });
    cards.appendChild(wrapper);    
  } catch (error) {
      const err = document.createElement("p");
      err.textContent = error.message;
      console.log(err)
      cards.appendChild(err);
  } finally {
      stopLoading();
      // remove queries from the url => /index.html
      window.history.replaceState({}, document.title, window.location.pathname);
  }

});


//Switch between languages
langBtn.addEventListener('click', () => {
  const newLang = currentLang === "en" ? "ar" : "en";
  currentLang = newLang; 
  localStorage.setItem("lang",newLang);
  changeLanguage(newLang);
  cards.innerHTML = "";
  cards.appendChild(cardTemp);
  cards.appendChild(skeletonTemp)
});


//////////// Borgar Menu /////////////
document.querySelector(".menu-icon").addEventListener("click", () => {
    ulNav.classList.toggle("sm-sc")
})

// Close menu when clicking outside 
document.addEventListener("click", (event) => {
    const isClickInside = ulNav.contains(event.target) || event.target.classList.contains("menu-icon");

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
}





// footer with current time
const currentDate = new Date(); 
document.querySelector(".cRight").textContent = currentDate.getFullYear()



