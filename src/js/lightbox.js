document.addEventListener('DOMContentLoaded', () => {
    // 1. Crea la struttura HTML del Lightbox al volo
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Chiudi">&times;</button>
        <div class="lightbox-content">
            <img id="lightbox-img" class="lightbox-img" src="" alt="Dettaglio opera" draggable="false">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('#lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    let isZoomed = false;
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    // Funzione per reimpostare lo stato dello zoom
    function resetZoom() {
        isZoomed = false;
        isDragging = false;
        translateX = 0;
        translateY = 0;
        lightboxImg.classList.remove('zoomed');
        lightboxImg.style.transform = 'none';
        lightboxImg.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    // Funzione di chiusura del Lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // ripristina scroll di pagina
        setTimeout(resetZoom, 300); // aspetta che finisca l'animazione di chiusura
    }

    // Funzione di apertura del Lightbox
    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Dettaglio opera';
        resetZoom();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // blocca scroll di pagina
    }

    // Aggiungi click event listeners a tutte le immagini zoomabili
    function initZoomables() {
        const zoomables = document.querySelectorAll('.zoomable');
        zoomables.forEach(img => {
            // Rendi chiaro che sono interattive
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                openLightbox(img.src, img.alt);
            });
        });
    }

    // Inizializza
    initZoomables();

    // Event listener per chiudere cliccando lo sfondo
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Event listener per il pulsante di chiusura
    closeBtn.addEventListener('click', closeLightbox);

    // Chiudi con il tasto ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Gestione zoom dell'immagine cliccandoci sopra
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation(); // evita la chiusura cliccando sullo sfondo
        if (!isZoomed) {
            isZoomed = true;
            lightboxImg.classList.add('zoomed');
            lightboxImg.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            lightboxImg.style.transform = 'scale(2.2)';
            translateX = 0;
            translateY = 0;
        } else {
            resetZoom();
        }
    });

    // --- LOGICA PANNING (Trascinamento) ---

    // Mouse drag
    lightboxImg.addEventListener('mousedown', (e) => {
        if (!isZoomed) return;
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.style.transition = 'none'; // disattiva transizioni per fluidità durante il drag
        lightboxImg.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || !isZoomed) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        
        // Limita il panning entro margini logici per evitare che l'immagine sparisca dallo schermo
        const maxOffset = window.innerHeight * 0.8;
        translateX = Math.max(-maxOffset, Math.min(maxOffset, translateX));
        translateY = Math.max(-maxOffset, Math.min(maxOffset, translateY));

        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2.2)`;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            lightboxImg.style.transition = 'transform 0.15s ease-out';
            if (isZoomed) {
                lightboxImg.style.cursor = 'grab';
            }
        }
    });

    // Touch drag (Dispositivi Mobile)
    lightboxImg.addEventListener('touchstart', (e) => {
        if (!isZoomed) return;
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        lightboxImg.style.transition = 'none';
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging || !isZoomed) return;
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;

        const maxOffset = window.innerHeight * 0.8;
        translateX = Math.max(-maxOffset, Math.min(maxOffset, translateX));
        translateY = Math.max(-maxOffset, Math.min(maxOffset, translateY));

        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2.2)`;
    });

    window.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            lightboxImg.style.transition = 'transform 0.15s ease-out';
        }
    });
});
