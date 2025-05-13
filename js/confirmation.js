// Read URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const departureFlights = JSON.parse(urlParams.get('departureFlights') || '[]');
const returnFlights = JSON.parse(urlParams.get('returnFlights') || '[]');

const departureFlightList = document.getElementById('departureFlightList');
const returnFlightList = document.getElementById('returnFlightList');
const totalAmountDiv = document.getElementById('totalAmount');
const exchangeRateDiv = document.getElementById('exchangeRate');
const currencySelect = document.getElementById('currencySelect');

let exchangeRateMyrToIdr = 3800;
let selectedCurrencyToPay = "";
let amountToPay = 0;

const exchangeRateFromApi = async () => {
    try {
        const response = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7253a8d8e6b842a092de0d1cffbacace&symbols=MYR,IDR&base=USD');
        const data = await response.json();
        return data.rates.IDR / data.rates.MYR; // Assuming the response structure contains rates
    } catch (error) {
        console.log('Error fetching exchange rate:', error);
        return 3800; // Handle error appropriately
    }
};

const updateExchangeRate = async () => {
  const rate = await exchangeRateFromApi();
  if (rate) {
    console.log(`Current exchange rate from MYR to IDR: ${rate}`);
    // You can now use this rate in your calculations
    exchangeRateDiv.innerHTML = `Exchange Rate (MYR to IDR): <span class="bold">${formatAmount(rate)}</span>`;
    exchangeRateMyrToIdr = rate;
  } else {
    console.log('Failed to retrieve exchange rate.');
  }
};


// Function to format amount to be displayed
function formatAmount(amountToBeFormatted){
    let amountFormatted = amountToBeFormatted.toFixed(2);
    amountFormatted = amountFormatted.replace('.', ',');
    amountFormatted = amountFormatted.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return amountFormatted;
}

// Function to render flight details
function renderFlightDetails(flights, container, currency) {
    container.innerHTML = "";
    
    if (flights.length === 0) {
        container.innerHTML = '<p>No flights selected.</p>';
        return 0; // Return 0 if no flights
    }
    let total = 0; // Initialize total amount
    flights.forEach(flight => {
        const flightInfo = document.createElement('div');
        flightInfo.className = 'flight-info';
        
        // Convert price based on selected currency
        let price = flight.price; // Assume price is in MYR
        if(currency === 'IDR'){
            price *= exchangeRateMyrToIdr; // Convert MYR to IDR    
        }

        flightInfo.innerHTML = `
        <div><strong>${flight.from} → ${flight.to}</strong></div>
        <div>Departure: ${flight.departureDate}</div>
        <div>Price: ${currency} ${formatAmount(price)}</div>
        `;
        container.appendChild(flightInfo);
        total += price; // Add to total
    });
    return total; // Return total amount for this flight list
}

// Function to update total amount display
function updateTotalAmount() {
    // Get latest exchange rate
    updateExchangeRate();

    // Render selected flights
    const selectedCurrency = currencySelect.value;
    const departureTotal = renderFlightDetails(departureFlights, departureFlightList, selectedCurrency);
    const returnTotal = renderFlightDetails(returnFlights, returnFlightList, selectedCurrency);
    
    // Calculate total amount
    const totalAmount = departureTotal + returnTotal;
    totalAmountDiv.innerHTML = `Total Amount: <span class="bold">${selectedCurrency} ${formatAmount(totalAmount)}</span>`;

    amountToPay = totalAmount;
    selectedCurrencyToPay = selectedCurrency;
}
// Initial render of selected flights
updateTotalAmount();

// Event listener for currency selection change
currencySelect.addEventListener('change', updateTotalAmount);

// Payment button functionality
document.getElementById('payButton').addEventListener('click', () => {
    let paymentGatewayUrl = "";
    if(selectedCurrencyToPay === "IDR"){
        paymentGatewayUrl = `https://indonesian-payment-gateway.co.id/pay?amount=${amountToPay}&currency=${selectedCurrencyToPay}`;
    }else{
        paymentGatewayUrl = `https://malaysian-payment-gateway.com.my/pay?amount=${amountToPay}&currency=${selectedCurrencyToPay}`;
    }

    // Open the payment gateway in a new tab
    // window.open(paymentGatewayUrl, '_blank');
    alert('Proceeding to payment: ' + paymentGatewayUrl);
});
