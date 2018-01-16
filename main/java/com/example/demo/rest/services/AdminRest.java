package com.example.demo.rest.services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.webBeans.WebCompany;
import com.example.demo.webBeans.WebCustomer;

import exceptions.CouponSystemException;
import facades.AdminFacade;
import javaBeansClasses.Company;
import javaBeansClasses.Customer;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping ("/Admin")
public class AdminRest
{

	public AdminFacade getAdminFacade(HttpServletRequest request) throws CouponSystemException
	{
		// AdminFacade adminFacade = (AdminFacade)
		// CouponSystem.getInstance().login("admin", "1234", ClientType.ADMIN);
		// return adminFacade;
		AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute("facade");

		return adminFacade;
	}

	@RequestMapping(value = "/createcompany", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createCompany(HttpServletRequest request, @RequestBody WebCompany webCompany)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Company company = webCompany.convertToCompany();
			adminFacade.createCompany(company);
			Log4j2.LOG.info("admin tried to create a company");

		}
	}

	@RequestMapping(value = "/deletecompany", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void removeCompany(HttpServletRequest request, @RequestBody WebCompany webCompany)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Company company = webCompany.convertToCompany();
			adminFacade.removeCompany(company);
			Log4j2.LOG.info("admin tried to delete a company");
		}
	}

	@RequestMapping(value = "/updatecompany", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateCompany(HttpServletRequest request, @RequestBody WebCompany webCompany)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Company company = webCompany.convertToCompany();
			adminFacade.updateCompany(company);
			Log4j2.LOG.info("admin tried to update a company");
		}
	}

	@RequestMapping(value = "/getcompany/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public WebCompany getCompany(HttpServletRequest request, @PathVariable("id") long id) throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Company company = adminFacade.getCompany(id);
			WebCompany webCompany = new WebCompany(company);
			Log4j2.LOG.info("admin tried to get a company's details");
			return webCompany;
		}
		return null;

	}

	@RequestMapping(value = "/getallcompanies", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCompany> getAllCompanies(HttpServletRequest request) throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Collection<WebCompany> webCompanies = new ArrayList<>();
			Collection<Company> companies = new ArrayList<>();
			companies = adminFacade.getAllCompanies();
			webCompanies = WebCompany.convertToWebCompanies(companies);
			Log4j2.LOG.info("admin tried to create all companies");
			return webCompanies;
		}
		return null;

	}

	@RequestMapping(value = "/createcustomer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createCustomer(HttpServletRequest request, @RequestBody WebCustomer webCustomer)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Customer customer = webCustomer.convertToCustomer();
			adminFacade.createCustomer(customer);
			Log4j2.LOG.info("admin tried to create a customer");
		}
	}

	@RequestMapping(value = "/deletecustomer", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void removeCustomer(HttpServletRequest request, @RequestBody WebCustomer webCustomer)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Customer customer = webCustomer.convertToCustomer();
			adminFacade.removeCustomer(customer);
			Log4j2.LOG.info("admin tried to delete a company");
		}
	}

	@RequestMapping(value = "/updatecustomer", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateCustomer(HttpServletRequest request, @RequestBody WebCustomer webCustomer)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Customer customer = webCustomer.convertToCustomer();
			adminFacade.updateCustomer(customer);
			Log4j2.LOG.info("admin tried to update a customer");
		}
	}

	@RequestMapping(value = "/getcustomer/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public WebCustomer getCustomer(HttpServletRequest request, @PathVariable("id") long id) throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Customer customer = adminFacade.getCustomer(id);
			WebCustomer webCustomer = new WebCustomer(customer);
			Log4j2.LOG.info("admin tried to get a customer's details");
			return webCustomer;
		}
		return null;
	}

	@RequestMapping(value = "/getallcustomers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCustomer> getAllCustomers(HttpServletRequest request) throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			Collection<WebCustomer> webCustomers = new ArrayList<>();
			Collection<Customer> customers = new ArrayList<>();
			customers = adminFacade.getAllCustomers();
			webCustomers = WebCustomer.convertToWebCustomers(customers);
			Log4j2.LOG.info("admin tried to get all the customers details");
			return webCustomers;
		}
		return null;
	}

	@RequestMapping(value = "/uniquename/{compName}", method = RequestMethod.GET)
	public boolean companyNameIsTaken(HttpServletRequest request, @PathVariable("compName") String compName)
			throws CouponSystemException
	{
		AdminFacade adminFacade = getAdminFacade(request);
		if (adminFacade != null)
		{
			boolean taken = false;
			taken = adminFacade.companyNameIsTaken(compName);
			Log4j2.LOG.info("a test to check if name is taken was made");
			return taken;
		}
		return false;
	}

}
