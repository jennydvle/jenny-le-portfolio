// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const topOffset = 100;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - topOffset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// ===== Scroll Spy: top nav highlight =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.top-nav .nav-link');

function updateNavigation() {
    const scrollPos = window.scrollY + 140;

    let currentSection = 'home';
    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === currentSection);
    });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

// ===== Scroll Reveal Animations =====
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('load', checkReveal);
checkReveal();

// ===== Navbar background on scroll =====
const topNav = document.getElementById('topNav');

function updateNavStyle() {
    if (window.scrollY > 50) {
        topNav.style.background = 'rgba(255, 254, 250, 0.92)';
        topNav.style.boxShadow = '0 2px 20px rgba(140, 120, 180, 0.08)';
    } else {
        topNav.style.background = 'rgba(255, 254, 250, 0.8)';
        topNav.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', updateNavStyle, { passive: true });
updateNavStyle();

// ===== Floating "Back to Projects" button =====
const floatingBtn = document.createElement('a');
floatingBtn.id = 'floatingBack';
floatingBtn.className = 'floating-back';
floatingBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg><span></span>';
document.body.appendChild(floatingBtn);

const floatingLabel = floatingBtn.querySelector('span');

floatingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(floatingBtn.getAttribute('href'));
    if (target) {
        const targetPos = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
});

function updateFloatingBtn() {
    const scrollPos = window.scrollY + 200;

    const academicSection = document.getElementById('academic');
    const industrySection = document.getElementById('industry');
    const academicNav = document.getElementById('academic-nav');
    const industryNav = document.getElementById('industry-nav');

    const inAcademic = academicSection && scrollPos >= academicSection.offsetTop && scrollPos < (industrySection ? industrySection.offsetTop : Infinity);
    const inIndustry = industrySection && scrollPos >= industrySection.offsetTop && scrollPos < industrySection.offsetTop + industrySection.offsetHeight;

    // Only show when scrolled past the nav cards
    const pastAcademicNav = academicNav && scrollPos > academicNav.offsetTop + academicNav.offsetHeight + 100;
    const pastIndustryNav = industryNav && scrollPos > industryNav.offsetTop + industryNav.offsetHeight + 100;

    if (inAcademic && pastAcademicNav) {
        floatingBtn.href = '#academic';
        floatingLabel.textContent = 'All Academic Projects';
        floatingBtn.classList.add('visible');
    } else if (inIndustry && pastIndustryNav) {
        floatingBtn.href = '#industry';
        floatingLabel.textContent = 'All Industry Projects';
        floatingBtn.classList.add('visible');
    } else {
        floatingBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateFloatingBtn, { passive: true });
updateFloatingBtn();

// ===== Image Fullscreen Modal =====
const imgModal = document.getElementById('imgModal');
const imgModalImg = document.getElementById('imgModalImg');
const imgModalClose = document.getElementById('imgModalClose');

document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('click', () => {
        imgModalImg.src = img.src;
        imgModalImg.alt = img.alt;
        imgModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

imgModalClose.addEventListener('click', () => {
    imgModal.classList.remove('open');
    imgModalImg.src = '';
    document.body.style.overflow = '';
});

imgModal.addEventListener('click', (e) => {
    if (e.target === imgModal) {
        imgModal.classList.remove('open');
        imgModalImg.src = '';
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imgModal.classList.contains('open')) {
        imgModal.classList.remove('open');
        imgModalImg.src = '';
        document.body.style.overflow = '';
    }
});

// ===== PDF Fullscreen Modal =====
const pdfModal = document.getElementById('pdfModal');
const pdfModalFrame = document.getElementById('pdfModalFrame');
const pdfModalClose = document.getElementById('pdfModalClose');

document.querySelectorAll('.pdf-fullscreen-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const isPoster = btn.closest('.pdf-embed').classList.contains('pdf-poster');
        const pdfSrc = btn.dataset.pdf + '#toolbar=0&navpanes=0' + (isPoster ? '&view=FitH' : '');
        pdfModalFrame.src = pdfSrc;
        pdfModal.classList.toggle('poster-mode', isPoster);
        pdfModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

pdfModalClose.addEventListener('click', () => {
    pdfModal.classList.remove('open');
    pdfModalFrame.src = '';
    document.body.style.overflow = '';
});

pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
        pdfModal.classList.remove('open');
        pdfModalFrame.src = '';
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.classList.contains('open')) {
        pdfModal.classList.remove('open');
        pdfModalFrame.src = '';
        document.body.style.overflow = '';
    }
});

// ===== Disable right-click on PDF embeds =====
document.querySelectorAll('.pdf-embed, .doc-pdf-embed').forEach(embed => {
    embed.addEventListener('contextmenu', (e) => e.preventDefault());
});
