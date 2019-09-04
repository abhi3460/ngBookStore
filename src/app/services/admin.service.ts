import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AdminService {
  http: any;

  static get parameters() {
		return [Http];
  }

  constructor(http) {
  	this.http = http;
  }

  addAdmin(adminData) {
    let searchUrl = "http://localhost:3000/addnewadmin";
  	let headers = new Headers();
  	headers.append("Content-Type", "application/json");
  	let options = new RequestOptions({
  		headers: headers
  	});

  	return this.http.post(searchUrl, JSON.stringify({ adminData: adminData }), options).map(response => response.json());
  }

  adminLogin(loginData) {
    let searchUrl = "http://localhost:3000/adminlogin";
  	let headers = new Headers();
  	headers.append("Content-Type", "application/json");
  	let options = new RequestOptions({
  		headers: headers
  	});

  	return this.http.post(searchUrl, JSON.stringify({ loginData: loginData }), options).map(response => response.json());
  }
}
