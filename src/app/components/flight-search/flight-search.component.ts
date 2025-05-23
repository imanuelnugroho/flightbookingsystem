import { Component, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-flight-search',
  imports: [],
  templateUrl: './flight-search.component.html',
  // styleUrl: '../../../assets/css/flight-search.component.css'
  styleUrls: ['../../../assets/css/flight-search.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FlightSearchComponent {
  cities: string[] = [
    "Bangkok", "Beijing", "Bangalore", "Chennai", "Dhaka", "Dubai", "Hanoi", "Jakarta",
    "Kuala Lumpur", "Manila", "Mumbai", "Osaka", "Phnom Penh", "Seoul", "Shanghai", "Singapore",
    "Taipei", "Tokyo", "Ho Chi Minh City"
  ];

  fromAirport: HTMLSelectElement;
  toAirport: HTMLSelectElement;
  departDate: HTMLInputElement;
  returnDate: HTMLInputElement;
  passengers: HTMLSelectElement;

  constructor() {
    this.fromAirport = document.getElementById('fromAirport') as HTMLSelectElement;
    this.toAirport = document.getElementById('toAirport') as HTMLSelectElement;
    this.departDate = document.getElementById('departDate') as HTMLInputElement;
    this.returnDate = document.getElementById('returnDate') as HTMLInputElement;
    this.passengers = document.getElementById('passengers') as HTMLSelectElement;

    this.populateCityOptions(this.fromAirport);
    this.populateCityOptions(this.toAirport);
    this.setMinDates();
  }

  // Populate the city options
  populateCityOptions(selectElement: HTMLSelectElement): void {
    this.cities.forEach(city => {
      const option: HTMLOptionElement = document.createElement('option');
      option.value = city;
      option.textContent = city;
      selectElement.appendChild(option);
    });
  }

  // Set minimum dates for date inputs
  setMinDates(): void {
    const today: string = new Date().toISOString().split('T')[0];
    this.departDate.min = today;
    this.returnDate.min = today;
  }

  // Handle departure date change
  onDepartureDateChange(): void {
    if (this.departDate.value) {
      this.returnDate.min = this.departDate.value;
      if (this.returnDate.value && this.returnDate.value < this.departDate.value) {
        this.returnDate.value = '';
      }
    }
  }

  // Handle flight search form submission
  onSearchFormSubmit(event: Event): void {
    event.preventDefault();

    const from: string = this.fromAirport.value;
    const to: string = this.toAirport.value;
    const depart: string = this.departDate.value;
    const ret: string = this.returnDate.value;
    const passengers: string = this.passengers.value;

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
    const params: URLSearchParams = new URLSearchParams({
      from: from,
      to: to,
      departDate: depart,
      returnDate: ret || "",
      passengers: passengers
    });
    window.location.href = `web/search-results.html?${params.toString()}`;
  }
  
}


// // Cities for from/to dropdown (Asia + Dubai)
// const cities: string[] = [
//   "Bangkok", "Beijing", "Bangalore", "Chennai", "Dhaka", "Dubai", "Hanoi", "Jakarta",
//   "Kuala Lumpur", "Manila", "Mumbai", "Osaka", "Phnom Penh", "Seoul", "Shanghai", "Singapore",
//   "Taipei", "Tokyo", "Ho Chi Minh City"
// ];

// const fromSelect: HTMLSelectElement = document.getElementById('fromAirport') as HTMLSelectElement;
// const toSelect: HTMLSelectElement = document.getElementById('toAirport') as HTMLSelectElement;

// // Populate the city options
// function populateCityOptions(selectElement: HTMLSelectElement): void {
//   cities.forEach(city => {
//     const option: HTMLOptionElement = document.createElement('option');
//     option.value = city;
//     option.textContent = city;
//     selectElement.appendChild(option);
//   });
// }
// populateCityOptions(fromSelect);
// populateCityOptions(toSelect);

// // Set min dates for date inputs
// const departDateInput: HTMLInputElement = document.getElementById('departDate') as HTMLInputElement;
// const returnDateInput: HTMLInputElement = document.getElementById('returnDate') as HTMLInputElement;

// function setMinDates(): void {
//   const today: string = new Date().toISOString().split('T')[0];
//   departDateInput.min = today;
//   returnDateInput.min = today;
// }
// setMinDates();

// departDateInput.addEventListener('change', () => {
//   if (departDateInput.value) {
//     returnDateInput.min = departDateInput.value;
//     if (returnDateInput.value && returnDateInput.value < departDateInput.value) {
//       returnDateInput.value = '';
//     }
//   }
// });

// // Flight search form submission - validate and redirect to results page with query params
// const flightSearchForm: HTMLFormElement = document.getElementById('flightSearchForm') as HTMLFormElement;

// flightSearchForm.addEventListener('submit', (e: Event) => {
//   e.preventDefault();

//   const from: string = flightSearchForm.fromAirport.value;
//   const to: string = flightSearchForm.toAirport.value;
//   const depart: string = flightSearchForm.departDate.value;
//   const ret: string = flightSearchForm.returnDate.value;
//   const passengers: string = flightSearchForm.passengers.value;

//   if (!from || !to) {
//     alert("Please select both departure and destination cities.");
//     return;
//   }
//   if (from === to) {
//     alert("Departure and destination cannot be the same.");
//     return;
//   }
//   if (!depart) {
//     alert("Please select a departure date.");
//     return;
//   }
//   if (ret && ret < depart) {
//     alert("Return date cannot be before departure date.");
//     return;
//   }

//   // Redirect with params encoded
//   const params: URLSearchParams = new URLSearchParams({
//     from: from,
//     to: to,
//     departDate: depart,
//     returnDate: ret || "",
//     passengers: passengers
//   });
//   window.location.href = `web/search-results.html?${params.toString()}`;
// });

// // Users and roles handling (simulate database with localStorage)
// // Roles: superadmin, admin, customer, affiliate
// // Approval required for customer and affiliate; admin/superadmin no approval needed.

// // Initial users dummy data
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   approved: boolean;
// }

// const initialUsers: User[] = [
//   { id: 1, name: "Super Admin", email: "superadmin@airasia.com", password: "superpass", role: "superadmin", approved: true },
//   { id: 2, name: "Admin User", email: "admin@airasia.com", password: "adminpass", role: "admin", approved: true },
//   { id: 3, name: "John Customer", email: "customer@airasia.com", password: "custpass", role: "customer", approved: true },
//   { id: 4, name: "Affiliate User", email: "affiliate@airasia.com", password: "affipass", role: "affiliate", approved: true },
//   { id: 5, name: "Pending User", email: "pending@airasia.com", password: "pendingpass", role: "customer", approved: false }
// ];

// // Store users in localStorage if not already present
// if (!localStorage.getItem('users')) {
//   localStorage.setItem('users', JSON.stringify(initialUsers));
// }

// // Track logged in user
// let current:User  User | null = null;
// if (localStorage.getItem('currentUser ')) {
//   currentUser  = JSON.parse(localStorage.getItem('currentUser ') || 'null');
// }

// // DOM Elements related to login/register
// const modalBackdrop: HTMLElement = document.getElementById('modalBackdrop') as HTMLElement;
// const loginFormDiv: HTMLElement = document.getElementById('loginForm') as HTMLElement;
// const registerFormDiv: HTMLElement = document.getElementById('registerForm') as HTMLElement;
// const modalCloseBtn: HTMLElement = document.getElementById('modalCloseBtn') as HTMLElement;
// const userPanel: HTMLElement = document.getElementById('userPanel') as HTMLElement;
// const userNameSpan: HTMLElement = document.getElementById('userName') as HTMLElement;
// const userRoleSpan: HTMLElement = document.getElementById('userRole') as HTMLElement;
// const logoutBtn: HTMLElement = document.getElementById('logoutBtn') as HTMLElement;
// const loginIcon: HTMLElement = document.getElementById('loginIcon') as HTMLElement;
// const approvalPanel: HTMLElement = document.getElementById('approvalPanel') as HTMLElement;
// const approvalRequestsTableBody: HTMLElement = document.getElementById('approvalRequestsTableBody') as HTMLElement;

// // Show login modal
// function showLoginModal(): void {
//   loginFormDiv.style.display = 'block';
//   registerFormDiv.style.display = 'none';
//   modalBackdrop.classList.add('active');
//   modalBackdrop.setAttribute('aria-hidden', 'false');
//   document.getElementById('loginEmail')?.focus();
// }

// // Show register modal
// function showRegisterModal(): void {
//   registerFormDiv.style.display = 'block';
//   loginFormDiv.style.display = 'none';
//   modalBackdrop.classList.add('active');
//   modalBackdrop.setAttribute('aria-hidden', 'false');
//   document.getElementById('regName')?.focus();
// }

// // Hide modal
// function hideModal(): void {
//   modalBackdrop.classList.remove('active');
//   modalBackdrop.setAttribute('aria-hidden', 'true');
//   clearLoginRegisterForms();
// }

// // Clear forms
// function clearLoginRegisterForms(): void {
//   (document.getElementById('loginFormElement') as HTMLFormElement).reset();
//   (document.getElementById('registerFormElement') as HTMLFormElement).reset();
// }

// // Update user panel UI
// function updateUser UI(): void {
//   if (currentUser ) {
//     loginIcon.style.display = 'none';
//     userPanel.style.display = 'flex';
//     userNameSpan.textContent = currentUser .name;
//     userRoleSpan.textContent = `(${currentUser .role.charAt(0).toUpperCase() + currentUser .role.slice(1)})`;

//     // Show approval panel only for admin/superadmin
//     if (currentUser .role === "admin" || currentUser .role === "superadmin") {
//       loadPendingApprovals();
//       approvalPanel.style.display = 'block';
//     } else {
//       approvalPanel.style.display = 'none';
//     }
//   } else {
//     loginIcon.style.display = 'inline-flex';
//     userPanel.style.display = 'none';
//     approvalPanel.style.display = 'none';
//   }
// }

// // User login form submit
// document.getElementById('loginFormElement')?.addEventListener('submit', e => {
//   e.preventDefault();
//   const email: string = (e.target as HTMLFormElement).loginEmail.value.trim().toLowerCase();
//   const password: string = (e.target as HTMLFormElement).loginPassword.value;

//   const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
//   const found:User  User | undefined = users.find(u => u.email.toLowerCase() === email && u.password === password);
//   if (!foundUser ) {
//     alert('Invalid email or password.');
//     return;
//   }
//   if (!foundUser .approved) {
//     alert('Your registration is pending approval by an admin.');
//     return;
//   }
//   currentUser  = foundUser ;
//   localStorage.setItem('currentUser ', JSON.stringify(currentUser ));
//   updateUser UI();
//   hideModal();
// });

// // User registration form submit
// document.getElementById('registerFormElement')?.addEventListener('submit', e => {
//   e.preventDefault();
//   const name: string = (e.target as HTMLFormElement).regName.value.trim();
//   const email: string = (e.target as HTMLFormElement).regEmail.value.trim().toLowerCase();
//   const password: string = (e.target as HTMLFormElement).regPassword.value;
//   const role: string = (e.target as HTMLFormElement).regRole.value;

//   const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

//   if (users.some(u => u.email.toLowerCase() === email)) {
//     alert('Email already registered.');
//     return;
//   }

//   // Approval status: admin and superadmin auto approved, others false
//   const approved: boolean = role === 'superadmin' || role === 'admin';

//   const new:User  User = {
//     id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
//     name,
//     email,
//     password,
//     role,
//     approved
//   };

//   users.push(newUser );
//   localStorage.setItem('users', JSON.stringify(users));

//   alert(approved ? 'Registration successful! You can now login.' : 'Registration successful! Your account is pending admin approval.');

//   // After registration show login form
//   showLoginModal();
// });

// // Logout
// logoutBtn.addEventListener('click', () => {
//   currentUser  = null;
//   localStorage.removeItem('currentUser ');
//   updateUser UI();
// });

// // Login icon click
// loginIcon.addEventListener('click', () => {
//   showLoginModal();
// });
// loginIcon.addEventListener('keydown', e => {
//   if (e.key === 'Enter') {
//     showLoginModal();
//   }
// });

// // Modal close
// modalCloseBtn.addEventListener('click', hideModal);
// modalBackdrop.addEventListener('click', e => {
//   if (e.target === modalBackdrop) hideModal();
// });
// // Escape key closes modal
// document.addEventListener('keydown', e => {
//   if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
//     hideModal();
//   }
// });

// // Switch links between login and register forms
// document.getElementById('showRegister')?.addEventListener('click', showRegisterModal);
// document.getElementById('showLogin')?.addEventListener('click', showLoginModal);

// // Load users pending approval and render table (for admin panel)
// function loadPendingApprovals(): void {
//   const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
//   const pendingUsers: User[] = users.filter(u => !u.approved);

//   approvalRequestsTableBody.innerHTML = '';
//   if (pendingUsers.length === 0) {
//     approvalRequestsTableBody.innerHTML = '<tr><td colspan="5">No pending approvals.</td></tr>';
//     return;
//   }
//   pendingUsers.forEach(user => {
//     const tr: HTMLTableRowElement = document.createElement('tr');
//     tr.innerHTML = `
//       <td>${user.name}</td>
//       <td>${user.email}</td>
//       <td>${capitalize(user.role)}</td>
//       <td>${user.approved ? 'Approved' : 'Pending'}</td>
//       <td><button class="approve-btn" data-id="${user.id}">Approve</button></td>
//     `;
//     approvalRequestsTableBody.appendChild(tr);
//   });

//   // Approve button handlers
//   document.querySelectorAll('.approve-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const userId: number = parseInt(btn.getAttribute('data-id') || '0');
//       approveUser (userId);
//     });
//   });
// }

// // Approve user function
// function approveUser (userId: number): void {
//   const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
//   const userIdx: number = users.findIndex(u => u.id === userId);
//   if (userIdx === -1) return;

//   users[userIdx].approved = true;
//   localStorage.setItem('users', JSON.stringify(users));
//   alert(`User  ${users[userIdx].name} approved successfully!`);
//   loadPendingApprovals();
// }

// function capitalize(str: string): string {
//   if (!str) return '';
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// // Initialize UI state on load
// updateUser UI();

