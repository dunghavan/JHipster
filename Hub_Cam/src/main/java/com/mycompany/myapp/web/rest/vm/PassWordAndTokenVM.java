package com.mycompany.myapp.web.rest.vm;
    //--------------------------------End add--------------------------------------------

public class PassWordAndTokenVM {
    private String password;
    private String token;

    public PassWordAndTokenVM() {
    }
    public PassWordAndTokenVM(String password, String token) {
        this.password = password;
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String toString(){
        return "PassWordAndTokenVM{" +
            "password='" + password + '\'' +
            ", token='" + token + '\'' +
            "}";
    }
}
