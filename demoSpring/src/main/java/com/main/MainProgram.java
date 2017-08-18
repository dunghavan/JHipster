package com.main;

import com.configuration.AppConfiguration;
import com.lang.Language;
import com.langservice.LanguageService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MainProgram {

    public static void main(String[] args){

        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfiguration.class);

        Language language = (Language)context.getBean("language");
        System.out.println("Bean Language: "+ language);
        System.out.println("Call language.sayBye(): "+ language.getBye());

        LanguageService languageService = (LanguageService)context.getBean("languageService");
        languageService.sayBye();

    }
}
