// AccessLink to the server
const accessLink = 'http://localhost:3000/convert/';

// Fetch from server
const main = async (fromCurrency, toCurrency, amount) => {
    const response = await fetch(`${accessLink}${fromCurrency}/${toCurrency}/${amount}`);
    const json = await response.json();
    if (!json.success) {
        console.log('There has been an error on the frontend');
    } else {
        const convertedAmount = JSON.stringify(json.result);
        return convertedAmount;
    }
};

// Application
const renderHome = () => {
    // Available currencies
    const currencyOptions = `
        <option value="usd">USD - United States Dollar</option>
        <option value="eur">EUR - Euro</option>
        <option value="nok">NOK - Norwegian Krone</option>
        <option value="aud">AUD - Australian Dollar</option>
        <option value="gbp">GBP - Sterling</option>
        <option value="cad">CAD - Canadian Dollar</option>
        <option value="pln">PLN - Polish Zloty</option>
        <option value="sek">SEK - Swedish Krona</option>
        <option value="dkk">DKK - Danish Krone</option>
        <option value="jpy">JPY - Japanese Yen</option>
        <option value="cny">CNY - Chinese Yuan</option>
        <option value="chf">CHF - Swiss Franc</option>
        <option value="hkd">HKD - Hong Kong Dollar</option>
        <option value="sgd">SGD - Singapore Dollar</option>
        <option value="krw">KRW - South Korean Won</option>
        <option value="nzd">NZD - New Zealand Dollar</option>
        <option value="inr">INR - Indian Rupee</option>
        <option value="twd">TWD - New Taiwan Dollar</option>
        <option value="zar">ZAR - South African Rand</option>
        <option value="brl">BRL - Brazilian Real</option>
        <option value="thb">THB - Thai Baht</option>
        <option value="mxn">MXN - Mexican Peso</option>
        <option value="ils">ILS - Israeli New Shekel</option>
        <option value="idr">IDR - Indonesian Rupiah</option>
        <option value="czk">CZK - Czech Koruna</option>
        <option value="try">TRY - Turkish Lira</option>
        <option value="huf">HUF - Hungarian Forint</option>
        <option value="clp">CLP - Chilean Peso</option>
        <option value="sar">SAR - Saudi Riyal</option>
        <option value="php">PHP - Philippine Peso</option>
        <option value="myr">MYR - Malaysian Ringgit</option>
        <option value="cop">COP - Colombian Peso</option>
        <option value="rub">RUB - Russian Ruble</option>
        <option value="ron">RON - Romanian Leu</option>
        <option value="uah">UAH - Ukrainian Hryvnia</option>
        <option value="ars">ARS - Argentine Peso</option>


    `;

    // Render main page
    const mainNode = document.getElementById('main');
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
    <div class="inputField">
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

    // Extract Nodes
    const fromCurrencyNode = document.getElementById('fromCurrency');
    const toCurrencyNode = document.getElementById('toCurrency');
    const amountNode = document.getElementById('amount');
    const buttonNode = document.getElementById('button');
    const resultNode = document.getElementById('result');

    // Import values
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

    // Conversion
    buttonNode.addEventListener('click', async () => {
        if (selectedFromCurrency == selectedToCurrency) {
            resultNode.innerHTML = 'Not a valid input, please select two distinct currencies';
        } else {
            if (isNaN(parseFloat(selectedAmount))) {
                resultNode.innerHTML = 'Only numbers are valid input.'
            } else {
                let finalAmount = await main(selectedFromCurrency, selectedToCurrency, selectedAmount)
                finalAmount = parseFloat(finalAmount);
                finalAmount = finalAmount.toFixed(2);
                resultNode.innerHTML = ` 
                ${selectedFromCurrency.toUpperCase()} ${selectedAmount},- is equivalent of ${selectedToCurrency.toUpperCase()} ${finalAmount},-
                `;
            }
        };
    });
};

renderHome();