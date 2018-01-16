import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy,  LocationStrategy } from '@angular/common';

import { AdminService } from './services/admin.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GetCompanyComponent } from './components/get-company/get-company.component';
import { GetallcompaniesComponent } from './components/getallcompanies/getallcompanies.component';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { GetallcustomersComponent } from './components/getallcustomers/getallcustomers.component';
import { GetCustomerComponent } from './components/get-customer/get-customer.component';
import { CreatecustomerComponent } from './components/createcustomer/createcustomer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetCompanyComponent,
    GetallcompaniesComponent,
    CreatecompanyComponent,
    GetallcustomersComponent,
    GetCustomerComponent,
    CreatecustomerComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'header',
        component: HeaderComponent
      },
      {
        path: 'createcompany',
        component: CreatecompanyComponent
      },
      {
        path: 'getallcompanies',
        component: GetallcompaniesComponent
      },
      {
        path: 'getcompany',
        component: GetCompanyComponent
      },
      {
        path: 'createcustomer',
        component: CreatecustomerComponent
      },
      {
        path: 'getallcustomers',
        component: GetallcustomersComponent
      },
      {
        path: 'getcustomer',
        component: GetCustomerComponent
      }
    ])
  ],
  providers: [AdminService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
