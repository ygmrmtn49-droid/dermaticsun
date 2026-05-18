const hiddenElements = document.querySelectorAll(
    ".step-card, .card, .usage-card, .product-showcase, .intro, .section-title"
);

hiddenElements.forEach((el)=>{
    el.classList.add("hidden");
});

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

hiddenElements.forEach((el)=>{
    observer.observe(el);
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});

const hero = document.querySelector(".hero");

document.addEventListener("mousemove", (e)=>{

    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;

    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;

});

const partnerTrack = document.querySelector(".partner-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

if(partnerTrack && nextBtn && prevBtn){

    const cards = document.querySelectorAll(".partner-card");

    function getStep(){
    return document.querySelector(".partner-track-wrapper").offsetWidth;
}

    function getMaxSlide(){
        const wrapper = document.querySelector(".partner-track-wrapper");
        const visibleCards = Math.floor(wrapper.offsetWidth / getStep());
        return Math.max(cards.length - visibleCards, 0);
    }

    function updateSlider(){
        partnerTrack.style.transform = `translateX(-${currentSlide * getStep()}px)`;
    }

    nextBtn.addEventListener("click", () => {
        const maxSlide = getMaxSlide();

        if(currentSlide >= maxSlide){
            currentSlide = 0;
        }else{
            currentSlide++;
        }

        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        const maxSlide = getMaxSlide();

        if(currentSlide <= 0){
            currentSlide = maxSlide;
        }else{
            currentSlide--;
        }

        updateSlider();
    });

    window.addEventListener("resize", () => {
        currentSlide = 0;
        updateSlider();
    });
}

let autoSlide = setInterval(() => {

    const maxSlide = getMaxSlide();

    if(currentSlide >= maxSlide){
        currentSlide = 0;
    }else{
        currentSlide++;
    }

    updateSlider();

}, 1500);


/* HOVER'DA DURDUR */

const slider = document.querySelector(".partner-slider");

slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});


slider.addEventListener("mouseleave", () => {

    autoSlide = setInterval(() => {

        const maxSlide = getMaxSlide();

        if(currentSlide >= maxSlide){
            currentSlide = 0;
        }else{
            currentSlide++;
        }

        updateSlider();

    }, 3500);

});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 900);
});

window.addEventListener("scroll", () => {
    const progressBar = document.querySelector(".progress-bar");

    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";
});