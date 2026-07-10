// Carousel helper script (safely bypassed if grid view is active)
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.progetti-carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = document.querySelectorAll('.progetto-card');
    
    // Configura i colori dinamici delle card se presenti
    cards.forEach(card => {
        const color = card.getAttribute('data-color');
        if (color) {
            card.style.setProperty('--card-color', color);
        }
    });

    // Se non ci sono elementi per il carosello, esci senza errori
    if (!carousel || !prevButton || !nextButton) {
        return;
    }

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalCards - 1;
    }

    function scrollToCard(index) {
        if (cards[index]) {
            carousel.scrollTo({
                left: cards[index].offsetLeft,
                behavior: 'smooth'
            });
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToCard(currentIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            scrollToCard(currentIndex);
            updateButtons();
        }
    });

    updateButtons();

    carousel.addEventListener('scroll', () => {
        const scrollPosition = carousel.scrollLeft;
        currentIndex = Math.round(scrollPosition / carousel.offsetWidth);
        updateButtons();
    });
});