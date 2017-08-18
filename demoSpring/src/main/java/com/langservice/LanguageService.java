package com.langservice;

import com.lang.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {
    @Autowired
    private Language language;

    public LanguageService( ) {
    }

    public void sayGreeting(){
        System.out.println("Greeting: " + language.getGreeting());
    }
    public void sayBye(){
        System.out.println("Goodbye: " + language.getBye());
    }
}
