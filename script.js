// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initConfetti();
    initMusicToggle();
    initEnterButton();
    initScrollAnimations();
    initLetterTyping();
    initGalleryAnimations();
    initSurpriseSection();
});

// ===================================
// FLOATING PARTICLES
// ===================================
function initParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particles = ['💜', '✨', '⭐', '💫', '🌟', '💝', '🎀', '🦋'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 10000);
    }, 800);
}

// ===================================
// CONFETTI ANIMATION
// ===================================
function initConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#A56CFF', '#C39CFF', '#E5D4FF', '#6D35FF', '#FF6BCB', '#FFD93D'];
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    // Create continuous confetti
    setInterval(createConfetti, 200);
}

// ===================================
// MUSIC TOGGLE
// ===================================
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<span class="music-icon">🎵</span>';
        } else {
            bgMusic.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
        }
        isPlaying = !isPlaying;
    });
}

// ===================================
// ENTER BUTTON - REVEAL MAIN CONTENT
// ===================================
function initEnterButton() {
    const enterBtn = document.getElementById('enterBtn');
    const heroSection = document.getElementById('hero');
    const mainContent = document.getElementById('mainContent');
    
    enterBtn.addEventListener('click', () => {
        // Create burst effect
        createConfettiBurst();
        
        // Hide hero section with fade out
        heroSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            heroSection.style.display = 'none';
            mainContent.classList.add('active');
            
            // Scroll to about section
            setTimeout(() => {
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }, 1000);
    });
}

// ===================================
// CONFETTI BURST
// ===================================
function createConfettiBurst() {
    const colors = ['#A56CFF', '#C39CFF', '#E5D4FF', '#6D35FF', '#FF6BCB', '#FFD93D'];
    const confettiContainer = document.getElementById('confettiContainer');
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = (50 + (Math.random() - 0.5) * 30) + '%';
            confetti.style.top = '50%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger letter typing when letter section is visible
                if (entry.target.classList.contains('letter-card')) {
                    startLetterTyping();
                }
                
                // Trigger gallery animations
                if (entry.target.classList.contains('gallery-section')) {
                    animateGalleryItems();
                }
                
                // Trigger surprise animations
                if (entry.target.classList.contains('surprise-section')) {
                    createFireworks();
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.section-title, .about-card, .letter-card, .gallery-section, .surprise-section').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// LETTER TYPING ANIMATION
// ===================================
let letterTypingStarted = false;

function initLetterTyping() {
    // This will be triggered by scroll observer
}

function startLetterTyping() {
    if (letterTypingStarted) return;
    letterTypingStarted = true;
    
    const letterTexts = document.querySelectorAll('.letter-text, .letter-signature');
    
    letterTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('typed');
        }, index * 400);
    });
}

// ===================================
// GALLERY ANIMATIONS & MODAL
// ===================================
let currentGalleryIndex = 0;
let galleryItems = [];

function initGalleryAnimations() {
    galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(index);
        });
    });
    
    // Modal controls
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalPrev').addEventListener('click', () => navigateModal(-1));
    document.getElementById('modalNext').addEventListener('click', () => navigateModal(1));
    
    // Close modal on background click
    document.getElementById('galleryModal').addEventListener('click', (e) => {
        if (e.target.id === 'galleryModal') {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('galleryModal');
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }
    });
}

function animateGalleryItems() {
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
    });
}

function openModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('galleryModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    displayModalContent();
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause any playing video
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.pause();
}

function navigateModal(direction) {
    currentGalleryIndex += direction;
    
    // Loop around
    if (currentGalleryIndex < 0) {
        currentGalleryIndex = galleryItems.length - 1;
    } else if (currentGalleryIndex >= galleryItems.length) {
        currentGalleryIndex = 0;
    }
    
    displayModalContent();
}

function displayModalContent() {
    const item = galleryItems[currentGalleryIndex];
    const type = item.getAttribute('data-type');
    const src = item.getAttribute('data-src');
    
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalCaption = document.getElementById('modalCaption');
    
    // Hide both initially
    modalImage.classList.remove('active');
    modalVideo.classList.remove('active');
    modalVideo.pause();
    
    if (type === 'image') {
        modalImage.src = src;
        modalImage.classList.add('active');
    } else if (type === 'video') {
        modalVideo.querySelector('source').src = src;
        modalVideo.load();
        modalVideo.classList.add('active');
        modalVideo.play();
    }
    
    // Hide caption
    modalCaption.textContent = '';
}

// ===================================
// SURPRISE SECTION - FIREWORKS
// ===================================
function initSurpriseSection() {
    // Fireworks will be created when section is visible
}

function createFireworks() {
    const fireworksContainer = document.getElementById('fireworksContainer');
    const colors = ['#A56CFF', '#C39CFF', '#E5D4FF', '#6D35FF', '#FF6BCB', '#FFD93D', '#FFF'];
    
    function launchFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.5);
        
        // Create explosion particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            fireworksContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    }
    
    // Launch fireworks continuously
    launchFirework();
    setInterval(launchFirework, 1000);
}

// ===================================
// SMOOTH SCROLLING FOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// PARALLAX EFFECT ON SCROLL
// ===================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollY * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
    
    lastScrollY = scrollY;
});

// ===================================
// PREVENT IMAGE DRAG (OPTIONAL)
// ===================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// ===================================
// ADD LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// EASTER EGG - KEYBOARD SHORTCUT
// ===================================
let keySequence = [];
const secretCode = ['h', 'a', 'p', 'p', 'y'];

document.addEventListener('keydown', (e) => {
    keySequence.push(e.key.toLowerCase());
    keySequence = keySequence.slice(-secretCode.length);
    
    if (keySequence.join('') === secretCode.join('')) {
        createMegaConfettiBurst();
    }
});

function createMegaConfettiBurst() {
    const colors = ['#A56CFF', '#C39CFF', '#E5D4FF', '#6D35FF', '#FF6BCB', '#FFD93D'];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '0';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 10);
    }
}
