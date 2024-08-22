import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent implements OnInit {
  cityList: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllCity();
  }

  getAllCity() {
    this.http
      .get('/api/FlightBooking/GetAllCity')
      .subscribe((res: any) => {
        this.cityList = res.data;
      });
  }

  bulkUpdateCity() {
    this.http
      .post(
        '/api/FlightBooking/AddUpdateBulkCity',
        this.cityList
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Bulk update Success');
        } else {
          alert(res.message);
        }
      });
  }

  addNew() {
    const obj = {
      cityId: 0,
      cityName: '',
    };
    this.cityList.unshift(obj);
  }
}
