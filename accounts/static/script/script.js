document.addEventListener('DOMContentLoaded', (event) => {
    if (window.location.pathname == "/") {
        document.querySelector(".menu .home").classList.add("active")
    } else if (window.location.pathname == "/profile") {
        document.querySelector(".menu .profile").classList.add("active")
    } else if (window.location.pathname == "/portfolio") {
        document.querySelector(".menu .portfolio").classList.add("active")
    }
})


function displayDollars(number) {
    if (number) {
        return "$" + number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return "-"
    }
}

function postFetch(form, url, msg) {
    let username = form.querySelector('input[name="username"]')
    let password = form.querySelector('input[name="password"]')
    let confirm = form.querySelector('input[name="confirmation"]')
    let new_pass = form.querySelector('input[name="new_pass"]')

    let csrf = form.querySelector('input[name="csrfmiddlewaretoken"]').value

    const data = new FormData()

    if (url == '/password_change') {
        if (new_pass.value == confirm.value) {
            data.append('password', password.value)
            data.append('confirmation', confirm.value)
            data.append('new_pass', new_pass.value)
        } else {
            msg.innerText = "Passwords doesn't match"
            return 0
        }
    } else {
        data.append('username', username.value)
        data.append('password', password.value)
        if (confirm) {
            if (password.value != confirm.value) {
                msg.innerText = "Passwords doesn't match"
                return 0
            } else {
                data.append('confirmation', confirm.value)
            }
        }
    }

    fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "X-CSRFToken": csrf
        },
        body: data,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(json => {
            if (json == 205) {
                msg.innerText = "Invalid username or password"
            } else if (json == 206) {
                msg.innerText = "Passwords doesn't match"
            } else if (json == 207) {
                msg.innerText = "Username unavailable"
            } else if (json == 208) {
                msg.innerText = "Invalid current password"
            } else if (json == 209) {
                // Code 209 for password change successs
                msg.classList.add('success')
                msg.innerHTML = "Password changed successfully"
                password.value = ""
                new_pass.value = ""
                confirm.value = ""
            } else {
                window.location.replace("/")
            }
        })
}

