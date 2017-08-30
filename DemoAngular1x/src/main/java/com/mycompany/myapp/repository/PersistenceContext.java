//package com.mycompany.myapp.repository;
//
//import javax.sql.DataSource;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//
//@Configuration
//@EnableTransactionManagement
//@EnableJpaAuditing(dateTimeProviderRef = "dateTimeProvider")
//@EnableJpaRepositories(basePackages = {
//    "net.petrinulainen.springdata.jpa.todo"})
//
//public class PersistenceContext {
//    @Bean
//    NamedParameterJdbcTemplate jdbcTemplate(DataSource dataSource) {
//        return new NamedParameterJdbcTemplate(dataSource);
//    }
//
//    //Other beans are omitted for the sake of clarity
//}
