document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.asset').forEach(asset => {
        let low_symbol = asset.querySelector('.symbol').innerText.toLowerCase()
        let icon = asset.querySelector('img')

        icon.src = `/static/icons/${low_symbol}.svg`
        icon.addEventListener("error", (e) => {
            e.target.src = '/static/icons/generic.svg'
            e.onerror = null
        })

        if (low_symbol == 'usd') {
            let cash = asset.querySelector(".holdings span")
            asset.querySelector(".holdings").innerHTML = displayDollars(parseFloat(cash.innerText))
        } else {
            asset.href = `/info/${asset.dataset.slug}`
        }

    })
})