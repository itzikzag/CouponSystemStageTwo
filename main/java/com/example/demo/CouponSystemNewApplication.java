package com.example.demo;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.example.demo.filters.ServletFilter;

@SpringBootApplication
public class CouponSystemNewApplication {

	private @Autowired AutowireCapableBeanFactory beanFactory;
	public static void main(String[] args) {
		SpringApplication.run(CouponSystemNewApplication.class, args);
	}
	
	@Bean
	public FilterRegistrationBean SessionAuthenticationFilter() {
		FilterRegistrationBean filterRego = new FilterRegistrationBean();
		Filter sessionAuthFilter = new ServletFilter();
		beanFactory.autowireBean(sessionAuthFilter);
		
		filterRego.setFilter(sessionAuthFilter);
		filterRego.addUrlPatterns("/admin/*");
		filterRego.addUrlPatterns("/company/*");
		filterRego.addUrlPatterns("/customer/*");
		return filterRego;
	}
}
