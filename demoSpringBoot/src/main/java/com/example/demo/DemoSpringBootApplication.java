package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoSpringBootApplication.class, args);
	}

	@RequestMapping("/Hello")
	public String sayHello(){
		return "Hello Dung HV";
	}
}
