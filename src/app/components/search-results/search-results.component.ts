import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  // styleUrl: '../../../assets/css/search-results.component.css'
  styleUrls: ['../../../assets/css/search-results.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchResultsComponent {
  // myScriptElement: HTMLScriptElement | undefined;
  // constructor(){
  //   this.myScriptElement = document.createElement("script");
  //   this.myScriptElement.src = "../../../assets/js/search-results.js";
  //   document.body.appendChild(this.myScriptElement);
  // }
  constructor(private router: Router) { }

  sendMeHome() {
    this.router.navigate(['home']);
  }
}
