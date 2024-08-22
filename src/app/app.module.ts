import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AirportComponent } from './admin/airport/airport.component';
import { AllFlightsComponent } from './admin/all-flights/all-flights.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { CityComponent } from './admin/city/city.component';
import { NewFlightComponent } from './admin/new-flight/new-flight.component';
import { SearchComponent } from './website/search/search.component';
import { BookFlightComponent } from './website/book-flight/book-flight.component';
import { HttpClientModule, withFetch } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MyBookingsComponent } from './website/my-bookings/my-bookings.component';
import { WebsiteLandingComponent } from './website/website-landing/website-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    AirportComponent,
    AllFlightsComponent,
    BookingsComponent,
    CityComponent,
    NewFlightComponent,
    SearchComponent,
    BookFlightComponent,
    MyBookingsComponent,
    WebsiteLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(),withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
