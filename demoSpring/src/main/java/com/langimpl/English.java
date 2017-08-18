package com.langimpl;

import com.lang.Language;

public class English implements Language{

    public String getGreeting() {
        return "Hello!";
    }

    public String getBye(){
        return "Bye bye!";
    }
}
