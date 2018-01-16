import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

  public newCustomerForm: FormGroup;
  public customer: Customer = new Customer();
  public customers: Customer[];
  public messageSuccess : String;
  public messageError : String;

  constructor(private servicer: AdminService, private fb: FormBuilder) { }

  createCustomer() {

    this.messageSuccess = undefined;
    this.messageError = undefined;
    this.servicer.createCustomer(this.customer).subscribe(
       (success)=>{
        this.messageSuccess = 'Customer was created successfully!';
      },
      (error)=>{
        this.messageError = 'Could not create the customer';
      }
    );
  }

  ngOnInit() {
    var self = this;
    this.customers = new Array();
    self.servicer.getAllCustomers().subscribe(
      function (customers) {
        for (let c of customers) {
          c = new Customer(c);
          self.customers.push(c);
        }
      }
    );
    self.newCustomerForm = self.fb.group({
      'custName': [null, [Validators.required, self.uniqueNameValidator.bind(this)]],
      'password': [null, [Validators.required]]
    })
  }

  uniqueNameValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;
    var taken: boolean = false;
    for (let customer of self.customers) {
      if (customer.getCustName === control.value) {
        taken = true;
        break;
      }
    }
    if (taken === true) {
      return { 'NameIsTaken': true };
    }
    return null;
  }

}
