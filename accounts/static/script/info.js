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

    const history = `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=2021-07-01&interval=1d&timestamp-format=rfc3339`;
    const history_mock = 'https://localhost:3000/asset_history';
    fetch(history)
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
    // Construct URL for fetching
    const tagline = 'profile/general/overview/tagline';
    const overview = 'profile/general/overview/project_details';
    const links = 'profile/general/overview/official_links';
    const fields = `name,symbol,${tagline},${overview},${links}`;
    const asset_profile = `https://data.messari.io/api/v2/assets/${slug}/profile?fields=${fields}`;
    const asset_profile_mock = 'https://localhost:3000/profile';

    let profile = document.querySelector('.asset_profile');

    fetch(asset_profile)
        .then(response => response.json())
        .then(json => {
            profile.querySelector('.symbol').innerHTML = json.data.symbol;
            profile.querySelector('.name').innerHTML = json.data.name;
            profile.querySelector('.tagline').innerHTML = json.data.profile.general.overview.tagline;
            profile.querySelector('.text').innerHTML = json.data.profile.general.overview.project_details;

            let resources = profile.querySelector('.resources');

            json.data.profile.general.overview.official_links.forEach(link => {
                let a_tag = document.createElement('a');
                a_tag.href = link.link;
                a_tag.innerHTML = link.name;
                resources.appendChild(a_tag);
            })
        })
        .then(() => {
            asset_history(slug)
            asset_metrics(slug)
        })
        .then(() => {
            profile.hidden = false;
            // document.querySelector(".loading-div").hidden = true;
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

    fetch(metrics_url)
        .then(response => response.json())
        .then(json => {
            let price = json.data.market_data.price_usd;
            let cap = json.data.marketcap.current_marketcap_usd;
            let volume = json.data.market_data.volume_last_24_hours;
            let supply = json.data.supply.circulating;
            let high = json.data.all_time_high.price;

            document.querySelector('.price').innerHTML = "$" + price.toFixed(2);
            document.querySelector(".market-cap .value").innerHTML = "$" + cap.toFixed(2);
            document.querySelector(".volume .value").innerHTML = "$" + volume.toFixed(2);
            document.querySelector(".supply .value").innerHTML = Math.round(supply);
            document.querySelector(".high .value").innerHTML = "$" + high.toFixed(2);


            console.log(json.data);
        })
}