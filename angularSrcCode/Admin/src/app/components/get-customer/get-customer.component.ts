import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css']
})
export class GetCustomerComponent implements OnInit {

  public customer: Customer = new Customer();
  public id: number;
  public messageError: String;
  public messageSuccess: String;

  constructor(private servicer: AdminService) { }

  onClicked() {
    var self = this;
    this.messageError = undefined;
    this.messageSuccess = undefined;
    self.servicer.getCustomer(this.id).subscribe(
      (customer) => {
        this.customer = new Customer(customer);
        if (this.customer.getId == 0) {
          this.messageSuccess = 'There is no customer with that ID!';
        }
      },
      (error) => {
        this.messageError = 'something went wrong';
      }
    );
  }

  ngOnInit() {
  }

}
