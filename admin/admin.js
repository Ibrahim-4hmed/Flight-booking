const flightPromise = await fetch("../data.json")
const flightsData = await flightPromise.json();

let flights = [...flightsData]; // This will hold all flight objects 

const template = document.getElementById("template");
const wrapper = document.createElement("div");
wrapper.className = "wrapper";  

flights.forEach(flight => {
    displayFlights(flight)
});
addFlightsToAdminPage();// show the flights on page
//////////////////////////////////////////////////
const uniqueAirlines = new Set(flights.map(flight => flight.airline));
const numberOfAirlines = uniqueAirlines.size;


document.querySelector(".total-flights").textContent = flights.length;// Totle flights Value
document.querySelector(".destinations").textContent = flights.length;
document.querySelector(".airlines").textContent = numberOfAirlines;
document.querySelector(".total-value").textContent = getTotalValue(flights);


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
    hideAddPopup()
}
document.querySelector(".cancel").onclick = (e) => {
    e.preventDefault();
    hideAddPopup()
}
function hideAddPopup(){
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
        hideEditPopup()
}
document.querySelector(".cancel-edit").onclick = (e) => {
    e.preventDefault();
    hideEditPopup()
}
function hideEditPopup(){
    editFlightPopup.style.display = "none";
    overlay.style.display = "none"
}

//Write add flight code for adding flight
document.getElementById("addFlightForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the form from refreshing the page
  const form = event.target;
  const newFlight = {
        id: Date.now(), // unique id based on timestamp
        from: form.from.value,
        to: form.to.value,
        airline : form.airline.value,
        date: form.date.value,
        time: form.time.value,
        duration: form.duration.value,
        price: form.price.value,
        cls: "Business",
        left: "25 left",
        flightNumber: form.flightNumber.value
    }
    displayFlights(newFlight)
    flights.push(newFlight); // Add flight to the array

    form.reset(); // Clear the form fields
    hideAddPopup()
});


// Download updated JSON
function downloadUpdatedJSON() {
  const dataStr = JSON.stringify(flights, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
  URL.revokeObjectURL(url);
}
document.querySelector(".export").addEventListener("click", downloadUpdatedJSON);


///////////////// functions ////////////////////////
function displayFlights(flightArray){// add flighrts 
    const clone = template.content.cloneNode(true);
    clone.querySelector(".flight-number").textContent = flightArray.flightNumber;
    clone.querySelector(".from").textContent = flightArray.from;
    clone.querySelector(".to").textContent = flightArray.to;
    clone.querySelector(".date").textContent = flightArray.date;
    clone.querySelector(".move-time").textContent = flightArray.time;
    clone.querySelector(".duration").textContent = flightArray.duration;
    clone.querySelector(".airline").textContent = flightArray.airline;
    clone.querySelector(".price").textContent = flightArray.price; 
    wrapper.appendChild(clone);
}
// display flights to page
function addFlightsToAdminPage(){
    document.querySelector(".flight-cards").appendChild(wrapper);   
    let storage = window.localStorage.setItem("flights",document.querySelector(".flight-cards")) 
}
// Total Flights Value
function  getTotalValue(arr){
    let value = 0;
    for (let i = 0; i < arr.length; i++) {
        value += +arr[i].price
    }
    return value;
}