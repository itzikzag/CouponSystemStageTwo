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

  showSpinner: boolean = true;

  constructor(private servicer: AdminService) { }

  ngOnInit() {
    var self = this;
    self.customers = new Array();
    self.servicer.getAllCustomers().subscribe(
      (customers)=> {
        this.showSpinner = false;
        for (let c of customers) {
          c = new Customer(c);
          self.customers.push(c);
        }
      }
    );
  } 
 
  clickDelete() {
    var self = this;
    self.showSpinner = true;
    var message = this.customer.getCustName + " was deleted";
    this.servicer.deleteCustomer(this.customer).subscribe(
      (success)=> {
        self.showSpinner = false;
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
    this.showSpinner = true;
    var message = this.customer.getCustName + " was successfully updated!";
    this.servicer.updateCustomer(this.customer).subscribe(
      (success)=> {
        this.showSpinner = false;
        swal({
          title: "Great job!",
          text: message,
          icon: "success",
        });
        this.reset();
       }
    );
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  reset(){
    var self = this;
    self.showSpinner = true;
    self.customers = new Array();
    self.servicer.getAllCustomers().subscribe(
      (customers) => {
        self.showSpinner = false;
        for (let c of customers) {
          c = new Customer(c);
          self.customers.push(c);
        }
      }
    );

  }
}
