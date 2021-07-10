let page_number = 1;
const full_assets = 'https://data.messari.io/api/v2/assets';
const entries = document.querySelector(".entries");


document.addEventListener('DOMContentLoaded', (event) => {
    load_assets(page_number);
    document.addEventListener('scroll', () => {
        if (document.body.clientHeight == (window.pageYOffset + window.innerHeight)) {

            load_assets(page_number);
        }
    });
})

// Get 20 entries
function load_assets(page) {
    const assets = `https://data.messari.io/api/v2/assets?page=${page}&fields=name,symbol,metrics/market_data/percent_change_usd_last_1_hour,metrics/market_data/price_usd`;
    fetch(assets)
        .then(response => {
            return response.json();
        })
        .then(json => {
            json.data.forEach(entry => {
                const symbol = entry.symbol;
                const name = entry.name;
                const change = entry.metrics.market_data.percent_change_usd_last_1_hour;
                const price = entry.metrics.market_data.price_usd;
                display_entry(symbol, name, change, price);
            });
            page_number += 1;
        })
}

// Display loaded entries
function display_entry(symbol, name, change, price) {
    // Define required divs
    let entry_div = document.createElement('div');
    let symbol_div = document.createElement('div');
    let name_div = document.createElement('div');
    let change_div = document.createElement('div');
    let price_div = document.createElement('div');

    // Define divs classes
    entry_div.classList = "entry";
    symbol_div.classList = "symbol";
    name_div.classList = "name";
    change_div.classList = "change";
    price_div.classList = "price";

    // Insert values into divs
    symbol_div.innerHTML = symbol;
    name_div.innerHTML = name;
    if (change < 0) {
        change_div.innerHTML = '<i class="fas fa-arrow-alt-circle-down"></i>'
    } else {
        change_div.innerHTML = '<i class="fas fa-arrow-alt-circle-up"></i>'
    }
    price_div.innerHTML = "$" + price.toFixed(2);

    entry_div.appendChild(symbol_div);
    entry_div.appendChild(name_div);
    entry_div.appendChild(change_div);
    entry_div.appendChild(price_div);

    entries.appendChild(entry_div);

}