document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector(".topup-btn").onclick = () => {
        fetch('/topup')
            .then(resp => resp.json())
            .then(json => {
                if (json == 201) {
                    displayMessage("You have too much cash on your account. Please spend more and try again.")
                } else {
                    displayMessage("Your account has been toped-up by $10,000. Spend it wisely.")
                }
            })
    }
})

function displayMessage(msg) {
    let msgWindow = document.querySelector(".message")
    let backdrop = document.querySelector(".backdrop")
    let text = document.querySelector(".message .text")
    text.innerText = msg

    backdrop.style.display = 'block'
    msgWindow.style.transform = 'translateX(-50%) scale(1)'
    msgWindow.style.opacity = "1"

    document.querySelector(".message .btn").onclick = () => {
        window.location.replace("/portfolio")
    }
}