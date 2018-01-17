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

import com.example.demo.webBeans.WebCoupon;
import com.example.demo.webBeans.WebCustomer;

import exceptions.CouponSystemException;
import facades.CustomerFacade;
import javaBeansClasses.Coupon;
import javaBeansClasses.CouponType;
import javaBeansClasses.Customer;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping ("/Customer")
public class CustomerRest {

	public CustomerFacade getCustomerFacade(HttpServletRequest request) throws CouponSystemException {
		// CustomerFacade customerFacade = (CustomerFacade)
		// CouponSystem.getInstance().login("customer1", "password1",
		// ClientType.CUSTOMER);
		CustomerFacade customerFacade = (CustomerFacade) request.getSession().getAttribute("facade");
		return customerFacade;
	}

	@RequestMapping(value = "/purchasecoupon", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void purchaseCoupon(HttpServletRequest request, @RequestBody WebCoupon webCoupon)
			throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if (customerFacade != null) {
			Coupon coupon = webCoupon.convertToCoupon();
			customerFacade.purchaseCoupon(coupon);
			Log4j2.LOG.info("Customer " + customerFacade.getCustomer().getCustName() + " tried to purchase a coupon");
		}
	}

	@RequestMapping(value = "/viewallcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> viewAllCoupons(HttpServletRequest request) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if (customerFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = customerFacade.viewAllCoupons();
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Customer " + customerFacade.getCustomer().getCustName() + " tried to view all of the coupons in the system");
			return webCoupons;
		}
		return null;

	}

	@RequestMapping(value = "/getallpurchasedcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getAllPurchasedCoupons(HttpServletRequest request) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if (customerFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = customerFacade.getAllPurchasedCoupons();
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Customer " + customerFacade.getCustomer().getCustName() + " tried to view all of his coupons");
			return webCoupons;
		}
		return null;
	}

	@RequestMapping(value = "/getallpurchasedcouponsbytype/{type}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getAllPurchasedCouponsByType(HttpServletRequest request,
			@PathVariable("type") CouponType type) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if (customerFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = customerFacade.getAllPurchasedCouponsByType(type);
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Customer " + customerFacade.getCustomer().getCustName() + " tried to view all of his coupons ordered by type " + type);
			return webCoupons;
		}
		return null;
	}

	@RequestMapping(value = "/getallpurchasedcouponsbyprice/{price}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getAllPurchasedCouponsByPrice(HttpServletRequest request,
			@PathVariable("price") int price) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if (customerFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = customerFacade.getAllPurchasedCouponsByPrice(price);
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Customer " + customerFacade.getCustomer().getCustName() + " tried to view all of his coupons ordered by price " + price);
			return webCoupons;
		}
		return null;
	}
	
	@RequestMapping(value = "/getcustomer", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public WebCustomer getCustomer(HttpServletRequest request) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if (customerFacade != null) {
			Customer customer = customerFacade.getCustomer();
			WebCustomer webCustomer = new WebCustomer(customer);
			Log4j2.LOG.info("Customer " + customerFacade.getCustomer().getCustName() + " tried to view his details");	
			return webCustomer;
		}
		return null;

	} 
	@RequestMapping(value = "/customerlogout", method = RequestMethod.GET)
	public void logout(HttpServletRequest request)
			throws CouponSystemException
	{
		request.getSession().invalidate();
	}

}
