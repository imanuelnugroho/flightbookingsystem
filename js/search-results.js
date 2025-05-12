// Helper function to format date as YYYY-MM-DD from a Date object
function formatDateToYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

// Utility to add days
function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

const dummyFlights = [
  {
    id: 1,
    from: "Bangkok",
    to: "Dubai",
    departureDate: formatDateToYMD(today),
    stops: 0,
    price: 320,
    carrier: "AirAsia",
    duration: "6h 45m"
  },
  {
    id: 2,
    from: "Dubai",
    to: "Seoul",
    departureDate: formatDateToYMD(tomorrow),
    stops: 1,
    price: 450,
    carrier: "AirAsia",
    duration: "10h 15m"
  },
  {
    id: 3,
    from: "Singapore",
    to: "Tokyo",
    departureDate: formatDateToYMD(dayAfterTomorrow),
    stops: 0,
    price: 380,
    carrier: "AirAsia",
    duration: "7h 30m"
  },
  {
    id: 4,
    from: "Jakarta",
    to: "Dubai",
    departureDate: formatDateToYMD(today),
    stops: 2,
    price: 280,
    carrier: "AirAsia",
    duration: "9h 00m"
  },
  {
    id: 5,
    from: "Bangkok",
    to: "Dubai",
    departureDate: formatDateToYMD(tomorrow),
    stops: 0,
    price: 310,
    carrier: "AirAsia",
    duration: "6h 50m"
  },
  {
    id: 6,
    from: "Manila",
    to: "Dubai",
    departureDate: formatDateToYMD(today),
    stops: 1,
    price: 400,
    carrier: "AirAsia",
    duration: "8h 40m"
  },
  {
    id: 7,
    from: "Mumbai",
    to: "Tokyo",
    departureDate: formatDateToYMD(today),
    stops: 0,
    price: 420,
    carrier: "AirAsia",
    duration: "7h 10m"
  },
  {
    id: 8,
    from: "Dubai",
    to: "Singapore",
    departureDate: formatDateToYMD(today),
    stops: 1,
    price: 350,
    carrier: "AirAsia",
    duration: "8h 20m"
  },
  {
    id: 9,
    from: "Jakarta",
    to: "Kuala Lumpur",
    departureDate: formatDateToYMD(tomorrow),
    stops: 0,
    price: 150,
    carrier: "AirAsia",
    duration: "2h 30m"
  },
  {
    id: 10,
    from: "Jakarta",
    to: "Kuala Lumpur",
    departureDate: formatDateToYMD(dayAfterTomorrow),
    stops: 1,
    price: 140,
    carrier: "AirAsia",
    duration: "3h 0m"
  },
  // Return flights from Kuala Lumpur to Jakarta for the next 7 days
  ...Array(7).fill(0).map((_, i) => ({
    id: 11 + i,
    from: "Kuala Lumpur",
    to: "Jakarta",
    departureDate: formatDateToYMD(addDays(today, 3 + i)), // starting 3 days after today, next 7 days
    stops: Math.floor(Math.random() * 2), // 0 or 1 stops randomly
    price: 150 + Math.floor(Math.random() * 50), // 150 to 200 USD price range
    carrier: "AirAsia",
    duration: "2h 30m"
  }))
];



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

  return dummyFlights.filter(flight => {
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
