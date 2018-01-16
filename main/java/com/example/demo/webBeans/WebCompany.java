package com.example.demo.webBeans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.xml.bind.annotation.XmlRootElement;

import javaBeansClasses.Company;
import javaBeansClasses.Coupon;

@XmlRootElement
public class WebCompany implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String compName;
	private String password;
	private String email;
	private Collection<Coupon> coupons;

	public WebCompany() {
	}

	public WebCompany(Company company) {
		this.id = company.getId();
		this.compName = company.getCompName();
		this.password = company.getPassword();
		this.email = company.getEmail();
		this.coupons = company.getCoupons();
	}

	public Company convertToCompany() {
		Company company = new Company(this.id, this.compName, this.password, this.email);
		return company;
	}

	public static Collection<WebCompany> convertToWebCompanies(Collection<Company> companies) {
		Collection<WebCompany> webCompanies = new ArrayList<>();
		for (Company company : companies) {
			webCompanies.add(new WebCompany(company));
		}
		return webCompanies;
	}

	public static Collection<Company> convertToCompanies(Collection<WebCompany> webCompanies) {
		Collection<Company> companies = new ArrayList<>();
		for (WebCompany webCompany : webCompanies) {
			companies.add(webCompany.convertToCompany());
		}
		return companies;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<Coupon> coupons) {
		this.coupons = coupons;
	}

	@Override
	public String toString() {
		return "WebCompany [id=" + id + ", compName=" + compName + ", password=" + password + ", email=" + email
				+ ", coupons=" + coupons + "]";
	}

}
