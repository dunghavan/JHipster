package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MyUser;
import com.mycompany.myapp.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.Instant;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<MyUser, Long> {

    Optional<MyUser> findOneByActivationKey(String activationKey);

    List<MyUser> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<MyUser> findOneByResetKey(String resetKey);

    Optional<MyUser> findOneByEmail(String email);

    Optional<MyUser> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    MyUser findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    Optional<MyUser> findOneWithAuthoritiesByLogin(String login);

    Page<MyUser> findAllByLoginNot(Pageable pageable, String login);

    //@Dung add:
    @Query("SELECT u FROM MyUser u WHERE u.organization.id = ?1")
    Page<MyUser> getUsersByOrgId(Pageable pageable, Long orgId);
}
