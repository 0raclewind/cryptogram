// Global constant SLUG variable
const slug = window.location.pathname.split('/')[2]
let symbol

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(".time-buttons div");
    display_info(slug)

    // Timeframe buttons highlight
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            asset_history(dateCalc(button.dataset.time))
            buttons.forEach(btn => {
                btn.classList.remove("active")
            })
            button.classList.add("active")
        })
    })

    // Display dollars as balance
    let cash = document.querySelector(".trade-window .cash .balance span")
    cash.innerHTML = displayDollars(parseFloat(cash.dataset.cash))
});

function asset_history(timeframe = 0) {
    const history_url = `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=${timeframe}&interval=1d&timestamp-format=rfc3339&fields=values`;
    const history_mock = 'https://localhost:3000/asset_history';
    let values = { labels: [], data: [] }

    fetch(history_url)
        .then(response => response.json())
        .then(json => {

            json.data.values.forEach(value => {
                values.labels.push(value[0].split('T')[0])
                let avg = (value[1] + value[2] + value[3] + value[4]) / 4
                values.data.push(avg.toFixed(2))
            });
            render_chart(values);
        })
        .then(() => {
            document.querySelector('.asset_profile').hidden = false;
            document.querySelector('.loading-div').hidden = true;
        })
}

function display_info() {
    const asset_profile_url = `https://data.messari.io/api/v2/assets/${slug}/profile?fields=name,symbol,profile/general/overview/tagline,profile/general/overview/project_details,profile/general/overview/official_links`;
    const asset_profile_mock = 'https://localhost:3000/profile';

    let profile = document.querySelector('.asset_profile');

    fetch(asset_profile_url)
        .then(response => response.json())
        .then(json => {
            symbol = json.data.symbol
            document.querySelectorAll('.symbol').forEach((smb) => {
                smb.innerHTML = symbol
            })
            document.querySelector('.trade-window .submit').value = `Sell ${symbol} for USD`
            profile.querySelector('.name').innerHTML = json.data.name;
            // profile.querySelector('.tagline').innerHTML = json.data.profile.general.overview.tagline;
            profile.querySelector('.text').innerHTML = json.data.profile.general.overview.project_details;

            // Append links to DOM
            json.data.profile.general.overview.official_links.forEach(link => {
                let a_tag = document.createElement('a');
                let icon = '';
                if (link.name == "Whitepaper") {
                    icon = '<i class="fas fa-scroll"></i> '
                } else if (link.name == "Github") {
                    icon = '<i class="fab fa-github"></i> '
                } else if (link.name == "Twitter") {
                    icon = '<i class="fab fa-twitter"></i> '
                } else if (link.name == "Telegram") {
                    icon = '<i class="fab fa-telegram"></i> '
                } else if (link.name == "Reddit") {
                    icon = '<i class="fab fa-reddit"></i> '
                } else if (link.name == "Website") {
                    icon = '<i class="fas fa-globe"></i> '
                } else if (link.name == "Blog") {
                    icon = '<i class="fas fa-blog"></i> '
                } else if (link.name == "Medium") {
                    icon = '<i class="fab fa-medium"></i> '
                } else if (link.name == "Litepaper") {
                    icon = '<i class="far fa-sticky-note"></i> '
                }
                a_tag.href = link.link;
                a_tag.innerHTML = icon + link.name;
                profile.querySelector('.resources .links').appendChild(a_tag);
            })
        })
        .then(() => {
            asset_history(dateCalc(7))
            asset_metrics()
        })
}

function asset_metrics() {
    const metrics_url = `https://data.messari.io/api/v1/assets/${slug}/metrics?fields=all_time_high/price,marketcap/current_marketcap_usd,market_data/price_usd,supply/circulating,market_data/volume_last_24_hours`;
    const metrics_mock = 'https://localhost:3000/metrics';

    fetch(metrics_url)
        .then(response => response.json())
        .then(json => {
            let price = json.data.market_data.price_usd;
            let cap = json.data.marketcap.current_marketcap_usd;
            let volume = json.data.market_data.volume_last_24_hours;
            let supply = json.data.supply.circulating;
            let high = json.data.all_time_high.price;

            document.querySelector('.trade-window .header .price .price').innerHTML = displayDollars(price)
            document.querySelector('.price').innerHTML = displayDollars(price)
            document.querySelector(".market-cap .value").innerHTML = "$" + displayBigNumber(cap);
            document.querySelector(".volume .value").innerHTML = "$" + displayBigNumber(volume);
            document.querySelector(".supply .value").innerHTML = displayBigNumber(supply);
            document.querySelector(".high .value").innerHTML = displayDollars(high)
        })
}

function render_chart(values) {
    // let ctx = document.getElementById('myChart');
    let canvas = document.querySelector("#myChart");
    let ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: values.labels,
            datasets: [{
                data: values.data,
                borderColor: "#aaa",
                pointRadius: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    document.querySelectorAll(".time-buttons div").forEach(button => {
        button.addEventListener('click', () => {
            myChart.destroy()
        })
    })
}


// Trade window display
let title = document.querySelector('.trade-window .title span')
let convert = document.querySelector('.trade-window .convert')
let submitBtn = document.querySelector('.trade-window .submit')
let form = document.querySelector('.trade-window form')
let tradeWindow = document.querySelector(".trade-window")
let backdrop = document.querySelector('.backdrop')

form.onsubmit = displayWarning

function displayWarning(e) {
    e.preventDefault()
    document.querySelector('.trade-window .warning').innerHTML = "Exceeds balance"
}

document.querySelector(".trade-btn").onclick = () => {
    tradeWindow.style.opacity = "1"
    backdrop.style.display = 'block'
    tradeWindow.style.transform = "translateX(-50%) scale(1)"
    document.querySelector('.crypto input').focus()
}

document.querySelector(".close-trade").onclick = () => {
    tradeWindow.style.transform = "translateX(-50%) scale(0)"
    setTimeout(() => {
        backdrop.style.display = 'none'
        document.querySelector('.crypto input').value = null
        document.querySelector('.cash input').value = null
        document.querySelector('.crypto .warning').innerHTML = ""
        document.querySelector('.cash .warning').innerHTML = ""
    }, 200)
}

convert.addEventListener('click', () => {
    if (convert.dataset.status == 'sell') {
        convert.dataset.status = 'buy'
        convert.innerHTML = '<i class="fas fa-arrow-up">'
        title.innerHTML = 'Buy'
        submitBtn.value = `Buy ${symbol} with USD`
        form.action = '/buy'
    } else {
        convert.dataset.status = 'sell'
        convert.innerHTML = '<i class="fas fa-arrow-down">'
        title.innerHTML = 'Sell'
        submitBtn.value = `Sell ${symbol} for USD`
        form.action = '/sell'
    }
})

function dateCalc(time) {
    let today = new Date()

    // 86400000ms in a day
    // multiplied by days needed
    // 3600000ms = 1h for time zone correction
    let days = 86400000 * time - 3600000
    let newDate = new Date(today - days)

    return newDate.toISOString().split("T")[0]
}


function displayBigNumber(number) {
    // Nine Zeroes for Billions
    return Math.abs(Number(number)) >= 1.0e+9

        ? (Math.abs(Number(number)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(number)) >= 1.0e+6

            ? (Math.abs(Number(number)) / 1.0e+6).toFixed(2) + "M"

            : Math.abs(Number(number));
}