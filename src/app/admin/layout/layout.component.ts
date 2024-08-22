import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  loggedUserData: any;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const localData = localStorage.getItem("FlightUser");
      if (localData != null) {
        this.loggedUserData = JSON.parse(localData);
      }
    }
  }

  logoff() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('FlightUser');
    }
    this.router.navigateByUrl('/login');
  }
}
// FlightUser:
// name: indigo_admin
// email: indogo@dummy.com
// number: 9988776655
// city: Pune
// address: Pune
// role: Vendor
// ID: 1
// Password:112211