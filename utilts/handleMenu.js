//////////// Borgar Menu /////////////
const ulNav = document.getElementById("small-sc");
const links = document.querySelector(".nav-links a")

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
