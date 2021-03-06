// Global variable for generating static files
const aws = 'https://cryptogram-static.s3.amazonaws.com/static/'

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.asset').forEach(asset => {
        let low_symbol = asset.querySelector('.symbol').innerText.toLowerCase()
        let icon = asset.querySelector('img')

        icon.src = `${aws}icons/${low_symbol}.svg`
        icon.addEventListener("error", (e) => {
            e.target.src = `${aws}icons/generic.svg`
            e.onerror = null
        })

        let amount = asset.querySelector(".holdings span")

        if (low_symbol == 'usd') {
            asset.querySelector(".holdings").innerHTML = displayDollars(parseFloat(amount.innerText))
        } else {
            asset.href = `/info/${asset.dataset.slug}`
            amount.innerText = parseFloat(amount.innerText)
        }

    })
})