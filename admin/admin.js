const flightPromise = await fetch("../data.json")
const flightsData = await flightPromise.json();



const template = document.getElementById("template")
const wrapper = document.createElement("div");
wrapper.className = "wrapper";

flightsData.forEach(flight => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".flight-number").textContent =flight.flightNumber;
    clone.querySelector(".from").textContent = flight.from;
    clone.querySelector(".to").textContent = flight.to;
    clone.querySelector(".date").textContent = flight.date;
    clone.querySelector(".move-time").textContent = flight.time;
    clone.querySelector(".duration").textContent = flight.duration;
    clone.querySelector(".airline").textContent = flight.airline;
    clone.querySelector(".price").textContent = flight.price; 
    wrapper.appendChild(clone);
});
document.querySelector(".flight-cards").appendChild(wrapper);

//////////////////////////////////////////////////
let airlines = 3;

document.querySelector(".total-flights").textContent = flightsData.length;
document.querySelector(".destinations").textContent = flightsData.length;
document.querySelector(".airlines").textContent = airlines;
document.querySelector(".total-value").textContent = getTotalValue(flightsData);

function  getTotalValue(arr){
    let value = 0;
    for (let i = 0; i < arr.length; i++) {
        value += arr[i].price
    }
    return value;
}


//add and edit flight pop up 
let addFlightBtn = document.querySelector(".add-flight");
let editFlightBtn = document.querySelectorAll(".edit-flight-btn");
const addFlightPopup = document.querySelector(".add-flight-popup");
const editFlightPopup = document.querySelector(".edit-flight-popup");
const overlay = document.getElementById("overlay");


addFlightBtn.onclick = () => {
    addFlightPopup.style.display = "block";
    overlay.style.display = "block"
}
document.querySelector(".fa-xmark").onclick = () => {
    addFlightPopup.style.display = "none";
    overlay.style.display = "none"
}
document.querySelector(".cancel").onclick = (e) => {
    e.preventDefault();
    addFlightPopup.style.display = "none";
    overlay.style.display = "none"
}


editFlightBtn.forEach((button) => {
    button.addEventListener("click", _ => {
        editFlightPopup.style.display = "block";
        overlay.style.display = "block"
    })
})


document.querySelector(".can-edit").onclick = () => {
    editFlightPopup.style.display = "none";
    overlay.style.display = "none"
}
document.querySelector(".cancel-edit").onclick = (e) => {
    e.preventDefault();
    editFlightPopup.style.display = "none";
    overlay.style.display = "none"
}