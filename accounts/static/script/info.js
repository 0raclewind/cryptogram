document.addEventListener('DOMContentLoaded', () => {
    const slug = document.querySelector('#slug').value;
    display_info(slug);
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
    fetch(history_mock)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
}

function display_info(slug) {
    const tagline = 'profile/general/overview/tagline';
    const fields = `name,symbol,${tagline}`;
    const asset_profile = `https://data.messari.io/api/v2/assets/${slug}/profile?fields=${fields}`;
    const asset_profile_mock = 'https://localhost:3000/profile';

    fetch(asset_profile)
        .then(response => response.json())
        .then(json => {
            console.log(json.data.profile);
        })
}