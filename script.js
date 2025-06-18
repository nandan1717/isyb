let lastScrollTop = 0;
const nav = document.querySelector('nav');

// Navbar Hide/Show on Scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (nav) {
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling down — hide navbar
            nav.style.transform = 'translateY(-100%)';
            nav.style.transition = 'transform 0.3s ease-in-out';
        } else {
            // Scrolling up — show navbar
            nav.style.transform = 'translateY(0)';
            nav.style.transition = 'transform 0.3s ease-in-out';
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Loading Screen
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && mobileMenu && mobileOverlay) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');

            // Toggle hamburger/close icon
            const icon = this.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
                } else {
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>';
                }
            }
        });

        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', function () {
            closeMobileMenu();
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMobileMenu();
            });
        });

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>';
            }
        }
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links starting with #
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Tab Functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Scroll Animation
function initializeScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    if (successMessage) {
                        successMessage.classList.add('show');
                    }
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    if (successMessage) {
                        setTimeout(() => {
                            successMessage.classList.remove('show');
                        }, 5000);
                    }
                }, 2000);
            }
        });
    }
}

// Active Navigation on Scroll
function initializeActiveNavigation() {
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Projects Filter Functionality
function initializeProjectsFilter() {
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const resultsInfo = document.getElementById('resultsInfo');

    if (projectCards.length > 0 && searchInput && categorySelect) {
        // Function to filter projects
        function filterProjects() {
            const selectedCategory = categorySelect.value.toLowerCase();
            const searchQuery = searchInput.value.toLowerCase().trim();

            let visibleCount = 0;
            let totalCount = projectCards.length;

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category').toLowerCase();
                const cardTitle = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
                const cardSummary = card.querySelector('.project-summary')?.textContent.toLowerCase() || '';
                const cardTag = card.querySelector('.category-tag')?.textContent.toLowerCase() || '';

                // Check if card matches category filter
                const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

                // Check if card matches search query
                const matchesSearch = searchQuery === '' ||
                    cardTitle.includes(searchQuery) ||
                    cardSummary.includes(searchQuery) ||
                    cardTag.includes(searchQuery) ||
                    cardCategory.includes(searchQuery);

                // Show/hide card based on filters
                if (matchesCategory && matchesSearch) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            // Update results info
            updateResultsInfo(visibleCount, totalCount, selectedCategory, searchQuery);
        }

        // Function to update results information
        function updateResultsInfo(visible, total, category, search) {
            if (!resultsInfo) return;

            let message = '';

            if (visible === 0) {
                message = 'No projects found';
                if (search) {
                    message += ` for "${search}"`;
                }
                if (category !== 'all') {
                    message += ` in ${category} category`;
                }

                // Show no results message
                const projectsGrid = document.getElementById('projectsGrid');
                if (projectsGrid && !document.querySelector('.no-results')) {
                    const noResults = document.createElement('div');
                    noResults.className = 'no-results';
                    noResults.innerHTML = `
                        <h3>No Results Found</h3>
                        <p>Try adjusting your search terms or selecting a different category.</p>
                    `;
                    projectsGrid.appendChild(noResults);
                }
            } else {
                // Remove no results message if it exists
                const noResults = document.querySelector('.no-results');
                if (noResults) {
                    noResults.remove();
                }

                message = `Showing ${visible} of ${total} projects`;
                if (category !== 'all') {
                    message += ` in ${category} category`;
                }
                if (search) {
                    message += ` matching "${search}"`;
                }
            }

            resultsInfo.textContent = message;
        }

        // Add event listeners
        searchInput.addEventListener('input', filterProjects);
        categorySelect.addEventListener('change', filterProjects);

        // Initialize the filter on page load
        filterProjects();

        // Add focus/blur effects to search input
        searchInput.addEventListener('focus', function () {
            this.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
        });

        searchInput.addEventListener('blur', function () {
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            // Focus search input when pressing '/' key
            if (e.key === '/' && e.target !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }

            // Clear search when pressing 'Escape'
            if (e.key === 'Escape' && e.target === searchInput) {
                searchInput.value = '';
                filterProjects();
            }
        });
    }
}

// Stats Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');

        let currentValue = 0;
        const increment = Math.ceil(numericValue / 30);

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            stat.textContent = currentValue + suffix;
        }, 50 + (index * 20));
    });
}

// Preload Images
function preloadImages() {
    const images = [
        // Add your actual image URLs here if needed
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Service Cards Hover Effects
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project Cards Hover Effects
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to see more buttons
    document.querySelectorAll('.see-more-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });
}

// Performance optimization for scroll events
let ticking = false;
function updateScrollPosition() {
    // Handle scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeTabs();
    initializeScrollAnimation();
    initializeScrollToTop();
    initializeContactForm();
    initializeActiveNavigation();
    initializeProjectsFilter();
    initializeServiceCards();
    initializeProjectCards();
    preloadImages();
});

// Initialize stats animation when page loads
window.addEventListener('load', function() {
    animateStats();
});
// Add this to the end of your existing script.js
// This will only initialize features if the required elements exist

document.addEventListener('DOMContentLoaded', function () {
    // Check for each feature and only initialize if elements exist
    
    // Mobile Menu - only if elements exist
    if (document.getElementById('mobile-menu-btn') && 
        document.getElementById('mobile-menu') && 
        document.getElementById('mobile-overlay')) {
        initializeMobileMenu();
    }
    
    // Smooth Scrolling - only if nav links exist
    if (document.querySelectorAll('.nav-link').length > 0) {
        initializeSmoothScrolling();
        initializeActiveNavigation();
    }
    
    // Tabs - only if tab elements exist
    if (document.querySelectorAll('.tab-btn').length > 0 && 
        document.querySelectorAll('.tab-content').length > 0) {
        initializeTabs();
    }
    
    // Scroll Animation - only if elements to animate exist
    if (document.querySelectorAll('.animate-on-scroll').length > 0) {
        initializeScrollAnimation();
    }
    
    // Scroll to Top - only if button exists
    if (document.getElementById('scroll-top')) {
        initializeScrollToTop();
    }
    
    // Contact Form - only if form exists
    if (document.getElementById('contact-form')) {
        initializeContactForm();
    }
    
    // Projects Filter - only if filter elements exist
    if (document.getElementById('searchInput') && 
        document.getElementById('categorySelect') && 
        document.querySelectorAll('.project-card').length > 0) {
        initializeProjectsFilter();
    }
    
    // Service Cards - only if they exist
    if (document.querySelectorAll('.service-card').length > 0) {
        initializeServiceCards();
    }
    
    // Project Cards - only if they exist
    if (document.querySelectorAll('.project-card').length > 0) {
        initializeProjectCards();
    }
    
    // Always initialize these as they don't require specific elements
    preloadImages();
});

// Stats animation - only if stat numbers exist
window.addEventListener('load', function() {
    if (document.querySelectorAll('.stat-number').length > 0) {
        animateStats();
    }
});
 class ProjectCarousel {
            constructor(container) {
                this.container = container;
                this.track = container.querySelector('.carousel-track');
                this.slides = container.querySelectorAll('.carousel-slide');
                this.prevBtn = container.querySelector('.carousel-prev');
                this.nextBtn = container.querySelector('.carousel-next');
                this.dots = container.querySelectorAll('.carousel-dot');
                
                this.currentSlide = 0;
                this.totalSlides = this.slides.length;
                
                this.init();
            }
            
            init() {
                // Add event listeners
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                
                // Add dot navigation
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });
                
                // Auto-advance carousel (optional)
                this.startAutoplay();
                
                // Pause autoplay on hover
                this.container.addEventListener('mouseenter', () => this.stopAutoplay());
                this.container.addEventListener('mouseleave', () => this.startAutoplay());
            }
            
            updateCarousel() {
                const translateX = -this.currentSlide * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
                // Update dots
                this.dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
            }
            
            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
            }
            
            goToSlide(index) {
                this.currentSlide = index;
                this.updateCarousel();
            }
            
            startAutoplay() {
                this.autoplayInterval = setInterval(() => {
                    this.nextSlide();
                }, 4000); // Change slide every 4 seconds
            }
            
            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                }
            }
        }
        
        // Initialize all carousels when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const carouselContainers = document.querySelectorAll('.carousel-container');
            carouselContainers.forEach(container => {
                new ProjectCarousel(container);
            });
        });
        
        // Add smooth scrolling and entrance animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all project cards for animation
        document.addEventListener('DOMContentLoaded', () => {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        });