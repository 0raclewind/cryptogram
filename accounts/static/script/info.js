document.addEventListener('DOMContentLoaded', () => {
    const slug = window.location.pathname.split('/')[2];
    display_info(slug)

});

function asset_history(slug, timeframe = 0) {
    let start = '';
    if (timeframe == '1m') {

    } else if (timeframe == '1y') {

    } else {
        start = new Date();
    }

    const history = `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=2021-07-01&interval=1d&timestamp-format=rfc3339&fields=values`;
    const history_mock = 'https://localhost:3000/asset_history';
    fetch(history_mock)
        .then(response => response.json())
        .then(json => {
            let labels = []
            let data = []

            json.data.values.forEach(value => {
                labels.push(value[0].split('T')[0])
                let avg = (value[1] + value[2] + value[3] + value[4]) / 4
                data.push(avg.toFixed(2))
            });
            render_chart(labels, data);
        })
}

function display_info(slug) {
    const asset_profile_url = `https://data.messari.io/api/v2/assets/${slug}/profile?fields=name,symbol,profile/general/overview/tagline,profile/general/overview/project_details,profile/general/overview/official_links`;
    const asset_profile_mock = 'https://localhost:3000/profile';

    let profile = document.querySelector('.asset_profile');

    fetch(asset_profile_mock)
        .then(response => response.json())
        .then(json => {
            profile.querySelector('.symbol').innerHTML = json.data.symbol;
            profile.querySelector('.name').innerHTML = json.data.name;
            // profile.querySelector('.tagline').innerHTML = json.data.profile.general.overview.tagline;
            profile.querySelector('.text').innerHTML = json.data.profile.general.overview.project_details;

            let resources = profile.querySelector('.resources');

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
                } else {
                    icon = '<i class="fas fa-question-circle"></i> '
                }
                a_tag.href = link.link;
                a_tag.innerHTML = icon + link.name;
                resources.appendChild(a_tag);
            })
        })
        .then(() => {
            asset_history(slug)
            asset_metrics(slug)
        })
}

function render_chart(labels, data) {
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
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
}

function asset_metrics(slug) {
    let metrics_url = `https://data.messari.io/api/v1/assets/${slug}/metrics?fields=all_time_high/price,marketcap/current_marketcap_usd,market_data/price_usd,supply/circulating,market_data/volume_last_24_hours`;
    const metrics_mock = 'https://localhost:3000/metrics';

    fetch(metrics_mock)
        .then(response => response.json())
        .then(json => {
            let price = json.data.market_data.price_usd;
            let cap = json.data.marketcap.current_marketcap_usd;
            let volume = json.data.market_data.volume_last_24_hours;
            let supply = json.data.supply.circulating;
            let high = json.data.all_time_high.price;

            document.querySelector('.price').innerHTML = displayDollars(price)
            document.querySelector(".market-cap .value").innerHTML = "$" + displayBigNumber(cap);
            document.querySelector(".volume .value").innerHTML = "$" + displayBigNumber(volume);
            document.querySelector(".supply .value").innerHTML = displayBigNumber(supply);
            document.querySelector(".high .value").innerHTML = displayDollars(high)
        })
        .then(() => {
            document.querySelector('.asset_profile').hidden = false;
        })
}

function displayDollars(number) {
    return "$" + number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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