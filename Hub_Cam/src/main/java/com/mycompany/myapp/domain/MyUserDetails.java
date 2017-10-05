package com.mycompany.myapp.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;

public interface MyUserDetails extends UserDetails{
    public Organization getOrganization();

}
