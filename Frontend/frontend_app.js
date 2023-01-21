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
        console.log(convertedAmount)
       // console.log(`You have converted ${fromCurrency.toUpperCase()} ${amount},- to ${toCurrency.toUpperCase()} ${convertedAmount},-`)
    }
};

/* Do not call this, too many calls
main('AUD', 'NOK', 1000);
*/


// Main Application

const mainNode = document.getElementById('main');

const renderHome = () => {
    mainNode.innerHTML = `
    <h1>Currency Converter</h1>
    


    `;
}

renderHome();