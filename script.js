// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Header'ı yükle
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
            initMenu(); // Menü yüklendikten sonra hamburgeri çalıştır
        });

    // Footer'ı yükle
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});

function initMenu() {
    const hamburger = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }
}
