import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';


@Component({
  selector: 'app-getallcustomers',
  templateUrl: './getallcustomers.component.html',
  styleUrls: ['./getallcustomers.component.css']
})
export class GetallcustomersComponent implements OnInit {

  public customers: Customer[] = [];
  public customer: Customer = new Customer();

  constructor(private servicer: AdminService) { }

  clickDelete() {
    var self = this;
    var message = this.customer.getCustName + " was deleted";
    this.servicer.deleteCustomer(this.customer).subscribe(
      (success)=> {
        swal({
          title: "Oh",
          text: message,
          icon: "success",
        });
        this.reset();
       }
    );
  }

  clickUpdate() {
    var message = this.customer.getCustName + " was successfully updated!";
    this.servicer.updateCustomer(this.customer).subscribe(
      (success)=> {
        swal({
          title: "Great job!",
          text: message,
          icon: "success",
        });
        this.reset();
       }
    );
  }

  ngOnInit() {
    var self = this;
    self.customers = new Array();
    self.servicer.getAllCustomers().subscribe(
      function (customers) {
        for (let c of customers) {
          c = new Customer(c);
          self.customers.push(c);
        }
      }
    );
  }
  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  reset(){
    var self = this;
    self.customers = new Array();
    self.servicer.getAllCustomers().subscribe(
      function (customers) {
        for (let c of customers) {
          c = new Customer(c);
          self.customers.push(c);
        }
      }
    );

  }
}
