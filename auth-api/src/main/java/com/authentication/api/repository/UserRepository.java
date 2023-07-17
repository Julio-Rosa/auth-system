package com.authentication.api.repository;

import com.authentication.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);

    @Transactional()
    @Modifying()
    @Query(
            value = "Update User u SET u.password=?1 WHERE u.username=?2"
    )
    void updatePasswordByUsername( String password ,String username);
}
