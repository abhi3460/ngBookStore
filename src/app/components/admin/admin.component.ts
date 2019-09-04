import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  route;
  router;  
  adminService;
  email: string;
  password: string;
  
  static get parameters() {
		return [ActivatedRoute, Router, AdminService];
	}

  constructor(route, router, adminService) {
    this.route = route;
    this.adminService = adminService;
    this.router = router;
  }

  ngOnInit() {}

  adminLogin() {
    let loginData = {
      loginemail: this.email,
      loginpassword: this.password
    }

    this.adminService.adminLogin(loginData).subscribe(result => {
      if(result.success) {
        alert(result.message);
        this.router.navigate(["/manage"]);
      }
      else {
        alert(result.message);
        this.router.navigate(["/adminLogin"]);
      }
    });
  }

}
