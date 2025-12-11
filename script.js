document.addEventListener("DOMContentLoaded", function() {
    
    // Header'ı Çek
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
        });

    // Footer'ı Çek
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
});

// Mobil Menü Aç/Kapa
function toggleMenu() {
    const menu = document.querySelector('.nav-scroll-container');
    const list = document.getElementById('navMenu');
    
    // Mobilde nav-scroll-container gizli olduğu için class'ı listeye veriyoruz
    if (window.innerWidth <= 768) {
        list.classList.toggle('active');
    }
}
