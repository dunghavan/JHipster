package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.config.Constants;
import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.MyUser;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.security.jwt.JWTConfigurer;
import com.mycompany.myapp.security.jwt.TokenProvider;
import com.mycompany.myapp.service.MailService;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.web.rest.vm.ManagedUserVM;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.web.rest.vm.PassWordAndTokenVM;
import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.web.util.ResponseUtil;
import io.jsonwebtoken.*;
import io.swagger.annotations.ApiParam;

import jdk.nashorn.internal.objects.NativeArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the User entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    private static final String ENTITY_NAME = "userManagement";

    private final UserRepository userRepository;

    private final MailService mailService;

    private final UserService userService;

    private final JHipsterProperties jHipsterProperties;

    private String secretKey = "oja[godfgogdkpsjf";

    public UserResource(UserRepository userRepository, MailService mailService,
            UserService userService) {

        this.userRepository = userRepository;
        this.mailService = mailService;
        this.userService = userService;
        this.jHipsterProperties = new JHipsterProperties();
        //secretKey = jHipsterProperties.getSecurity().getAuthentication().getJwt().getSecret();
    }

    //@Dung add ---------------------------------------------------

    /**
     * POST  /users  : Invite a new user.
     *
     */
    @PostMapping("/users/invite")
    @Timed
    //@Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity inviteUser(@Valid @RequestBody ManagedUserVM managedUserVM, HttpServletResponse response) throws URISyntaxException {
        log.debug("REST request to invite User : {}", managedUserVM);

        String jwt = Jwts.builder()
            .setSubject(managedUserVM.getEmail())
            .claim("ORG_KEY", managedUserVM.getOrganization().getId())
            .claim("LANG_KEY", managedUserVM.getLangKey())
            .signWith(SignatureAlgorithm.HS512, secretKey)
            .compact();

        MyUser user = new MyUser(managedUserVM.getEmail(), managedUserVM.getOrganization().getId(), managedUserVM.getLangKey());
        mailService.sendInvitationEmail(user, jwt);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    //--------------------------------End add--------------------------------------------
    /**
     * POST  /users  : Validate to confirm
     */
    @PostMapping("/users")
    @Timed
    //@Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity confirmAndCreateUser(@Valid @RequestBody PassWordAndTokenVM model) throws URISyntaxException {
        log.debug("REST request to confirm User : {}", model);
        if(validateInviteToken(model.getToken())){
            Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(model.getToken())
                .getBody();

            String email = claims.getSubject();
            Long orgId = ((Number)claims.get("ORG_KEY")).longValue();
            String langKey = claims.get("LANG_KEY").toString();

            MyUser user = userService.createUser(email, model.getPassword(), email, langKey, orgId);

            return ResponseEntity.created(new URI("/"))
                .headers(HeaderUtil.createAlert( "userManagement.created", user.getLogin()))
                .body(null);
        }
        return ResponseEntity.badRequest()
            .headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "invalidToken", "Token not valid!"))
            .body(null);




//        if (managedUserVM.getId() != null) {
//            return ResponseEntity.badRequest()
//                .headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new user cannot already have an ID"))
//                .body(null);
//        // Lowercase the user login before comparing with database
//        } else if (userRepository.findOneByLogin(managedUserVM.getLogin().toLowerCase()).isPresent()) {
//            return ResponseEntity.badRequest()
//                .headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "userexists", "Login already in use"))
//                .body(null);
//        } else if (userRepository.findOneByEmail(managedUserVM.getEmail()).isPresent()) {
//            return ResponseEntity.badRequest()
//                .headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "emailexists", "Email already in use"))
//                .body(null);
//        } else {
//            MyUser newUser = userService.createUser(managedUserVM);
//            mailService.sendCreationEmail(newUser);
//            return ResponseEntity.created(new URI("/api/users/" + newUser.getLogin()))
//                .headers(HeaderUtil.createAlert( "userManagement.created", newUser.getLogin()))
//                .body(newUser);
//        }
//
//        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public boolean validateInviteToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.info("Invalid JWT signature.");
            log.trace("Invalid JWT signature trace: {}", e);
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
            log.trace("Invalid JWT token trace: {}", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            log.trace("Expired JWT token trace: {}", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
            log.trace("Unsupported JWT token trace: {}", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
            log.trace("JWT token compact of handler are invalid trace: {}", e);
        }
        return false;
    }


    /**
     * PUT  /users : Updates an existing User.
     *
     * @param managedUserVM the user to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated user,
     * or with status 400 (Bad Request) if the login or email is already in use,
     * or with status 500 (Internal Server Error) if the user couldn't be updated
     */
    @PutMapping("/users")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody ManagedUserVM managedUserVM) {
        log.debug("REST request to update User : {}", managedUserVM);
        Optional<MyUser> existingUser = userRepository.findOneByEmail(managedUserVM.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(managedUserVM.getId()))) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "emailexists", "Email already in use")).body(null);
        }
        existingUser = userRepository.findOneByLogin(managedUserVM.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(managedUserVM.getId()))) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "userexists", "Login already in use")).body(null);
        }
        Optional<UserDTO> updatedUser = userService.updateUser(managedUserVM);

        return ResponseUtil.wrapOrNotFound(updatedUser,
            HeaderUtil.createAlert("userManagement.updated", managedUserVM.getLogin()));
    }

    /**
     * GET  /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users")
    @Timed
    public ResponseEntity<List<UserDTO>> getAllUsers(@ApiParam Pageable pageable) {
        final Page<UserDTO> page = userService.getAllManagedUsers(pageable);
//        for (UserDTO u : page) {
//            log.debug("\n---------MyLog: " + u.toString());
//        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /users : get users by orgId.
     *
     */
    @GetMapping("/users/get-by-org-id")
    @Timed
    public ResponseEntity<List<UserDTO>> getUsersByOrgId(@ApiParam Pageable pageable) {
        Long orgId = SecurityUtils.getCurrentUserOrganizationId();
        final Page<UserDTO> page = userService.getUsersByOrgId(pageable, orgId);
        for (UserDTO u : page) {
            log.debug("\n---------MyLog: " + u.toString());
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/users/authorities")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * GET  /users/:login : get the "login" user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @Timed
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) {
        log.debug("REST request to get User : {}", login);
        return ResponseUtil.wrapOrNotFound(
            userService.getUserWithAuthoritiesByLogin(login)
                .map(UserDTO::new));
    }

    /**
     * DELETE /users/:login : delete the "login" User.
     *
     * @param login the login of the user to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        log.debug("REST request to delete User: {}", login);
        userService.deleteUser(login);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "userManagement.deleted", login)).build();
    }
}
