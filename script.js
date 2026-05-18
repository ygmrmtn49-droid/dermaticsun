/* SCROLL ANIMATION */

const hiddenElements = document.querySelectorAll(
    ".step-card, .card, .usage-card, .product-showcase, .intro, .section-title"
);

hiddenElements.forEach((el) => {
    el.classList.add("hidden");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((el) => {
    observer.observe(el);
});


/* NAVBAR SCROLL */

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if(!navbar) return;

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});


/* HERO PARALLAX - SADECE MASAÜSTÜ */

const hero = document.querySelector(".hero");

if(hero && window.innerWidth > 900){

    document.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;

    });

}


/* PARTNER SLIDER */

/* PARTNER SLIDER */

const partnerTrack = document.querySelector(".partner-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const wrapper = document.querySelector(".partner-track-wrapper");

let currentSlide = 0;
let autoSlide;

if(partnerTrack && nextBtn && prevBtn && wrapper && window.innerWidth > 900){

    const cards = document.querySelectorAll(".partner-card");

    function getGap(){
        const style = window.getComputedStyle(partnerTrack);
        return parseInt(style.gap) || 0;
    }

    function getStep(){
        return cards[0].offsetWidth + getGap();
    }

    function getVisibleCards(){
        return Math.max(1, Math.floor(wrapper.offsetWidth / getStep()));
    }

    function getMaxSlide(){
        return Math.max(cards.length - getVisibleCards(), 0);
    }

    function updateSlider(){
        partnerTrack.style.transform = `translateX(-${currentSlide * getStep()}px)`;
    }

    function goNext(){
        const maxSlide = getMaxSlide();
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateSlider();
    }

    function goPrev(){
        const maxSlide = getMaxSlide();
        currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
        updateSlider();
    }

    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);

    autoSlide = setInterval(goNext, 3500);
}

    function stopAutoSlide(){
        clearInterval(autoSlide);
    }

    if(slider){
        slider.addEventListener("mouseenter", stopAutoSlide);
        slider.addEventListener("mouseleave", startAutoSlide);
    }

    window.addEventListener("resize", () => {
        currentSlide = 0;
        updateSlider();
    });

    updateSlider();
    startAutoSlide();
}


/* LOADER */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if(!loader) return;

    setTimeout(() => {
        loader.classList.add("hide");
    }, 900);
});


/* SCROLL PROGRESS */

window.addEventListener("scroll", () => {
    const progressBar = document.querySelector(".progress-bar");

    if(!progressBar) return;

    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";
});