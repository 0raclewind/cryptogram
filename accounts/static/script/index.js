// Initiate page number for loading assets
let page_number = 1;

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
    const assets = `https://data.messari.io/api/v2/assets?page=${page}&fields=name,slug,symbol,metrics/market_data/percent_change_usd_last_1_hour,metrics/market_data/price_usd`;
    const assets_mock = 'https://localhost:3000/assets';
    fetch(assets_mock)
        .then(response => {
            return response.json();
        })
        .then(json => {
            json.data.forEach(entry => {
                const symbol = entry.symbol;
                const name = entry.name;
                let change = entry.metrics.market_data.percent_change_usd_last_1_hour;
                change = change ? change.toFixed(2) : change
                const price = entry.metrics.market_data.price_usd;
                display_entry(symbol, name, change, price, entry.slug);
            });
            page_number += 1;
        })
        .then(() => {
            document.querySelectorAll(".entry").forEach(entry => {
                entry.addEventListener('click', () => {
                    let slug = entry.dataset.slug;
                    display_info(slug);
                    // asset_history(slug);
                });
            })
        })
}

// Display loaded entries
function display_entry(symbol, name, change, price, slug) {
    const entries = document.querySelector(".entries")
    // Define required divs
    let entry_a = document.createElement('a')
    let icon = document.createElement('img')
    let name_symbol_div = document.createElement('div')
    let symbol_div = document.createElement('div')
    let name_div = document.createElement('div')
    let change_price_div = document.createElement('div')
    let change_div = document.createElement('div')
    let price_div = document.createElement('div')

    // Define divs classes
    entry_a.classList = "entry"
    entry_a.href = `info/${slug}`

    icon.classList = "icon"


    let req = new Request(`static/icons/${symbol.toLowerCase()}.svg`)

    fetch(req)
        .then(resp => {
            if (resp.status == 404) {
                icon.src = `static/icons/generic.svg`
            } else {
                icon.src = `static/icons/${symbol.toLowerCase()}.svg`
            }
        })

    name_symbol_div.classList = "name-symbol"
    symbol_div.classList = "symbol"
    name_div.classList = "name"
    change_price_div.classList = "change-price"
    change_div.classList = "change"
    price_div.classList = "price"

    // Insert values into divs
    symbol_div.innerHTML = symbol
    name_div.innerHTML = name;
    if (change < 0) {
        change_div.innerHTML = `<i class="fas fa-caret-down"></i> <span>${change}%</span>`
        change_div.classList.add("down")
    } else if (change > 0) {
        change_div.innerHTML = `<i class="fas fa-caret-up"></i> <span>${change}%</span>`
        change_div.classList.add("up")
    } else {
        change_div.innerHTML = `<span>0.00%</span>`
    }

    price_div.innerHTML = displayDollars(price)

    entry_a.append(icon)

    name_symbol_div.append(name_div)
    name_symbol_div.append(symbol_div)
    entry_a.append(name_symbol_div)

    change_price_div.append(price_div)
    change_price_div.append(change_div)
    entry_a.append(change_price_div)

    entries.appendChild(entry_a)
}