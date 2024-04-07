// ----------------------
// Glow Hover Effect :
// ----------------------

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
    try {
        const overlayEl = e.currentTarget;
        const x = e.pageX - cardsContainer.offsetLeft;
        const y = e.pageY - cardsContainer.offsetTop;
        overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
    } catch {}
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);

document.body.addEventListener("pointermove", applyOverlayMask);

// ----------------------
// Encrypted Content :
// ----------------------

const letters = "AbCdEfGhIjKlMnOpQrSuTuVwXyZ";
const animTexts = document.querySelectorAll(".animated-text");

function scrambleText(element, finalText, intervalTime) {
    let iteration = 0;
    const textLength = finalText.length;

    const interval = setInterval(() => {
        element.innerText = finalText
            .split("")
            .map((char, index) => index < iteration ? finalText[index] : letters[Math.floor(Math.random() * letters.length)])
            .join("");
        iteration += 0.5;

        if (iteration >= textLength) clearInterval(interval);
    }, intervalTime);
}

function initTextScramble(target, intervalTime = 2) {
    const initText = target.innerText;
    const finalText = target.dataset.textValue || initText;

    scrambleText(target, finalText, intervalTime);
}

document.addEventListener("DOMContentLoaded", () => {
    animTexts.forEach(element => initTextScramble(element));
});

animTexts.forEach(element => {
    element.addEventListener("mouseover", () => initTextScramble(element));
});

// ---------------------------------

// ---------------------------------
// Terminal Animation content :
// ---------------------------------

const lines = document.querySelectorAll('.terminal-content .line p');
let currentElementIndex = 0;

lines.forEach(line => {
    line.style.opacity = '0';
});

function addTypingAnimationSequentially(elements) {
    const applyAnimation = () => {
        if (currentElementIndex >= elements.length) return;

        const element = elements[currentElementIndex];
        element.style.opacity = '1';
        element.classList.add('typing-animation');

        const onAnimationEnd = () => {
            element.classList.remove('typing-animation');
            element.removeEventListener('animationend', onAnimationEnd);
            currentElementIndex++;
            applyAnimation();
        };

        element.addEventListener('animationend', onAnimationEnd, { once: true });
    };

    applyAnimation();
}

addTypingAnimationSequentially(lines);


// ---------------------------------
// Navbar :
// ---------------------------------

class SDEV_FRONTEND {

    constructor() {

        this.header = document.getElementById('sdev-header') || false

        if (this.header){
            this.width_event=1050;
            this.mobile=false;
            this.active=false;
            if(window.innerWidth<this.width_event){
                this.mobile=true;
            };
            this.initHeader();
        };
    }

    openMobileHeader(){

        if(this.active==false){

            this.menu.classList.add('smc');

            let all_content=document.querySelector('.sac');

            var content = document.querySelectorAll(`[id^="navlink"]`);

            for (let i = 0; i < content.length; i++) {
                content[i].style.setProperty('color', 'var(--pure)', 'important');
            };


            setTimeout(()=>{

                all_content.classList.add("dn");

            },300);

            this.active=true;

        };

        return false;

    };

    closeMobileHeader(){

        if(this.active==true){

            let all_content = document.querySelector('.sac');

            all_content.classList.remove("dn");

            this.menu.classList.remove('smc');

            var content = document.querySelectorAll(`[id^="navlink"]`);
    
            setTimeout(()=>{

                all_content.classList.remove("dn");
                
                for (let i = 0; i < content.length; i++) {
                    content[i].style.color = 'transparent';
                };
    

            },300);

            this.active=false;

        };

        return false;

    };

    initHeader(){
        this.menu=document.getElementById('sdev-menu');
        if(this.mobile==true){
            document.body.classList.add('mv');
        };
        window.addEventListener('resize',()=>{
            if(this.active==false){
                if(window.innerWidth<this.width_event){
                    document.body.classList.add('mv');
                    this.mobile=true;
                }else{
                    document.body.classList.remove('mv');
                    this.mobile=false;
                };
            }else{
                if(window.innerWidth<this.width_event){}
                else{
                    this.closeMobileHeader();
                    document.body.classList.remove('mv');
                    this.mobile=false;
                    this.active=false;
                };
            };
        });
        this.menu.addEventListener('click',()=>{
            let mobileNav=document.querySelector('.nav-list');
            mobileNav.classList.toggle('open');
            if(this.active == true){
                this.closeMobileHeader();
            }else{
                this.openMobileHeader();
            };
        });
    };
};

const SDEV_TOOL = new SDEV_FRONTEND();

const languageChange = document.getElementById('changeLanguage');

function toggleLanguage() {
    const isChecked = languageChange.getAttribute('aria-checked') === 'true';
    languageChange.setAttribute('aria-checked', String(!isChecked));
}

languageChange.addEventListener('click', toggleLanguage);

// ---------------------------------

// ---------------------------------
// To Top Button :
// ---------------------------------

const sdevTop = document.getElementById('sdev-top');

if (sdevTop) {

    sdevTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleScrollToTopButton = () => {
        const isTopVisible = window.pageYOffset > 20;
        sdevTop.classList.toggle("dn", !isTopVisible);
    };

    window.addEventListener('scroll', toggleScrollToTopButton);
}

// ---------------------------------