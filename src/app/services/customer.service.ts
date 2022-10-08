import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from "../config/api-route-points";
import { AuthService } from '../core/services/auth.service';
import { Customer } from "../interfaces/index";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getCustomers() {
    return this.http.get(apiRoutes.customer.Get);
  }

  checkCustomer(data: Customer) {
    let firstcustomer = data && JSON.stringify(data);
    let timestamp = new Date().toISOString();
    firstcustomer = window.btoa(firstcustomer);
    let payload = { firstcustomer, timestamp }
    const token = this.auth.getAuthorizationToken();
    let options = { headers: new HttpHeaders({ "x-client-id": token }) }
    return this.http.post(apiRoutes.customer.Post, payload, options);
  }

}
