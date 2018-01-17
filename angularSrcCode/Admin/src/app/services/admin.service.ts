import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class AdminService {

  constructor(private _http: Http) { }

  private urlRel = "./";

  errorHandler(error: Response) {
    return Observable.throw(error);
  }

  getAllCompanies() {
    let url = this.urlRel + 'getallcompanies';
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCompany(id: number) {

    let url = this.urlRel + 'getcompany/' + id;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  createCompany(c: Company) {
    let url = this.urlRel + 'createcompany';
    return this._http.post(url, c)
      .catch(this.errorHandler);
  }

  deleteCompany(c: Company) {
    let url = this.urlRel + 'deletecompany'
    return this._http.delete(url, { body: c })
      .catch(this.errorHandler);
  }

  updateCompany(c: Company) {
    let url = this.urlRel + 'updatecompany'
    return this._http.put(url, c)
      .catch(this.errorHandler);
  }

  getAllCustomers() {
    let url = this.urlRel + 'getallcustomers';
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCustomer(id: number) {
    let url = this.urlRel + 'getcustomer/' + id;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  createCustomer(c: Customer) {
    let url = this.urlRel + 'createcustomer';
    return this._http.post(url, c)
      .catch(this.errorHandler);
  }

  deleteCustomer(c: Customer) {
    let url = this.urlRel + 'deletecustomer'
    return this._http.delete(url, { body: c })
      .catch(this.errorHandler);
  }

  updateCustomer(c: Customer) {
    let url = this.urlRel + 'updatecustomer'
    return this._http.put(url, c)
      .catch(this.errorHandler);

  }
  companyNameIsTaken(compName: string): Observable<boolean> {
    let url = this.urlRel + 'uniquename/' + compName;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  logout() {
    let url = this.urlRel + 'adminlogout';
    return this._http.get(url)
      .catch(this.errorHandler);
  }

  loginCheck() : Observable<boolean>{
    var self = this;
    return self._http.get('../././adminlogincheck')
      .map((res) => res.json())
      .share()
      .catch(this.errorHandler);

  }



}
