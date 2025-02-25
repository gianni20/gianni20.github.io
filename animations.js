window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    // Animazione per il profilo
    const profile = document.querySelector('.profile-container');
    profile.style.opacity = '0';
    profile.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        profile.style.transition = 'all 0.8s ease';
        profile.style.opacity = '1';
        profile.style.transform = 'translateY(0)';
    }, 300);

    // Animazione per le card dei progetti
    const cards = document.querySelectorAll('.progetto-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
});

// Animazione delle skill bars al scroll
const animateSkills = () => {
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
};

document.addEventListener('DOMContentLoaded', animateSkills);