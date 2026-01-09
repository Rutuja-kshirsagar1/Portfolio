// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
gsap.utils.toArray('.skill-category, .cert-card, .project-card').forEach(item => {
    gsap.fromTo(item, 
        { opacity: 0, y: 50 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Animate skill bars when skills section is in view
ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 70%',
    onEnter: animateSkillBars,
    once: true
}); 

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // FormSubmit will handle the submission, we just need basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all fields.');
    }
    // If validation passes, FormSubmit will handle the rest
});


// Storytelling animations
        gsap.utils.toArray('.story-section').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0 },
                { 
                    opacity: 1, 
                    duration: 1, 
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Timeline animations
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // internship section

document.addEventListener('DOMContentLoaded', function() {
            const scroller = document.getElementById('internshipScroller');
            const scrollLeftBtn = document.getElementById('scrollLeft');
            const scrollRightBtn = document.getElementById('scrollRight');
            const indicatorsContainer = document.getElementById('indicators');
            
            // Create indicators based on number of internship cards
            const cards = document.querySelectorAll('.internship-card');
            cards.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    scrollToCard(index);
                });
                indicatorsContainer.appendChild(indicator);
            });
            
            const indicators = document.querySelectorAll('.indicator');
            
            // Scroll to specific card
            function scrollToCard(index) {
                const card = cards[index];
                const scrollPosition = card.offsetLeft - scroller.offsetLeft;
                scroller.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
                updateIndicators(index);
            }
            
            // Update active indicator
            function updateIndicators(activeIndex) {
                indicators.forEach((indicator, index) => {
                    if (index === activeIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Scroll left button
            scrollLeftBtn.addEventListener('click', () => {
                scroller.scrollBy({
                    left: -scroller.offsetWidth * 0.8,
                    behavior: 'smooth'
                });
            });
            
            // Scroll right button
            scrollRightBtn.addEventListener('click', () => {
                scroller.scrollBy({
                    left: scroller.offsetWidth * 0.8,
                    behavior: 'smooth'
                });
            });
            
            // Update indicators on scroll
            scroller.addEventListener('scroll', () => {
                const scrollPosition = scroller.scrollLeft;
                let activeIndex = 0;
                let minDistance = Infinity;
                
                cards.forEach((card, index) => {
                    const cardPosition = card.offsetLeft - scroller.offsetLeft;
                    const distance = Math.abs(cardPosition - scrollPosition);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        activeIndex = index;
                    }
                });
                
                updateIndicators(activeIndex);
            });
            
        });
//project section 

 document.addEventListener('DOMContentLoaded', function() {
            const projectsViewport = document.getElementById('projectsViewport');
            const projectsScroller = document.getElementById('projectScroller');
            const projectsIndicatorsContainer = document.getElementById('projectsIndicators');
            
            const projectCards = document.querySelectorAll('.project-card');
            const cardWidth = projectCards[0].offsetWidth + 20; // width + margin
            const viewportWidth = projectsViewport.offsetWidth;
            const totalCards = projectCards.length;
            let currentPosition = 0;
            let maxPosition = Math.ceil((cardWidth * totalCards - viewportWidth) / cardWidth);
            let isDragging = false;
            let startPosition = 0;
            let currentTranslate = 0;
            let prevTranslate = 0;
            let animationID = 0;
            
            // Create indicators based on number of project pages
            for (let i = 0; i <= maxPosition; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    slideToPosition(i);
                });
                projectsIndicatorsContainer.appendChild(indicator);
            }
            
            const projectsIndicators = document.querySelectorAll('.indicator');
            
            // Slide to specific position
            function slideToPosition(position) {
                currentPosition = position;
                projectsScroller.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
                updateIndicators();
            }
            
            // Update active indicator
            function updateIndicators() {
                projectsIndicators.forEach((indicator, index) => {
                    if (index === currentPosition) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Mouse events for desktop
            projectsViewport.addEventListener('mousedown', dragStart);
            projectsViewport.addEventListener('mousemove', drag);
            projectsViewport.addEventListener('mouseup', dragEnd);
            projectsViewport.addEventListener('mouseleave', dragEnd);
            
            // Touch events for mobile
            projectsViewport.addEventListener('touchstart', dragStart);
            projectsViewport.addEventListener('touchmove', drag);
            projectsViewport.addEventListener('touchend', dragEnd);
            
            // Prevent context menu
            projectsViewport.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
            
            function dragStart(e) {
                if (e.type === 'touchstart') {
                    startPosition = e.touches[0].clientX;
                } else {
                    startPosition = e.clientX;
                    projectsViewport.style.cursor = 'grabbing';
                }
                
                isDragging = true;
                animationID = requestAnimationFrame(animation);
                projectsScroller.style.transition = 'none';
            }
            
            function drag(e) {
                if (!isDragging) return;
                
                let currentPositionX = 0;
                if (e.type === 'touchmove') {
                    currentPositionX = e.touches[0].clientX;
                } else {
                    currentPositionX = e.clientX;
                }
                
                const currentDrag = currentPositionX - startPosition;
                currentTranslate = prevTranslate + currentDrag;
            }
            
            function dragEnd() {
                isDragging = false;
                cancelAnimationFrame(animationID);
                projectsViewport.style.cursor = 'grab';
                
                const movedBy = currentTranslate - prevTranslate;
                
                if (movedBy < -100 && currentPosition < maxPosition) {
                    // Swipe left - go to next position
                    currentPosition += 1;
                } else if (movedBy > 100 && currentPosition > 0) {
                    // Swipe right - go to previous position
                    currentPosition -= 1;
                }
                
                slideToPosition(currentPosition);
                projectsScroller.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                prevTranslate = currentPosition * -cardWidth;
                currentTranslate = prevTranslate;
            }
            
            function animation() {
                projectsScroller.style.transform = `translateX(${currentTranslate}px)`;
                if (isDragging) {
                    requestAnimationFrame(animation);
                }
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
                const newViewportWidth = projectsViewport.offsetWidth;
                maxPosition = Math.ceil((cardWidth * totalCards - newViewportWidth) / cardWidth);
                
                // Recreate indicators
                projectsIndicatorsContainer.innerHTML = '';
                for (let i = 0; i <= maxPosition; i++) {
                    const indicator = document.createElement('div');
                    indicator.classList.add('indicator');
                    if (i === currentPosition) indicator.classList.add('active');
                    indicator.addEventListener('click', () => {
                        slideToPosition(i);
                    });
                    projectsIndicatorsContainer.appendChild(indicator);
                }
                
                // Adjust current position if it's now beyond max position
                if (currentPosition > maxPosition) {
                    currentPosition = maxPosition;
                }
                
                slideToPosition(currentPosition);
            });
            
            // Initialize
            updateIndicators();
        });

        //--
        // Certifications Section Horizontal Swipe
document.addEventListener('DOMContentLoaded', function() {
  const certificationsViewport = document.getElementById('certificationsViewport');
  const certificationsScroller = document.getElementById('certificationsScroller');
  const certificationsIndicatorsContainer = document.getElementById('certificationsIndicators');
  
  const certCards = document.querySelectorAll('.cert-card');
  const cardWidth = certCards[0].offsetWidth + 20; // width + margin
  const viewportWidth = certificationsViewport.offsetWidth;
  const totalCards = certCards.length;
  let currentPosition = 0;
  let maxPosition = Math.ceil((cardWidth * totalCards - viewportWidth) / cardWidth);
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  
  // Create indicators based on number of certification pages
  for (let i = 0; i <= maxPosition; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('cert-indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
      slideToPosition(i);
    });
    certificationsIndicatorsContainer.appendChild(indicator);
  }
  
  const certificationsIndicators = document.querySelectorAll('.cert-indicator');
  
  // Slide to specific position
  function slideToPosition(position) {
    currentPosition = position;
    certificationsScroller.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    updateIndicators();
  }
  
  // Update active indicator
  function updateIndicators() {
    certificationsIndicators.forEach((indicator, index) => {
      if (index === currentPosition) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Mouse events for desktop
  certificationsViewport.addEventListener('mousedown', dragStart);
  certificationsViewport.addEventListener('mousemove', drag);
  certificationsViewport.addEventListener('mouseup', dragEnd);
  certificationsViewport.addEventListener('mouseleave', dragEnd);
  
  // Touch events for mobile
  certificationsViewport.addEventListener('touchstart', dragStart);
  certificationsViewport.addEventListener('touchmove', drag);
  certificationsViewport.addEventListener('touchend', dragEnd);
  
  // Prevent context menu
  certificationsViewport.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  function dragStart(e) {
    if (e.type === 'touchstart') {
      startPosition = e.touches[0].clientX;
    } else {
      startPosition = e.clientX;
      certificationsViewport.style.cursor = 'grabbing';
    }
    
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    certificationsScroller.style.transition = 'none';
  }
  
  function drag(e) {
    if (!isDragging) return;
    
    let currentPositionX = 0;
    if (e.type === 'touchmove') {
      currentPositionX = e.touches[0].clientX;
    } else {
      currentPositionX = e.clientX;
    }
    
    const currentDrag = currentPositionX - startPosition;
    currentTranslate = prevTranslate + currentDrag;
  }
  
  function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    certificationsViewport.style.cursor = 'grab';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -100 && currentPosition < maxPosition) {
      // Swipe left - go to next position
      currentPosition += 1;
    } else if (movedBy > 100 && currentPosition > 0) {
      // Swipe right - go to previous position
      currentPosition -= 1;
    }
    
    slideToPosition(currentPosition);
    certificationsScroller.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    prevTranslate = currentPosition * -cardWidth;
    currentTranslate = prevTranslate;
  }
  
  function animation() {
    certificationsScroller.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newViewportWidth = certificationsViewport.offsetWidth;
    maxPosition = Math.ceil((cardWidth * totalCards - newViewportWidth) / cardWidth);
    
    // Recreate indicators
    certificationsIndicatorsContainer.innerHTML = '';
    for (let i = 0; i <= maxPosition; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('cert-indicator');
      if (i === currentPosition) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        slideToPosition(i);
      });
      certificationsIndicatorsContainer.appendChild(indicator);
    }
    
    // Adjust current position if it's now beyond max position
    if (currentPosition > maxPosition) {
      currentPosition = maxPosition;
    }
    
    slideToPosition(currentPosition);
  });
  
  // project and certificaion swipe suggestion js 
  updateIndicators();
});

const swipeHint = document.querySelector('.swipe-hint');
let hasSwiped = false;

document.addEventListener('touchstart', function(e) {
    hasSwiped = true;
    if (hasSwiped) {
        swipeHint.style.display = 'none';
    }
});
// cv button
// Show/hide floating button based on scroll position
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const body = document.body;
    const heroSection = document.getElementById('hero');
    
    if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY > heroBottom - 100) {
            header.classList.add('scrolled');
            body.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            body.classList.remove('scrolled');
        }
    }
});



// academic section
// Animate academic scores when section is in view
gsap.utils.toArray('.summary-value').forEach(item => {
    gsap.fromTo(item, 
        { innerText: 0 },
        { 
            innerText: item.textContent,
            duration: 2,
            snap: { innerText: 0.1 },
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Animate table rows on scroll
gsap.utils.toArray('.table-row').forEach((row, i) => {
    gsap.fromTo(row, 
        { opacity: 0, x: -50 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            delay: i * 0.1,
            scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});