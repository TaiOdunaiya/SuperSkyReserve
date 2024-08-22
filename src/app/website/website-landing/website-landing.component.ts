import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MasterService } from '../../core/service/master.service';

@Component({
  selector: 'app-website-landing',
  templateUrl: './website-landing.component.html',
  styleUrls: ['./website-landing.component.css']
})
export class WebsiteLandingComponent implements OnInit {
  loggedUserData: any;
  registerObj: any = {
    "name": "",
    "mobileNo": "",
    "email": "",
    "city": "",
    "address": "",
    "password": ""
  };
  loginObj: any = {
    "email": "string",
    "password": "string"
  };

  constructor(
    private master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isLocal = localStorage.getItem('flightCustomer');
      if (isLocal != null) {
        this.loggedUserData = JSON.parse(isLocal);
      }
    }
  }

  logff() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('flightCustomer');
      this.loggedUserData = undefined;
    }
  }

  onSave() {
    this.master.register(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Register Success');
        this.closeRegister();
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.master.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('Login Success');
        this.loggedUserData = res.data;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('flightCustomer', JSON.stringify(res.data));
        }
        this.closeLogin();
      } else {
        alert(res.message);
      }
    });
  }

  openRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = "none";
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = "none";
    }
  }
}