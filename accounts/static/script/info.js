document.addEventListener('DOMContentLoaded', () => {
    const slug = window.location.pathname.split('/')[2];
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

            console.log(json.data);
        })
        .then(() => {
            profile.hidden = false;
            document.querySelector(".loading-div").hidden = true;
        })
}