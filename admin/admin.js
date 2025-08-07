const flightPromise = await fetch("../data.json")
const flightsData = await flightPromise.json();

let flights = [...flightsData]; // This will hold all flight objects 

const template = document.getElementById("template");
const wrapper = document.createElement("div");
wrapper.className = "wrapper";  

flights.forEach(flight => {
    displayFlight(flight)
});
addFlightsToAdminPage();// show the flights on page
updateStats();//update flight numbers and airlines

/////////// Add and Edit flight pop up ///////////////////////
const addFlightBtn = document.querySelector(".add-flight");
const editFlightBtn = document.querySelectorAll(".edit-flight-btn");
const addFlightPopup = document.querySelector(".add-flight-popup");
const editFlightPopup = document.querySelector(".edit-flight-popup");
const overlay = document.getElementById("overlay");
// Show Add Flight Pop up
addFlightBtn.onclick = () => {
    addFlightPopup.style.display = "block";
    overlay.style.display = "block"
}
// Hide Add Flight Pop up
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
// Show Edit Flight Pop up
editFlightBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        editFlightPopup.style.display = "block";
        overlay.style.display = "block"
        preFilledPopup(e);
    })
})
// Hide Edit Flight Pop up
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

/////////// Write Adding Flight Code For Adding Flight ///////////////////////////////
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
    displayFlight(newFlight)
    flights.push(newFlight); // Add flight to the array

    form.reset(); // Clear the form fields
    hideAddPopup()
});

////////////////// Write Editing flight Code ////////////////////////
// Show Pre-filled Form Data
function preFilledPopup(e){
    // get flight details from card
    const currentEle = e.target.closest(".flight-card");
    let editFrom =  currentEle.querySelector(".from").textContent
    let editTo =  currentEle.querySelector(".to").textContent
    let editAirline =  currentEle.querySelector(".airline").textContent
    let editFlightNumber =  currentEle.querySelector(".flight-number").textContent
    let editPrice =  currentEle.querySelector(".price").textContent
    let editDate =  currentEle.querySelector(".date").textContent
    let editTime =  currentEle.querySelector(".time").textContent
    let editDuration =  currentEle.querySelector(".duration").textContent
    // set flight details to edit form pop up 
    const editPopupForm = document.getElementById("editForm")
    editPopupForm.elements["from"].value = editFrom;
    editPopupForm.elements["to"].value = editTo;
    editPopupForm.elements["airline"].value = editAirline;
    editPopupForm.elements["flight-number"].value = editFlightNumber;
    editPopupForm.elements["price"].value = editPrice;
    editPopupForm.elements["date"].value = editDate;
    editPopupForm.elements["time"].value = editTime;
    editPopupForm.elements["duration"].value = editDuration;
}

///////////////// Download updated JSON ////////////////////////
document.querySelector(".export").addEventListener("click", downloadUpdatedJSON);

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

/////////////// Remove Flight Form DOM and Update Array at JSON File ////////////////
const deleteBtns = document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click",(e) => removeFlight(e));
})
function removeFlight(e){
    const flightCard = e.target.closest(".flight-card");
    const flightNumber = flightCard.querySelector(".flight-number").textContent;
    // Remove from flights array 
    flights = flights.filter(flight => flight.flightNumber !== flightNumber);

    // Remove the card from the DOM
    flightCard.remove();

    // Update counters and localStorage if needed
    updateStats();
    localStorage.setItem("flights", JSON.stringify(flights));
}


///////////////// functions ////////////////////////
function updateStats(){
    const uniqueAirlines = new Set(flights.map(flight => flight.airline));
    const numberOfAirlines = uniqueAirlines.size;

    document.querySelector(".total-flights").textContent = flights.length;// Totle flights Value
    document.querySelector(".destinations").textContent = flights.length;
    document.querySelector(".airlines").textContent = numberOfAirlines;
    document.querySelector(".total-value").textContent = getTotalValue(flights);
}

function displayFlight(flightArray){// add flighrts 
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
    // let storage = window.localStorage.setItem("flights",document.querySelector(".flight-cards")) 
    localStorage.setItem("flights", JSON.stringify(flights));

}
// Total Flights Value
function  getTotalValue(arr){
    let value = 0;
    for (let i = 0; i < arr.length; i++) {
        value += +arr[i].price
    }
    return value;
}