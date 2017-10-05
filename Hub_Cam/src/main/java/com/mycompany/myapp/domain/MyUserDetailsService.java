package com.mycompany.myapp.domain;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface MyUserDetailsService {
    MyUserDetails loadMyUserByUsername(String username) throws UsernameNotFoundException;
}
