package com.example.demo.rest.services;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import facades.AdminFacade;
import facades.CompanyFacade;
import facades.CustomerFacade;

@Controller
public class AuthRest
{
	@RequestMapping(value = "/adminlogincheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean adminLoginCheck(HttpServletRequest request)
	{
		AdminFacade loggedIn = (AdminFacade) request.getSession().getAttribute("facade");
		if(loggedIn == null){
			return false;
		}
		return true;
	}
	
	@RequestMapping(value = "/companylogincheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean companyLoginCheck(HttpServletRequest request)
	{
		CompanyFacade loggedIn = (CompanyFacade) request.getSession().getAttribute("facade");
		if(loggedIn == null){
			return false;
		}
		return true;
	}
	
	@RequestMapping(value = "/customerlogincheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean customerLoginCheck(HttpServletRequest request)
	{
		CustomerFacade loggedIn = (CustomerFacade) request.getSession().getAttribute("facade");
		if(loggedIn == null){
			return false;
		}
		return true;
	}
	
	
}
