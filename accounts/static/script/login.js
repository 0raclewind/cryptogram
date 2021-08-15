let loginForm = document.querySelector(".login")
let registerForm = document.querySelector(".register")
let message = document.querySelector('.message')
let delay = 200;

function loginSelect() {
    registerForm.style.transform = "rotateY(90deg)"
    message.innerText = ''
    setTimeout(() => {
        loginForm.style.transform = "rotateY(0deg)"
        let registerUsername = registerForm.querySelector("input[name='username']")
        let registerPassword = registerForm.querySelector("input[name='password']")
        let confirmPassword = registerForm.querySelector("input[name='confirmation']")
        clearValues([registerUsername, registerPassword, confirmPassword])
    }, delay)
}

function registerSelect() {
    loginForm.style.transform = "rotateY(-90deg)";
    message.innerText = ''
    setTimeout(() => {
        registerForm.style.opacity = 1;
        registerForm.style.transform = "rotateY(0deg)";
        let loginUsername = loginForm.querySelector("input[name='username']")
        let loginPassword = loginForm.querySelector("input[name='password']")
        clearValues([loginUsername, loginPassword])
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
}

loginForm.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()
    postFetch(loginForm, '/login', message)
})

registerForm.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()
    postFetch(registerForm, '/register', message)
})

function clearValues(values) {
    values.forEach(value => {
        value.value = ""
    })
}