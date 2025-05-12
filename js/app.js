// Cities for from/to dropdown (Asia + Dubai)
const cities = [
  "Bangkok", "Beijing", "Bangalore", "Chennai", "Dhaka", "Dubai", "Hanoi", "Jakarta",
  "Kuala Lumpur", "Manila", "Mumbai", "Osaka", "Phnom Penh", "Seoul", "Shanghai", "Singapore",
  "Taipei", "Tokyo", "Ho Chi Minh City"
];

const fromSelect = document.getElementById('fromAirport');
const toSelect = document.getElementById('toAirport');

// Populate the city options
function populateCityOptions(selectElement) {
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    selectElement.appendChild(option);
  });
}
populateCityOptions(fromSelect);
populateCityOptions(toSelect);

// Set min dates for date inputs
const departDateInput = document.getElementById('departDate');
const returnDateInput = document.getElementById('returnDate');

function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  departDateInput.min = today;
  returnDateInput.min = today;
}
setMinDates();

departDateInput.addEventListener('change', () => {
  if (departDateInput.value) {
    returnDateInput.min = departDateInput.value;
    if(returnDateInput.value && departDateInput && returnDateInput.value < departDateInput.value) {
      returnDateInput.value = '';
    }
  }
});

// Flight search form submission - validate and redirect to results page with query params
const flightSearchForm = document.getElementById('flightSearchForm');

flightSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const from = flightSearchForm.fromAirport.value;
  const to = flightSearchForm.toAirport.value;
  const depart = flightSearchForm.departDate.value;
  const ret = flightSearchForm.returnDate.value;
  const passengers = flightSearchForm.passengers.value;

  if (!from || !to) {
    alert("Please select both departure and destination cities.");
    return;
  }
  if (from === to) {
    alert("Departure and destination cannot be the same.");
    return;
  }
  if (!depart) {
    alert("Please select a departure date.");
    return;
  }
  if (ret && ret < depart) {
    alert("Return date cannot be before departure date.");
    return;
  }

  // Redirect with params encoded
  const params = new URLSearchParams({
    from: from,
    to: to,
    departDate: depart,
    returnDate: ret || "",
    passengers: passengers
  });
  window.location.href = `search-results.html?${params.toString()}`;
});

// Users and roles handling (simulate database with localStorage)
// Roles: superadmin, admin, customer, affiliate
// Approval required for customer and affiliate; admin/superadmin no approval needed.

// Initial users dummy data
const initialUsers = [
  {id:1, name: "Super Admin", email: "superadmin@airasia.com", password: "superpass", role: "superadmin", approved: true},
  {id:2, name: "Admin User", email: "admin@airasia.com", password: "adminpass", role: "admin", approved: true},
  {id:3, name: "John Customer", email: "customer@airasia.com", password: "custpass", role: "customer", approved: true},
  {id:4, name: "Affiliate User", email: "affiliate@airasia.com", password: "affipass", role: "affiliate", approved: true},
  {id:5, name: "Pending User", email: "pending@airasia.com", password: "pendingpass", role: "customer", approved: false}
];

// Store users in localStorage if not already present
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(initialUsers));
}

// Track logged in user
let currentUser = null;
if (localStorage.getItem('currentUser')) {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

// DOM Elements related to login/register
const modalBackdrop = document.getElementById('modalBackdrop');
const loginFormDiv = document.getElementById('loginForm');
const registerFormDiv = document.getElementById('registerForm');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const userPanel = document.getElementById('userPanel');
const userNameSpan = document.getElementById('userName');
const userRoleSpan = document.getElementById('userRole');
const logoutBtn = document.getElementById('logoutBtn');
const loginIcon = document.getElementById('loginIcon');
const approvalPanel = document.getElementById('approvalPanel');
const approvalRequestsTableBody = document.getElementById('approvalRequestsTableBody');

// Show login modal
function showLoginModal() {
  loginFormDiv.style.display = 'block';
  registerFormDiv.style.display = 'none';
  modalBackdrop.classList.add('active');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.getElementById('loginEmail').focus();
}
// Show register modal
function showRegisterModal() {
  registerFormDiv.style.display = 'block';
  loginFormDiv.style.display = 'none';
  modalBackdrop.classList.add('active');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.getElementById('regName').focus();
}
// Hide modal
function hideModal() {
  modalBackdrop.classList.remove('active');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  clearLoginRegisterForms();
}

// Clear forms
function clearLoginRegisterForms() {
  document.getElementById('loginFormElement').reset();
  document.getElementById('registerFormElement').reset();
}

// Update user panel UI
function updateUserUI() {
  if (currentUser) {
    loginIcon.style.display = 'none';
    userPanel.style.display = 'flex';
    userNameSpan.textContent = currentUser.name;
    userRoleSpan.textContent = `(${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)})`;

    // Show approval panel only for admin/superadmin
    if (currentUser.role === "admin" || currentUser.role === "superadmin") {
      loadPendingApprovals();
      approvalPanel.style.display = 'block';
    } else {
      approvalPanel.style.display = 'none';
    }
  } else {
    loginIcon.style.display = 'inline-flex';
    userPanel.style.display = 'none';
    approvalPanel.style.display = 'none';
  }
}

// User login form submit
document.getElementById('loginFormElement').addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.loginEmail.value.trim().toLowerCase();
  const password = e.target.loginPassword.value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const foundUser = users.find(u => u.email.toLowerCase() === email && u.password === password);
  if (!foundUser) {
    alert('Invalid email or password.');
    return;
  }
  if (!foundUser.approved) {
    alert('Your registration is pending approval by an admin.');
    return;
  }
  currentUser = foundUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateUserUI();
  hideModal();
});

// User registration form submit
document.getElementById('registerFormElement').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.regName.value.trim();
  const email = e.target.regEmail.value.trim().toLowerCase();
  const password = e.target.regPassword.value;
  const role = e.target.regRole.value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  if(users.some(u => u.email.toLowerCase() === email)) {
    alert('Email already registered.');
    return;
  }

  // Approval status: admin and superadmin auto approved, others false
  const approved = role === 'superadmin' || role === 'admin' ? true : false;

  const newUser = {
    id: users.length ? Math.max(...users.map(u=>u.id)) +1 : 1,
    name,
    email,
    password,
    role,
    approved
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert(approved ? 'Registration successful! You can now login.' : 'Registration successful! Your account is pending admin approval.');

  // After registration show login form
  showLoginModal();
});

// Logout
logoutBtn.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateUserUI();
});

// Login icon click
loginIcon.addEventListener('click', () => {
  showLoginModal();
});
loginIcon.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    showLoginModal();
  }
});

// Modal close
modalCloseBtn.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', e => {
  if(e.target === modalBackdrop) hideModal();
});
// Escape key closes modal
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
    hideModal();
  }
});

// Switch links between login and register forms
document.getElementById('showRegister').addEventListener('click', showRegisterModal);
document.getElementById('showLogin').addEventListener('click', showLoginModal);

// Load users pending approval and render table (for admin panel)
function loadPendingApprovals() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const pendingUsers = users.filter(u => !u.approved);

  approvalRequestsTableBody.innerHTML = '';
  if(pendingUsers.length === 0) {
    approvalRequestsTableBody.innerHTML = 'tr>td colspan="5">No pending approvals./td>/tr>';
    return;
  }
  pendingUsers.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    td>${user.name}/td>
    td>${user.email}/td>
    td>${capitalize(user.role)}/td>
    td>${user.approved ? 'Approved' : 'Pending'}/td>
    td>button class="approve-btn" data-id="${user.id}">Approve/button>/td>
    `;
    approvalRequestsTableBody.appendChild(tr);
  });

  // Approve button handlers
  document.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.getAttribute('data-id'));
      approveUser(userId);
    });
  });
}

// Approve user function
function approveUser(userId) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIdx = users.findIndex(u => u.id === userId);
  if(userIdx === -1) return;

  users[userIdx].approved = true;
  localStorage.setItem('users', JSON.stringify(users));
  alert(`User ${users[userIdx].name} approved successfully!`);
  loadPendingApprovals();
}

function capitalize(str) {
  if(!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize UI state on load
updateUserUI();
