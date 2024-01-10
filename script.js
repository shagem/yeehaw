let burgerIcon = document.querySelector("#burger-menu");

burgerIcon.addEventListener("click", function() {
    document.querySelector("#menu-links").classList.toggle("active");
    burgerIcon.classList.toggle("active");
});