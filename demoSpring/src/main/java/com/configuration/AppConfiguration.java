package com.configuration;

import com.lang.Language;
import com.langimpl.English;
import com.langimpl.Vietnamese;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"com.langservice"})
public class AppConfiguration {

    @Bean(name="language")
    public Language getLanguage(){
        //return new Vietnamese();
        return new English();
    }

}
