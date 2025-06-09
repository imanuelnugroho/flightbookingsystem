import { Routes } from '@angular/router';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

export const routes: Routes = [
    { path: '', component: FlightSearchComponent },
    { path: 'search-results', component: SearchResultsComponent },
    { path: 'confirmation', component: ConfirmationComponent },
    { path: 'home', redirectTo: 'flight-search.component', pathMatch: 'full' },
    { path: '**', redirectTo: '' } // Redirect to home for unknown routes
];
