// Function to fetch exchange rates from API
async function fetchExchangeRates(base) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    return data.rates;
}

// Function to populate currency dropdowns with options
async function populateCurrencyDropdowns() {
    const rates = await fetchExchangeRates('USD'); // Using USD as base currency
    const currencyDropdowns = document.querySelectorAll('select');

    for (let currencyDropdown of currencyDropdowns) {
        for (let currencyCode in rates) {
            const option = document.createElement('option');
            option.text = currencyCode;
            currencyDropdown.add(option);
        }
    }
}

// Function to convert currency based on user input
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;

    const rates = await fetchExchangeRates(fromCurrency);

    if (rates[toCurrency]) {
        const rate = rates[toCurrency];
        const result = amount * rate;
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } else {
        document.getElementById('result').textContent = 'Exchange rate not available.';
    }
}

// Populate currency dropdowns on page load
populateCurrencyDropdowns();
