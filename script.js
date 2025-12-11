document.addEventListener("DOMContentLoaded", function() {
    // Header ve Footer Yükle
    fetch('header.html').then(r => r.text()).then(d => document.querySelector('header').innerHTML = d);
    fetch('footer.html').then(r => r.text()).then(d => document.querySelector('footer').innerHTML = d);
});

// YENİ MENÜ FONKSİYONU
function toggleMenu() {
    const overlay = document.getElementById('megaMenu');
    if (!overlay) return; // megaMenu yüklenene kadar hatayı engellemek için

    overlay.classList.toggle('active');
    
    // Menü açılınca arkadaki sayfa kaymasın diye body'i kilitliyoruz
    if(overlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}
