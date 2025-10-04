//////////// Borgar Menu /////////////
const ulNav = document.getElementById("small-sc");
const links = document.querySelector(".nav-links a")

document.body.addEventListener("click", (e) => {
    if (e.target.className === "sp-borgar"){
        ulNav.classList.toggle("sm-sc")
    } else {
        if (ulNav.classList.contains("sm-sc"))
            ulNav.classList.toggle("sm-sc")
    }
})

// fetch data
const flightPromise = await fetch("data.json")
const flightsData = await flightPromise.json();


const template = document.getElementById("template")
const wrapper = document.createElement("div");
wrapper.className = "wrapper";
flightsData.slice(0,6).forEach(flight => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".from").textContent = flight.from;
    clone.querySelector(".to").textContent = flight.to;
    clone.querySelector(".airline").textContent = flight.airline;
    clone.querySelector(".date").textContent = flight.date;
    clone.querySelector(".move-time").textContent = flight.time;
    clone.querySelector(".duration").textContent = flight.duration;
    clone.querySelector(".price").textContent = flight.price;
    clone.querySelector(".flight-number").textContent = flight.flightNumber;
    clone.querySelector(".cls").textContent = flight.cls;
    wrapper.appendChild(clone);
});
document.querySelector(".cards").appendChild(wrapper);

let filterBtns = document.querySelectorAll(".filter-nav li");

filterBtns.forEach(e => {
    e.addEventListener("click", e => handleFilterClick(e))
})

//function to handle filters
function handleFilterClick(e) {
    let target = e.target;
    e.preventDefault();

    filterBtns.forEach(e => {
        e.classList.remove("active")
    })
    target.classList.add("active")

    filterFlights(target.dataset.filter);
}
// filter flights
function filterFlights(flight){
    const allFlights = document.querySelectorAll(".flight-card")
    if (flight == "all") {
        allFlights.forEach(el => {
            el.style.display = ""
        })
    } else {
        allFlights.forEach(el => {
            if (el.querySelector(".airline").textContent == flight) {
                el.style.display = ""
            } else {
                el.style.display = "none"
            }
        })
    }
}




// footer with current time
const copyRight = new Date(); 
document.querySelector(".cRight").textContent = copyRight.getFullYear()





