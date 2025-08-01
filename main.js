const flightPromise = await fetch("data.json")
const flightsData = await flightPromise.json();

console.log(flightsData)

const template = document.getElementById("template")
const wrapper = document.createElement("div");
wrapper.className = "wrapper";
flightsData.forEach(flight => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".from").textContent = flight.from;
    clone.querySelector(".to").textContent = flight.to;
    clone.querySelector(".airline").textContent = flight.airline;
    clone.querySelector(".date").textContent = flight.date;
    clone.querySelector(".time").textContent = flight.time;
    clone.querySelector(".price").textContent = flight.price;
    clone.querySelector(".cls").textContent = flight.cls;
    clone.querySelector(".left").textContent = flight.left;

    
    wrapper.appendChild(clone);
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





