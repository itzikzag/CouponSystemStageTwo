package com.example.demo.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;

/**
 * Servlet Filter implementation class ServletFilter
 */
@WebFilter("/ServletFilter")
public class ServletFilter implements Filter
{

	/**
	 * Default constructor.
	 */
	public ServletFilter()
	{
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy()
	{
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		HttpServletRequest servletRequest = (HttpServletRequest) request;
		HttpSession session = servletRequest.getSession();

		boolean authenticated = true;

		if (session.getAttribute("authenticated") != null)
		{
			authenticated = (boolean) session.getAttribute("authenticated");
		} else
		{
			authenticated = false;
		}

		if (authenticated)
		{
			chain.doFilter(request, response);
		} else
		{
			HttpServletResponse servletResponse = (HttpServletResponse) response;
			servletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE");
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException
	{
		// TODO Auto-generated method stub
	}

}
