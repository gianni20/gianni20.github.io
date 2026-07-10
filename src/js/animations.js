// Loader Fade Out
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 400);
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animazione eseguita una sola volta
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Typewriter Effect
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan) {
        const roles = [
            "Sviluppatore Software",
            "Web Developer",
            "App Developer",
            "Linux Enthusiast",
            "Home Lab Builder"
        ];
        const typingSpeed = 100;
        const erasingSpeed = 50;
        const newWordDelay = 2000; // Delay between words
        
        let roleIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < roles[roleIndex].length) {
                typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, newWordDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, typingSpeed + 50);
            }
        }
        
        // Inizia l'animazione dopo il caricamento
        setTimeout(type, 1000);
    }

    // 3. Project Cards Spotlight Spotlight Glow Mouse Effect
    const projectCards = document.querySelectorAll('.progetto-card');
    projectCards.forEach(card => {
        const cardColor = card.getAttribute('data-color') || '#6366f1';
        card.style.setProperty('--card-color', cardColor);

        // Aggiungi un punto luce al movimento del mouse
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Coordinata X all'interno della card
            const y = e.clientY - rect.top;  // Coordinata Y all'interno della card
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. Slow slideshow profile image carousel
    const profileImages = document.querySelectorAll('.profile-img-carousel .profile-img');
    if (profileImages.length > 1) {
        let currentImgIndex = 0;
        const imgChangeInterval = 5000; // Alterna l'immagine ogni 5 secondi
        
        function changeProfileImage() {
            profileImages[currentImgIndex].classList.remove('active');
            currentImgIndex = (currentImgIndex + 1) % profileImages.length;
            profileImages[currentImgIndex].classList.add('active');
        }
        
        setInterval(changeProfileImage, imgChangeInterval);
    }
});