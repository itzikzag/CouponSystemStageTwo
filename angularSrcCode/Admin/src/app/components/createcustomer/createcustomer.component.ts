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
  public messageSuccess: String;
  public messageError: String;

  showSpinner: boolean = true;

  constructor(private servicer: AdminService, private fb: FormBuilder) { }

  ngOnInit() {
    var self = this;
    this.customers = new Array();
    self.servicer.getAllCustomers().subscribe(
      (customers) => {
        self.showSpinner = false;
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
  createCustomer() {

    this.showSpinner = true;
    this.messageSuccess = undefined;
    this.messageError = undefined;
    this.servicer.createCustomer(this.customer).subscribe(
      (success) => {
        this.showSpinner = false;
        this.messageSuccess = 'Customer was created successfully!';
      },
      (error) => {
        this.showSpinner = false;
        this.messageError = 'Could not create the customer';
      }
    );
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
