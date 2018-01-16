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
  showSpinner : boolean = true;

  constructor(private servicer: CompanyService) { }

  ngOnInit() {
    var self = this;
    self.servicer.getCompany().subscribe(
      (company) => {
        self.showSpinner = false;
        this.company = new Company(company);
      },
      (error) => {
        self.showSpinner = false;
        console.log('something went wrong...')
      }
    );
  }
}
