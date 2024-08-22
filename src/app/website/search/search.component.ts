import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MasterService } from '../../core/service/master.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Note: Ensure 'styleUrls' is plural and points to an array.
})
export class SearchComponent implements OnInit {
  
  airports: any[] = [];
  fromAirport: number = 0;
  toAirport: number = 0;
  travelDate: string = '';
  flightList: any[] = [];
  passengerObj: any = {
    "travelerName": "",
    "contactNo": "",
    "aadharNo": "",
    "seatNo": 0
  };
  bookingObj: any = {
    "flightId": 0,
    "customerId": 0,
    "bookingDate": new Date(),
    "totalAmount": 0,
    "FlightBookingTravelers": []
  };
  passengerList: any[] = [];

  constructor(private master: MasterService, @Inject(PLATFORM_ID) private platformId: Object) {
    // Ensure localStorage is only accessed in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      const isLocal = localStorage.getItem('flightCustomer');
      if (isLocal != null) {
        this.bookingObj.customerId = JSON.parse(isLocal).userId;
      }
    }
  }

  ngOnInit(): void {
    this.loadAirports();
  }

  addPassenger(): void {
    const obj = JSON.stringify(this.passengerObj);
    const newObj = JSON.parse(obj);
    this.passengerList.push(newObj);
  }

  onBookTicket(): void {
    this.bookingObj.FlightBookingTravelers = this.passengerList;
    this.master.bookTicket(this.bookingObj).subscribe((res: any) => {
      if (res.result) {
        alert('Ticket Booked Successfully');
        this.closeModel();
      } else {
        alert(res.message);
      }
    });
  }

  loadAirports(): void {
    this.master.getAllAirport().subscribe((res: any) => {
      this.airports = res.data;
    });
  }

  searchFlights(): void {
    this.master.searchFlight(this.fromAirport, this.toAirport, this.travelDate).subscribe((res: any) => {
      this.flightList = res.data;
    });
  }

  bookTicket(flightId: number): void {
    this.bookingObj.flightId = flightId;
    const model = document.getElementById('bookModel');
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeModel(): void {
    const model = document.getElementById('bookModel');
    if (model != null) {
      model.style.display = "none";
    }
  }
}

