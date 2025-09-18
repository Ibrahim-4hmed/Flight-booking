const flightPromise = await fetch("data.json")
const flightsData = await flightPromise.json();

// console.log(flightsData)

const template = document.getElementById("template")
const wrapper = document.createElement("div");
wrapper.className = "wrapper";
flightsData.forEach(flight => {
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

    // const clone = template.content.cloneNode(true);
    // clone.querySelector(".from").textContent = flightArray.from;
    // clone.querySelector(".to").textContent = flightArray.to;
    // clone.querySelector(".airline").textContent = flightArray.airline;
    // clone.querySelector(".date").textContent = flightArray.date;
    // clone.querySelector(".move-time").textContent = flightArray.time;
    // clone.querySelector(".duration").textContent = flightArray.duration;
    // clone.querySelector(".price").textContent = flightArray.price; 
    // clone.querySelector(".flight-number").textContent = flightArray.flightNumber;
    // wrapper.appendChild(clone);
    // }
});
document.querySelector(".cards").appendChild(wrapper);


let filterBtns = document.querySelectorAll(".filter-nav li");

filterBtns.forEach(e => {
    e.addEventListener("click", e => handleFilterClick(e))
})

function handleFilterClick(e) {
    let target = e.target;
    e.preventDefault();

    filterBtns.forEach(e => {
        e.classList.remove("active")
    })
    target.classList.add("active")

    filterFlights(target.dataset.filter);
}

function filterFlights(flight){
    const allFlights = document.querySelectorAll(".card")
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




// footer
const copyRight = new Date(); 
document.querySelector(".cRight").textContent = copyRight.getFullYear()





