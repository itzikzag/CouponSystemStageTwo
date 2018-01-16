package com.example.demo.webBeans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.xml.bind.annotation.XmlRootElement;

import javaBeansClasses.Coupon;
import javaBeansClasses.Customer;

@XmlRootElement
public class WebCustomer implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String custName;
	private String password;
	private Collection<Coupon> coupons;

	public WebCustomer() {

	}

	public WebCustomer(Customer customer) {
		this.id = customer.getId();
		this.custName = customer.getCustName();
		this.password = customer.getPassword();
		this.coupons = customer.getCoupons();
	}

	public Customer convertToCustomer() {
		Customer customer = new Customer(this.id, this.custName, this.password);
		return customer;
	}

	public static Collection<WebCustomer> convertToWebCustomers(Collection<Customer> customers) {
		Collection<WebCustomer> webCustomers = new ArrayList<>();
		for (Customer customer : customers) {
			webCustomers.add(new WebCustomer(customer));
		}
		return webCustomers;

	}

	public static Collection<Customer> convertToCustomers(Collection<WebCustomer> webCustomers) {
		Collection<Customer> customers = new ArrayList<>();
		for (WebCustomer webCustomer : webCustomers) {
			customers.add(webCustomer.convertToCustomer());
		}
		return customers;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Collection<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<Coupon> coupons) {
		this.coupons = coupons;
	}

	@Override
	public String toString() {
		return "WebCustomer [id=" + id + ", custName=" + custName + ", password=" + password + ", coupons=" + coupons
				+ "]";
	}

}
