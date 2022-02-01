package com;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;


@SpringBootApplication
@EnableMongoRepositories
public class ServerApplication {

	private static final Logger log = LoggerFactory.getLogger(ServerApplication.class);

	@EventListener
	public void handleContextRefresh(ContextRefreshedEvent event) {
		ApplicationContext applicationContext = event.getApplicationContext();
		applicationContext.getBean(RequestMappingHandlerMapping.class)
				.getHandlerMethods().forEach((key, value) -> log.info("Request Handlers {} -> {}", key, value));
	}

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
