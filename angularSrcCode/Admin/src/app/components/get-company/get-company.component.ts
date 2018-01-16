import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-company',
  templateUrl: './get-company.component.html',
  styleUrls: ['./get-company.component.css']
})
export class GetCompanyComponent implements OnInit {

  public company: Company = new Company();
  public id: number;
  public messageError: String;
  public messageSuccess: String;

  constructor(private servicer: AdminService) { }

  onClicked() {
    var self = this;
    this.messageError = undefined;
    this.messageSuccess = undefined;
    self.servicer.getCompany(this.id).subscribe(
      (company) => {
        this.company = new Company(company);
        if (this.company.getId == 0) {
          this.messageSuccess = 'there is no company with that id!'
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
