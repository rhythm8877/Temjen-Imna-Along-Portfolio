// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize navbar functionality
  initNavbar();

  // Typewriter effect for two lines
  const typewriterLine1 = document.getElementById("typewriter-line1")
  const typewriterLine2 = document.getElementById("typewriter-line2")
  const line1Text = typewriterLine1.textContent
  const line2Text = typewriterLine2.textContent
  
  typewriterLine1.textContent = ""
  typewriterLine2.textContent = ""
  
  // Type first line, then second line
  let i = 0
  function typeWriterLine1() {
    if (i < line1Text.length) {
      typewriterLine1.textContent += line1Text.charAt(i)
      i++
      setTimeout(typeWriterLine1, 100)
    } else {
      // Start typing second line after first line is complete
      i = 0
      setTimeout(typeWriterLine2, 500) // Small pause before starting second line
    }
  }
  
  function typeWriterLine2() {
    if (i < line2Text.length) {
      typewriterLine2.textContent += line2Text.charAt(i)
      i++
      setTimeout(typeWriterLine2, 100)
    }
  }
  
  typeWriterLine1()

  // Scroll arrow functionality
  const scrollArrow = document.querySelector(".scroll-arrow")
  scrollArrow.addEventListener("click", () => {
    window.scrollTo({
      top: document.getElementById("about").offsetTop,
      behavior: "smooth",
    })
  })

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Only add the active class when the element comes into view
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
        // Once the animation is triggered, no need to observe anymore
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Wait a bit before setting up the observers to ensure animations won't trigger immediately on page load
  setTimeout(() => {
    // Observe all elements with reveal classes and section animations
    document.querySelectorAll(".reveal-left, .reveal-right, .timeline-content, .section-animate").forEach((el) => {
      observer.observe(el)
    })
  }, 500) // Small delay to ensure page is fully loaded

  // Quote carousel functionality
  let currentQuote = 0
  const quotes = document.querySelectorAll(".quote")
  const dots = document.querySelectorAll(".quote-dot")
  const quoteInterval = 5000 // 5 seconds

  function showQuote(index) {
    // Hide all quotes
    quotes.forEach((quote) => {
      quote.classList.remove("active")
    })

    // Hide all active dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected quote and dot
    quotes[index].classList.add("active")
    dots[index].classList.add("active")

    // Update current quote index
    currentQuote = index
  }

  // Auto-rotate quotes
  let quoteTimer = setInterval(() => {
    const nextQuote = (currentQuote + 1) % quotes.length
    showQuote(nextQuote)
  }, quoteInterval)

  // Click on dots to change quote
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(quoteTimer)
      showQuote(index)

      // Restart the timer
      quoteTimer = setInterval(() => {
        const nextQuote = (currentQuote + 1) % quotes.length
        showQuote(nextQuote)
      }, quoteInterval)
    })
  })

  // Card flip functionality
  window.flipCard = (card) => {
    card.classList.toggle("flipped")
  }

  // Gallery filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Show/hide gallery items based on filter
      galleryItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Social media button animations
  const socialButtons = document.querySelectorAll(".social-btn")

  socialButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const icon = button.querySelector("i")
      icon.style.animation = "bounce 0.5s ease"

      setTimeout(() => {
        icon.style.animation = ""
      }, 500)
    })
  })
})

// Initialize navbar functionality
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  // Toggle mobile menu
  navbarToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
  
  // Handle navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Active link handling
  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
      
      // Remove active class from all links
      navbarLinks.forEach(item => {
        item.classList.remove('active');
      });
      
      // Add active class to current link
      this.classList.add('active');
    });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, header.hero');
    const scrollPosition = window.pageYOffset + window.innerHeight * 0.3;
    const bottomOfPage = document.body.scrollHeight - window.innerHeight - 50;
    
    // Check if user has scrolled to bottom of page
    if (window.pageYOffset >= bottomOfPage) {
      current = 'connect'; // Force connect to be active near the bottom
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= (sectionTop + sectionHeight)) {
          current = section.getAttribute('id');
        }
      });
    }
    
    navbarLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

