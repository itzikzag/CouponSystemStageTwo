package com.example.demo.rest.services;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import couponSystemSingleton.CouponSystem;
import exceptions.CouponSystemException;
import facades.ClientType;
import facades.CouponClientFacade;


@Controller
public class ServletController {
	
	@RequestMapping(value = "/servlet", method = RequestMethod.POST)
	public void doPost(HttpServletResponse response, HttpServletRequest request, @RequestParam String name,
			@RequestParam String pass, @RequestParam ClientType ctype) throws IOException {
		switch (ctype) {
		case ADMIN:
			CouponClientFacade adminFacade = null;
			try {
				adminFacade = CouponSystem.getInstance().login(name, pass, ctype);
				request.getSession().setAttribute("facade", adminFacade);
				request.getSession().setAttribute("authenticated", true);
				} catch (CouponSystemException e) {
				response.sendRedirect("/fail.html");
			}
			if (adminFacade != null) {
				response.sendRedirect("/Admin/index.html");
			}

			break;

		case COMPANY:
			CouponClientFacade companyFacade = null;
			try {
				companyFacade = CouponSystem.getInstance().login(name, pass, ctype);
				request.getSession().setAttribute("facade", companyFacade);
				request.getSession().setAttribute("authenticated", true);
			} catch (CouponSystemException e) {
				response.sendRedirect("/fail.html");
			}
			if (companyFacade != null) {
				response.sendRedirect("/Company/index.html");
			}
			break;

		case CUSTOMER:
			CouponClientFacade customerFacade = null;
			try {
				customerFacade = CouponSystem.getInstance().login(name, pass, ctype);
				request.getSession().setAttribute("facade", customerFacade);
				request.getSession().setAttribute("authenticated", true);
			} catch (CouponSystemException e) {
				response.sendRedirect("/fail.html");
			}
			if (customerFacade != null) {
				response.sendRedirect("/Customer/index.html");
			}
			break;

		default:
			break;
		}

	}
	
}