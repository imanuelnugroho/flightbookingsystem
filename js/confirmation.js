// Read URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const departureFlights = JSON.parse(urlParams.get('departureFlights') || '[]');
const returnFlights = JSON.parse(urlParams.get('returnFlights') || '[]');

const departureFlightList = document.getElementById('departureFlightList');
const returnFlightList = document.getElementById('returnFlightList');

// Function to render flight details
function renderFlightDetails(flights, container) {
    if (flights.length === 0) {
        container.innerHTML = '<p>No flights selected.</p>';
        return;
    }
    flights.forEach(flight => {
        const flightInfo = document.createElement('div');
        flightInfo.className = 'flight-info';
        flightInfo.innerHTML = `
        <div><strong>${flight.from} → ${flight.to}</strong></div>
        <div>Departure: ${flight.departureDate}</div>
        <div>Price: USD ${flight.price}</div>
        `;
        container.appendChild(flightInfo);
    });
}

// Render selected flights
renderFlightDetails(departureFlights, departureFlightList);
renderFlightDetails(returnFlights, returnFlightList);

// Payment button functionality
document.getElementById('payButton').addEventListener('click', () => {
    alert('Proceeding to payment...');
    // Here you can implement the payment logic or redirect to a payment gateway
});