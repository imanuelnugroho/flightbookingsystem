// Helper function to format date as YYYY-MM-DD from a Date object
function formatDateToYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Get today's date
const today = new Date();

// Utility to add days
function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

// Generate dummy flight data for testing
const generateDummyFlights = (startDate, returnDate) => {
  const flights = [];
  const destinations = [
    { from: "Jakarta", to: "Kuala Lumpur", price: 150, duration: "2h 30m" },
    { from: "Kuala Lumpur", to: "Jakarta", price: 160, duration: "2h 30m" },
    // Add more routes as needed
  ];

  // Generate flights for the next 7 days
  for (let i = 0; i < 7; i++) {
    const departureDate = formatDateToYMD(addDays(startDate, i));
    destinations.forEach(destination => {
      flights.push({
        id: flights.length + 1,
        from: destination.from,
        to: destination.to,
        departureDate: departureDate,
        stops: Math.floor(Math.random() * 2), // Random stops (0 or 1)
        price: destination.price + Math.floor(Math.random() * 50), // Random price
        carrier: "AirAsia",
        duration: destination.duration
      });
    });
  }

  return flights;
};

// Generate flights based on the current date
const dummyFlights = generateDummyFlights(today);

// Return flights for the next 7 days from Kuala Lumpur to Jakarta
const returnFlights = generateDummyFlights(addDays(today, 3), true);

// Combine both departure and return flights
const allFlights = [...dummyFlights, ...returnFlights];

const flightsList = document.getElementById('flightsList');
const filterStopsSelect = document.getElementById('filterStops');

// Read URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const searchFrom = urlParams.get('from') || '';
const searchTo = urlParams.get('to') || '';
const searchDepart = urlParams.get('departDate') || '';
const searchPassengers = parseInt(urlParams.get('passengers') || '1', 10);

document.title = `Flights: ${searchFrom} → ${searchTo}`;

// Format date helper
function formatDate(d) {
  if (!d) return '';
  const dateObj = new Date(d);
  return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

// Filter flights based on query parameters and stops filter
function filterFlights() {
  const stopsFilter = filterStopsSelect.value;

  return allFlights.filter(flight => {
    // Match from/to cities (case insensitive)
    if (flight.from.toLowerCase() !== searchFrom.toLowerCase()) return false;
    if (flight.to.toLowerCase() !== searchTo.toLowerCase()) return false;
    // Match departure date if specified
    if (searchDepart && flight.departureDate !== searchDepart) return false;

    // Filter by stops
    if (stopsFilter === 'nonstop' && flight.stops !== 0) return false;
    if (stopsFilter === '1stop' && flight.stops !== 1) return false;
    if (stopsFilter === '2plus' && flight.stops < 2) return false;

    return true;
  });
}

// Render flights dynamically
function renderFlights(flights) {
  flightsList.setAttribute('aria-busy', 'true');
  flightsList.innerHTML = '';
  if (flights.length === 0) {
    flightsList.innerHTML = '<div class="no-results" role="alert">No flights found matching your search criteria.</div>';
    flightsList.setAttribute('aria-busy', 'false');
    return;
  }
  flights.forEach(flight => {
    const card = document.createElement('article');
    card.className = 'flight-card';
    card.setAttribute('role', 'listitem');
    card.tabIndex = 0;

    const stopsText = flight.stops === 0 ? 'Nonstop' : (flight.stops === 1 ? '1 Stop' : `${flight.stops} Stops`);

    card.innerHTML = `
      <div class="flight-route">${flight.from} → ${flight.to}</div>
      <div class="flight-info">Departure: ${formatDate(flight.departureDate)}</div>
      <div class="flight-info">Stops: ${stopsText}</div>
      <div class="flight-info">Carrier: ${flight.carrier}</div>
      <div class="flight-info">Duration: ${flight.duration}</div>
      <div class="flight-info">Passengers: ${searchPassengers}</div>
      <div class="flight-price">USD ${flight.price}</div>
    `;
    flightsList.appendChild(card);
  });
  flightsList.setAttribute('aria-busy', 'false');
}

// Initial display
renderFlights(filterFlights());

// Update flights on filter changes
filterStopsSelect.addEventListener('change', () => {
  renderFlights(filterFlights());
});
