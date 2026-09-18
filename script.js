/* ==========================================================
   ISMAIL PORTFOLIO
   MAIN JAVASCRIPT FILE
========================================================== */


/* ==========================================================
   01. GET WEBSITE ELEMENTS
========================================================== */

const header = document.getElementById("header");

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const cursorGlow = document.querySelector(".cursor-glow");



/* ==========================================================
   02. HEADER BACKGROUND AFTER SCROLLING
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* ==========================================================
   03. MOBILE MENU
========================================================== */

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    navMenu.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});



/* ==========================================================
   04. CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");

        navMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});



/* ==========================================================
   05. SCROLL REVEAL ANIMATION

   Elements with:
   class="reveal"

   automatically animate when entering the screen.
========================================================== */

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {

        threshold: 0.12

    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* ==========================================================
   06. ACTIVE NAVIGATION LINK

   Changes active menu item depending on
   which section is visible.
========================================================== */

const pageSections =
    document.querySelectorAll("section[id]");


function updateNavigation() {

    const scrollPosition =
        window.scrollY + 200;


    pageSections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (

            scrollPosition >= sectionTop &&

            scrollPosition <
            sectionTop + sectionHeight

        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);



/* ==========================================================
   07. STAT NUMBER COUNTER
========================================================== */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {

                    return;

                }


                const counter =
                    entry.target;


                const target =
                    Number(
                        counter.dataset.target
                    );


                let number = 0;


                const speed =
                    Math.max(
                        40,
                        700 / target
                    );


                const countInterval =
                    setInterval(() => {

                        number++;

                        counter.textContent =
                            number;


                        if (number >= target) {

                            counter.textContent =
                                target;

                            clearInterval(
                                countInterval
                            );

                        }

                    }, speed);


                counterObserver.unobserve(
                    counter
                );

            });

        },

        {

            threshold: 0.6

        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* ==========================================================
   08. CURSOR FOLLOW EFFECT

   Desktop only.
========================================================== */

document.addEventListener(
    "mousemove",
    event => {

        if (!cursorGlow) return;


        cursorGlow.style.left =
            event.clientX + "px";


        cursorGlow.style.top =
            event.clientY + "px";

    }
);



/* ==========================================================
   09. PROJECT IMAGE PARALLAX EFFECT
========================================================== */

const projectImages =
    document.querySelectorAll(".project-image");


projectImages.forEach(project => {

    project.addEventListener(
        "mousemove",
        event => {

            /*
            Only use this effect on larger screens.
            */

            if (
                window.innerWidth <= 768
            ) {

                return;

            }


            const rect =
                project.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const moveX =
                (x / rect.width - 0.5) * 8;


            const moveY =
                (y / rect.height - 0.5) * 8;


            project.style.transform =
                `perspective(1200px)
                 rotateY(${moveX}deg)
                 rotateX(${-moveY}deg)`;

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            project.style.transform =
                "perspective(1200px) rotateY(0) rotateX(0)";

        }
    );

});



/* ==========================================================
   10. AUTOMATIC COPYRIGHT YEAR

   No need to manually update the year.
========================================================== */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* ==========================================================
   11. SMOOTH INTERNAL LINK SCROLL
========================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const destination =
                link.getAttribute("href");


            if (
                destination === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    destination
                );


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    );

});