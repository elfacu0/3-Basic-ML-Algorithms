const curtain = document.querySelector(".curtain");
let isTransitionRunning = false;
curtain.addEventListener('transitionend', function (e) {
    if (e.propertyName == "transform") {
        isTransitionRunning = false;
    }
});
curtain.addEventListener("transitionrun", (e) => {
    if (e.propertyName == "transform") {
        isTransitionRunning = true;
    }
})
curtain.addEventListener("transitionstart", (e) => {
    if (e.propertyName == "transform") {
        isTransitionRunning = true;
    }
})
curtain.addEventListener("transitioncancel", (e) => {
    if (e.propertyName == "transform") {
        isTransitionRunning = true;
    }
})
const menu = document.querySelector("#proyects");
menu.addEventListener("click", function () {
    if (!isTransitionRunning) {
        toggleClass(curtain);
    }
});

function toggleClass(element) {
    if (Object.values(element.classList).includes("appear")) {
        element.classList.remove("appear");
        element.classList.add("disappear");
    } else {
        element.classList.remove("disappear");
        element.classList.add("appear");
    }
}