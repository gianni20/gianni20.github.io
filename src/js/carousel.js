document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.progetti-carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    const cards = document.querySelectorAll('.progetto-card');
    const totalCards = cards.length;

    // Gestione colori delle card
    cards.forEach(card => {
        const color = card.getAttribute('data-color');
        card.style.setProperty('--card-color', color);
    });

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalCards - 1;
    }

    function scrollToCard(index) {
        const card = cards[index];
        carousel.scrollTo({
            left: card.offsetLeft,
            behavior: 'smooth'
        });
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

    // Aggiorna lo stato dei pulsanti all'inizializzazione
    updateButtons();

    // Gestione dello scroll manuale
    carousel.addEventListener('scroll', () => {
        const scrollPosition = carousel.scrollLeft;
        currentIndex = Math.round(scrollPosition / carousel.offsetWidth);
        updateButtons();
    });
});