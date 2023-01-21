// Frontend part of application


// AccessLink
const accessLink = 'http://localhost:3000/convert/';

// Main app - fetching from server
const main = async (fromCurrency, toCurrency, amount) => {
    const response = await fetch(`${accessLink}${fromCurrency}/${toCurrency}/${amount}`);
    const json = await response.json();
    if (!json.success) {
        console.log('There has been an error on the frontend');
    } else {
        const convertedAmount = JSON.stringify(json.result);
        //console.log(convertedAmount)
        return convertedAmount;
        // console.log(`You have converted ${fromCurrency.toUpperCase()} ${amount},- to ${toCurrency.toUpperCase()} ${convertedAmount},-`)
    }
};

/*
main('AUD', 'NOK', 1000);
*/


// Main Application


const mainNode = document.getElementById('main');

const renderHome = () => {
    const currencyOptions = `
    <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="nok">NOK</option>
        <option value="aud">AUD</option>
        <option value="gbp">GBP</option>
        <option value="cad">CAD</option>
        <option value="pln">PLN</option>
        <option value="sek">SEK</option>
        <option value="dkk">DKK</option>
        <option value="jpy">JPY</option>
        <option value="cny">CNY</option>
        <option value="chf">CHF</option>
        <option value="hkd">HKD</option>
        <option value="sgd">SGD</option>
        <option value="krw">KRW</option>
        <option value="nzd">NZD</option>
        <option value="inr">INR</option>
        <option value="twd">TWD</option>

    `;

    // Render main page
    mainNode.innerHTML = `
    <div id="title">
    <h1>Currency Converter</h1>
        </div>
<form action="">
    <div class="inputField">
        <label for="fromCurrency">Convert from:</label>
        <select name="fromCurrency" id="fromCurrency">
        ${currencyOptions}
        </select>
    </div>
    <div class="inputField">
        <label for="toCurrency">Convert to:</label>
        <select name="toCurrency" id="toCurrency">
        ${currencyOptions}
        </select>
    </div>
    <div class="inputField"
    <label for="amount">Amount:</label>
    <input type="text" name="amount" id="amount">
    </div>

</form>

<div id="buttonField">
    <button id="button">Convert</button>
</div>

<div id="resultField">
    <p id="result"></p>
</div>
    `;

    const fromCurrencyNode = document.getElementById('fromCurrency');
    const toCurrencyNode = document.getElementById('toCurrency');
    const amountNode = document.getElementById('amount');
    let selectedFromCurrency;
    let selectedToCurrency;
    let selectedAmount;


    fromCurrencyNode.addEventListener('input', e => {
        selectedFromCurrency = e.target.value;
    });

    toCurrencyNode.addEventListener('input', e => {
        selectedToCurrency = e.target.value;
    });

    amountNode.addEventListener('input', e => {
        selectedAmount = e.target.value;
    })

    

   

    const resultField = document.getElementById('result');

    const buttonNode = document.getElementById('button');
    buttonNode.addEventListener('click', async() => {
        if (selectedFromCurrency == selectedToCurrency) {
            resultField.innerHTML = 'Please select two separate currencies from the list in order to proceed with the conversion';
        } else {
            let finalAmount = await main(selectedFromCurrency, selectedToCurrency, selectedAmount)
            console.log(finalAmount)
            resultField.innerHTML = ` 
            ${selectedFromCurrency} and ${selectedToCurrency}
            You converted to ${finalAmount}
            `;
        }
    });

};

renderHome();