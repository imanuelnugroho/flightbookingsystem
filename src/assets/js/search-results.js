// Helper function to format date as YYYY-MM-DD from a Date object
function formatDateToYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Format date helper
function formatDate(d) {
  if (!d) return '';
  const dateObj = new Date(d);
  return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

// Utility to add days
function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

// Generate dummy flight data for testing
const generateDummyFlights = (startDate, endDate, from, to) => {
  const flights = [];
  const destinations = [
    { from: "Jakarta", to: "Kuala Lumpur", price: 150, duration: "2h 30m" },
    { from: "Kuala Lumpur", to: "Jakarta", price: 160, duration: "2h 30m" },
    // Add more routes as needed
  ];

  // Generate flights for the specified date range
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const departureDate = formatDateToYMD(date);
    destinations.forEach(destination => {
      if ((destination.from === from && destination.to === to) || (destination.from === to && destination.to === from)) {
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
      }
    });
  }

  return flights;
};

// Read URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const searchFrom = urlParams.get('from') || '';
const searchTo = urlParams.get('to') || '';
const searchDepart = urlParams.get('departDate') || '';
const searchReturn = urlParams.get('returnDate') || '';
const searchPassengers = parseInt(urlParams.get('passengers') || '1', 10);

// Get the departure and return dates
const departDate = new Date(searchDepart);
const returnDate = new Date(searchReturn);

// Generate flights based on the current date
const dummyDepartureFlights = generateDummyFlights(departDate, returnDate, searchFrom, searchTo);
const dummyReturnFlights = generateDummyFlights(returnDate, addDays(returnDate, 6), searchTo, searchFrom);

// Define departure and return flights
const departureFlightsList = document.getElementById('departureFlights');
const returnFlightsList = document.getElementById('returnFlights');
const filterStopsSelect = document.getElementById('filterStops');

// Filter flights based on query parameters and stops filter
function filterFlights() {
  const stopsFilter = filterStopsSelect.value;

  const filteredDepartureFlights = dummyDepartureFlights.filter(flight => {
    // Match from/to cities (case insensitive)
    const fromMatches = flight.from.toLowerCase() === searchFrom.toLowerCase();
    const toMatches = flight.to.toLowerCase() === searchTo.toLowerCase();

    // Allow flights that match either direction
    if (!fromMatches && !toMatches) return false;

    // Filter by stops
    if (stopsFilter === 'nonstop' && flight.stops !== 0) return false;
    if (stopsFilter === '1stop' && flight.stops !== 1) return false;
    if (stopsFilter === '2plus' && flight.stops < 2) return false;
    return true;
  });

  const filteredReturnFlights = dummyReturnFlights.filter(flight => {
    // Match from/to cities (case insensitive)
    const fromMatches = flight.from.toLowerCase() === searchTo.toLowerCase();
    const toMatches = flight.to.toLowerCase() === searchFrom.toLowerCase();

    // Allow flights that match either direction
    if (!fromMatches && !toMatches) return false;

    // Filter by stops
    if (stopsFilter === 'nonstop' && flight.stops !== 0) return false;
    if (stopsFilter === '1stop' && flight.stops !== 1) return false;
    if (stopsFilter === '2plus' && flight.stops < 2) return false;
    return true;
  });
  return { filteredDepartureFlights, filteredReturnFlights };
}

// Render flights dynamically
function renderFlights(flights) {
  departureFlightsList.setAttribute('aria-busy', 'true');
  returnFlightsList.setAttribute('aria-busy', 'true');

  departureFlightsList.innerHTML = '';
  returnFlightsList.innerHTML = '';

  if (flights.filteredDepartureFlights.length === 0) {
    departureFlightsList.innerHTML = '<div class="no-results" role="alert">No departure flights found matching your search criteria.</div>';
    departureFlightsList.setAttribute('aria-busy', 'false');
  }else{
    flights.filteredDepartureFlights.forEach(flight => {
      const card = document.createElement('article');
      card.className = 'flight-card';
      card.setAttribute('role', 'listitem');
      card.tabIndex = 0;

      const stopsText = flight.stops === 0 ? 'Nonstop' : (flight.stops === 1 ? '1 Stop' : `${flight.stops} Stops`);

      card.innerHTML = `
        <input type="checkbox" class="flight-checkbox" data-flight='${JSON.stringify(flight)}' />
        <div class="flight-route">${flight.from} → ${flight.to}</div>
        <div class="flight-info">Departure: ${formatDate(flight.departureDate)}</div>
        <div class="flight-info">Stops: ${stopsText}</div>
        <div class="flight-info">Carrier: ${flight.carrier}</div>
        <div class="flight-info">Duration: ${flight.duration}</div>
        <div class="flight-info">Passengers: ${searchPassengers}</div>
        <div class="flight-price">MYR ${flight.price}</div>
      `;
      departureFlightsList.appendChild(card);
    });
  }

  if (flights.filteredReturnFlights.length === 0) {
    returnFlightsList.innerHTML = '<div class="no-results" role="alert">No return flights found matching your search criteria.</div>';
    returnFlightsList.setAttribute('aria-busy', 'false');
  }else{
    flights.filteredReturnFlights.forEach(flight => {
      const card = document.createElement('article');
      card.className = 'flight-card';
      card.setAttribute('role', 'listitem');
      card.tabIndex = 0;

      const stopsText = flight.stops === 0 ? 'Nonstop' : (flight.stops === 1 ? '1 Stop' : `${flight.stops} Stops`);

      card.innerHTML = `
        <input type="checkbox" class="flight-checkbox" data-flight='${JSON.stringify(flight)}' />
        <div class="flight-route">${flight.from} → ${flight.to}</div>
        <div class="flight-info">Departure: ${formatDate(flight.departureDate)}</div>
        <div class="flight-info">Stops: ${stopsText}</div>
        <div class="flight-info">Carrier: ${flight.carrier}</div>
        <div class="flight-info">Duration: ${flight.duration}</div>
        <div class="flight-info">Passengers: ${searchPassengers}</div>
        <div class="flight-price">MYR ${flight.price}</div>
      `;
      returnFlightsList.appendChild(card);
    });
  }
  
  departureFlightsList.setAttribute('aria-busy', 'false');
  returnFlightsList.setAttribute('aria-busy', 'false');
}

// Confirm selection button functionality
document.getElementById('confirmSelection').addEventListener('click', () => {
  const selectedDepartureFlights = Array.from(document.querySelectorAll('#departureFlights .flight-checkbox:checked')).map(checkbox => JSON.parse(checkbox.dataset.flight));
  const selectedReturnFlights = Array.from(document.querySelectorAll('#returnFlights .flight-checkbox:checked')).map(checkbox => JSON.parse(checkbox.dataset.flight));
  if (selectedDepartureFlights.length === 0 && selectedReturnFlights.length === 0) {
    alert('Please select at least one flight from either departure or return flights.');
    return;
  }
  // Redirect to confirmation page with selected flights
  const params = new URLSearchParams({
    departureFlights: JSON.stringify(selectedDepartureFlights),
    returnFlights: JSON.stringify(selectedReturnFlights)
  });
  window.location.href = `../web/confirmation.html?${params.toString()}`;
});

// Initial display
renderFlights(filterFlights());

// Update flights on filter changes
filterStopsSelect.addEventListener('change', () => {
  renderFlights(filterFlights());
});
