package com.langimpl;

import com.lang.Language;

public class Vietnamese implements Language {
    public String getGreeting(){
        return "Xin chao!";
    }

    public String getBye() {
        return "Tam biet!";
    }
}
