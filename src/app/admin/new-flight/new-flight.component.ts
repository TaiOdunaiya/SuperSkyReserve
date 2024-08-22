import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MasterService } from '../../core/service/master.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.css']
})
export class NewFlightComponent implements OnInit {

  airportList: any[] = [];
  flightObj: any =  {
    "flightId": 0,
    "flightNumber": "",
    "departureAirportId": 0,
    "departureTime": "",
    "arrivalAirportId": 0,
    "arrivalTime": "",
    "price": 0,
    "totalSeats": 0,
    "flightVendorId": 0,
    "travelDate": ""
  };

  constructor(private master: MasterService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const localData = localStorage.getItem("FlightUser");
      if (localData != null) {
        this.flightObj.flightVendorId = JSON.parse(localData).vendorId;
      }
    }
  }

  ngOnInit(): void {
    this.loadAirports();
  }

  loadAirports() {
    this.master.getAllAirport().subscribe((res: any) => {
      this.airportList = res.data;
    });
  }

  onSaveFlight() {
    const obj = [this.flightObj];
    this.master.createFlight(obj).subscribe((res: any) => {
      if (res.result) {
        alert('Flight has been Created!');
      } else {
        alert(res.message);
      }
    });
  }
}
