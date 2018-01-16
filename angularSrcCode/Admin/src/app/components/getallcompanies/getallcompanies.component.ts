import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-getallcompanies',
  templateUrl: './getallcompanies.component.html',
  styleUrls: ['./getallcompanies.component.css']
})
export class GetallcompaniesComponent implements OnInit {
  
  public companies: Company[] = [];
  public company: Company = new Company();
  
  constructor(private servicer: AdminService) { }
  
  ngOnInit() {
    var self = this;
    this.companies = new Array();
    self.servicer.getAllCompanies().subscribe(
      function (companies) {
        for (let c of companies) {
          c = new Company(c);
          self.companies.push(c);
        }
      }
    );
  
  }
  clickDelete() {
    var self = this;
    this.servicer.deleteCompany(this.company).subscribe(
      (success)=> {
        var message = this.company.getCompName + " was successfully deleted!";
        swal({
          title: "GREAT!",
          text: message,
          icon: "success",
        });
        this.reset();
       }
    );
  }
  clickUpdate() {
    this.servicer.updateCompany(this.company).subscribe(
      (success)=> {
        var message = this.company.getCompName + " was successfully updated!"
        swal("Great job!", message, "success", {
        });
        this.reset();
       }
    );
  }
  

  setCompany(company: Company) {
    this.company = company;
  }

  reset(){
    var self = this;
    this.companies = new Array();
    self.servicer.getAllCompanies().subscribe(
      function (companies) {
        for (let c of companies) {
          c = new Company(c);
          self.companies.push(c);
        }
      }
    );
  }

}
