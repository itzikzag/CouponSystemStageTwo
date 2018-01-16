import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit {

  public newCompanyForm: FormGroup;
  public company: Company = new Company();
  public companies: Company[] = [];
  public messageSuccess : String;
  public messageError : String;

  constructor(private servicer: AdminService, private fb: FormBuilder) {
    this.newCompanyForm = fb.group ({
      'compName': [null, [Validators.required, this.uniqueNameValidator.bind(this)]],
      'password': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]]
    })
   }

  createCompany() {

    this.messageSuccess = undefined;
    this.messageError = undefined;
    this.servicer.createCompany(this.company).subscribe(
      (success)=>{
        this.messageSuccess = 'Company was created successfully!';
      },
      (error)=>{
        this.messageError = 'Could not create the company';
      }

      
    );
  }

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

  uniqueNameValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;
    var taken: boolean = false;
    for (let index = 0; index < self.companies.length; index++) {
      if (self.companies[index].getCompName === control.value) {
        taken = true;
        break;
      }
    }

    if (taken === true) {
      // console.log(taken)
      return { 'NameIsTaken': true };
    }
    // console.log(taken)
    return null;
  }


}
