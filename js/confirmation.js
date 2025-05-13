// Read URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const departureFlights = JSON.parse(urlParams.get('departureFlights') || '[]');
const returnFlights = JSON.parse(urlParams.get('returnFlights') || '[]');

const departureFlightList = document.getElementById('departureFlightList');
const returnFlightList = document.getElementById('returnFlightList');
const totalAmountDiv = document.getElementById('totalAmount');
const currencySelect = document.getElementById('currencySelect');

var selectedCurrencyToPay = "";
var amountToPay = 0;

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
            price *= 3800; // Convert MYR to IDR    
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
    const paymentGatewayUrl = "";
    if(selectedCurrencyToPay === "IDR"){
        paymentGatewayUrl = `https://indonesian-payment-gateway.co.id/pay?amount=${amountToPay}&currency=${selectedCurrencyToPay}`;
    }else{
        paymentGatewayUrl = `https://malaysian-payment-gateway.com.my/pay?amount=${amountToPay}&currency=${selectedCurrencyToPay}`;
    }

    // Open the payment gateway in a new tab
    // window.open(paymentGatewayUrl, '_blank');
    alert('Proceeding to payment: ' + paymentGatewayUrl);
});
