// Select all pages
const pages = document.querySelectorAll(".page");
let currentPage = 0;

// Show next page
function nextPage() {

    console.log(currentPage, pages.length);

    if (currentPage >= pages.length - 1) return;

    pages[currentPage].classList.remove("active");
    pages[currentPage].classList.add("slide-out");

    setTimeout(() => {

        pages[currentPage].classList.remove("slide-out");

        currentPage++;

        pages[currentPage].classList.add("active");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        // Start typing on the letter page
        if(pages[currentPage].classList.contains("letter")){
            typeLetter();
        }

        // Start confetti on the final page
        if(pages[currentPage].classList.contains("final-end")){
            startConfetti();
        }

    },700);

}

// Hidden sunflower message
const sunflower = document.getElementById("sunflower");
const hiddenMessage = document.getElementById("hiddenMessage");

if (sunflower) {
    sunflower.addEventListener("click", () => {
        hiddenMessage.style.display = "flex";
    });
}

// Close popup
function closeMessage() {
    hiddenMessage.style.display = "none";
}

// Close popup when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === hiddenMessage) {
        hiddenMessage.style.display = "none";
    }
});
let typingStarted = false;

function typeLetter() {

    if(typingStarted) return;

    typingStarted = true;

    const letter = document.querySelector(".letter-card p");

    const text = letter.innerHTML;

    letter.innerHTML="";

    let i=0;

    function type(){

        if(i<text.length){

            letter.innerHTML += text.charAt(i);

            i++;

            setTimeout(type,30);

        }

    }

    type();

}

// Fade in intro lines one by one
window.addEventListener("load", () => {
    const lines = document.querySelectorAll(".intro-line");

    lines.forEach((line, index) => {
        line.style.opacity = "0";
        line.style.transform = "translateY(20px)";

        setTimeout(() => {
            line.style.transition = "all 1s ease";
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
        }, index * 1200);
    });
});

// Create twinkling stars
const stars = document.getElementById("stars");

for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");

    star.style.position = "absolute";
    star.style.width = Math.random() * 3 + 1 + "px";
    star.style.height = star.style.width;
    star.style.background = "white";
    star.style.borderRadius = "50%";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.opacity = Math.random();

    star.style.animation = `twinkle ${2 + Math.random() * 4}s infinite`;

    stars.appendChild(star);
}

// Add twinkle animation dynamically
const style = document.createElement("style");

style.innerHTML = `
@keyframes twinkle{
0%,100%{
opacity:.2;
transform:scale(1);
}
50%{
opacity:1;
transform:scale(1.8);
}
}
`;

document.head.appendChild(style);
function startConfetti(){

    for(let i=0;i<150;i++){

        const confetti=document.createElement("div");

        confetti.className="confetti";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.animationDelay=Math.random()*4+"s";

        confetti.style.background=
        ["#FFD54F","#FF8A80","#FFFFFF","#FFE082"]
        [Math.floor(Math.random()*4)];

        document.body.appendChild(confetti);

        setTimeout(()=>{
            confetti.remove();
        },6000);

    }

}

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

function finishJourney() {

    // Hide the popup
    document.getElementById("hiddenMessage").style.display = "none";

    // Go to the last page
    nextPage();

}