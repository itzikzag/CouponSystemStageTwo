import { CompanyService } from './../../services/company.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getcompany',
  templateUrl: './getcompany.component.html',
  styleUrls: ['./getcompany.component.css']
})
export class GetcompanyComponent implements OnInit {

  public company: Company = new Company();
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
