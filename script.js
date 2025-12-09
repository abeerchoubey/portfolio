document.addEventListener("DOMContentLoaded", () => {
    
    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight lag (animation handled via CSS transition or JS)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add visual reaction when clicking
    window.addEventListener("mousedown", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    window.addEventListener("mouseup", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
    });


    // --- Scroll Animations (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));


    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Glitch Text Effect (Simple Randomizer) ---
    const glitchText = document.querySelector('.glitch');
    const originalText = glitchText.getAttribute('data-text');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    let interval = null;

    // Trigger glitch on hover (optional interaction)
    glitchText.onmouseover = event => {  
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= originalText.length){ 
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
    
    // Trigger once on load for effect
    setTimeout(() => {
        const event = new Event('mouseover');
        glitchText.dispatchEvent(event);
    }, 1000);

});
