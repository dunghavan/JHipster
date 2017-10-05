package com.mycompany.myapp.domain;

import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.DomainUserDetailsService;
import com.mycompany.myapp.security.UserNotActivatedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Component("myUserDetailsService")
public class DomainMyUserDetailsService implements MyUserDetailsService{

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final UserRepository userRepository;

    public DomainMyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public MyUserDetails loadMyUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        Optional<MyUser> userFromDatabase = userRepository.findOneWithAuthoritiesByLogin(lowercaseLogin);
        return userFromDatabase.map(user -> {
            if (!user.getActivated()) {
                throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
            }

//            List<GrantedAuthority> grantedAuthorities = user.getUserAuthorities().stream()
//                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
//                .collect(Collectors.toList());

            return new MyUser(lowercaseLogin,
                user.getPassword(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getActivated(), user.getLangKey()
                , user.getImageUrl(), user.getActivationKey(), user.getResetKey(), user.getResetDate(), user.getOrganization(),
                user.getUserAuthorities());
        }).orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the " +
            "database"));
    }

}
