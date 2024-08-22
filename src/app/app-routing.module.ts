import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './website/search/search.component';
import { BookFlightComponent } from './website/book-flight/book-flight.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { MyBookingsComponent } from './website/my-bookings/my-bookings.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AirportComponent } from './admin/airport/airport.component';
import { AllFlightsComponent } from './admin/all-flights/all-flights.component';
import { CityComponent } from './admin/city/city.component';
import { LoginComponent } from './admin/login/login.component';
import { NewFlightComponent } from './admin/new-flight/new-flight.component';
import { WebsiteLandingComponent } from './website/website-landing/website-landing.component';

// This is were you start the application
const routes: Routes = [
  {
    path: '',
    redirectTo: 'airport',
    pathMatch: 'full',
  },
  {
    path:'',
    component:WebsiteLandingComponent,
    children:[
      {
        path: 'search',
        component: SearchComponent,
        title: 'Search Flight',
      },
      {
        path: 'book-flight',
        component: BookFlightComponent,
        title: 'Book New Ticket',
      },
      {
        path: 'Bookings',
        component: MyBookingsComponent,
        title: 'My-Bookings',
      },
    ]
  },

  // all your component paths are below
  
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    // when you log in these are the compnents you will see
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'airport',
        component: AirportComponent,
      },
      {
        path: 'city',
        component: CityComponent,
      },
      {
        path: 'all-bookings',
        component: BookingsComponent,
      },
      {
        path:'all-flights',
        component:AllFlightsComponent
      },
      {
        path: 'new-flight',
        component: NewFlightComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
