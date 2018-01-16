import { CompanyService } from './../../services/company.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public company : Company = new Company();
  constructor(private servicer: CompanyService) { }

  ngOnInit() {
    var self = this;
    self.servicer.getCompany().subscribe(
      (company) => {
        this.company = new Company(company);
      },
      (error) => console.log('something went wrong...')

    );
  }

}
