import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public customer : Customer = new Customer();
  constructor(private servicer: CustomerService) { }

  ngOnInit() {
    var self = this;
    self.servicer.getCustomer().subscribe (
      (customer)=>{
        this.customer = new Customer(customer);
      },
      (error)=>console.log('something went wrong...')
    );
  }

}
