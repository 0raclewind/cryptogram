let loginForm = document.querySelector(".login")
let registerForm = document.querySelector(".register")
let message = document.querySelector('.message')
let delay = 200;

function loginSelect() {
    registerForm.style.transform = "rotateY(90deg)"
    message.style.display = 'none'
    setTimeout(() => {
        loginForm.style.transform = "rotateY(0deg)"
    }, delay)
}

function registerSelect() {
    loginForm.style.transform = "rotateY(-90deg)";
    message.style.display = 'none'
    setTimeout(() => {
        registerForm.style.opacity = 1;
        registerForm.style.transform = "rotateY(0deg)";
    }, delay);
}

let body = document.querySelector("body");

body.addEventListener("touchstart", startTouch, false);
body.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
}

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            registerSelect();
            document.querySelector(".swipe-left").style.opacity = "0";
            setTimeout(() => {
                document.querySelector(".swipe-right").style.opacity = "1";
            }, 300)
        } else {
            // swiped right
            loginSelect();
            document.querySelector(".swipe-right").style.opacity = "0";
            setTimeout(() => {
                document.querySelector(".swipe-left").style.opacity = "1";
            }, 300)
        }
    }

    initialX = null;
    initialY = null;

    // e.preventDefault();
}