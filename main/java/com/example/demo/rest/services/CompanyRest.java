package com.example.demo.rest.services;

import java.sql.Date;
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
import com.example.demo.webBeans.WebCoupon;

import exceptions.CouponSystemException;
import facades.CompanyFacade;
import javaBeansClasses.Company;
import javaBeansClasses.Coupon;
import javaBeansClasses.CouponType;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping ("/Company")
public class CompanyRest {

	public CompanyFacade getCompanyFacade(HttpServletRequest request) throws CouponSystemException {
		// CompanyFacade companyFacade = (CompanyFacade)
		// CouponSystem.getInstance().login("company1", "password1",
		// ClientType.COMPANY);
		CompanyFacade companyFacade = (CompanyFacade) request.getSession().getAttribute("facade");
		return companyFacade;
	}

	@RequestMapping(value = "/createcoupon", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createCoupon(HttpServletRequest request, @RequestBody WebCoupon webCoupon)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = webCoupon.convertToCoupon();
			companyFacade.createCoupon(coupon);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to create a coupon");
		}
	}

	@RequestMapping(value = "/deletecoupon", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void removeCoupon(HttpServletRequest request, @RequestBody WebCoupon webCoupon)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = webCoupon.convertToCoupon();
			companyFacade.removeCoupon(coupon);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to delete a coupon");
		}
	}

	@RequestMapping(value = "/updatecoupon", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateCoupon(HttpServletRequest request, @RequestBody WebCoupon webCoupon)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = webCoupon.convertToCoupon();
			companyFacade.updateCoupon(coupon);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to update a coupon");
		}
	}

	@RequestMapping(value = "/getcoupon/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public WebCoupon getCoupon(HttpServletRequest request, @PathVariable("id") long id) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = companyFacade.getCoupon(id);
			WebCoupon webCoupon = new WebCoupon(coupon);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to get a coupon's details");
			return webCoupon;
		}
		return null;

	}

	@RequestMapping(value = "/getcompany", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public WebCompany getCompany(HttpServletRequest request) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Company company = companyFacade.getCompany();
			WebCompany webCompany = new WebCompany(company);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to get it's details");
			return webCompany;
		}
		return null;

	}

	@RequestMapping(value = "/getallcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getAllCoupons(HttpServletRequest request) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = companyFacade.getAllCoupons();
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to get all of it's coupons");
			return webCoupons;
		}
		return null;
	}

	@RequestMapping(value = "/getcouponsbytype/{type}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getCouponsByType(HttpServletRequest request, @PathVariable("type") CouponType type)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = companyFacade.getCouponsByType(type);
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to get all of it's coupons by type " + type);
			return webCoupons;
		}
		return null;
	}

	@RequestMapping(value = "/getcouponsbyprice/{price}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getCouponsByPrice(HttpServletRequest request, @PathVariable("price") double price)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = companyFacade.getCouponsByPrice(price);
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to get all of it's coupons by price " + price);
			return webCoupons;
		}
		return null;
	}

	@RequestMapping(value = "/getcouponsbydate/{date}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<WebCoupon> getCouponsByDate(HttpServletRequest request, @PathVariable("date") Date date)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Collection<WebCoupon> webCoupons = new ArrayList<>();
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = companyFacade.getCouponsByDate(date);
			webCoupons = WebCoupon.convertToWebCoupons(coupons);
			Log4j2.LOG.info("Company " + companyFacade.getCompany().getCompName() + " tried to get all of it's coupons by date " + date);
			return webCoupons;
		}
		return null;
	}

}
