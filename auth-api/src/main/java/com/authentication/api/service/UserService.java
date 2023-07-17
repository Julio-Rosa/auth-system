package com.authentication.api.service;

import com.authentication.api.dto.user.MeResponse;
import com.authentication.api.dto.user.ResetRequest;
import com.authentication.api.model.User;
import com.authentication.api.repository.UserRepository;
import com.authentication.api.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;





    public MeResponse me(@RequestHeader(name = HttpHeaders.AUTHORIZATION)String authorization){


        Optional<User> user = userRepository.findByUsername(getUsername(authorization));
        return  MeResponse.builder()
                .username(user.get().getUsername())
                .firstName(user.get().getFirstName())
                .lastName(user.get().getLastName())
                .id(user.get().getId())
                .role(user.get().getAuthorities().toString())
                .build();


    }
    public void reset( @RequestBody ResetRequest resetRequest, @RequestHeader(name = HttpHeaders.AUTHORIZATION)String authorization) throws Exception {

        User user = userRepository.findByUsername(getUsername(authorization)).orElseThrow(() -> new UsernameNotFoundException("User not found !"));
        String newPassword = resetRequest.getNewPassword();


        boolean matches = passwordEncoder().matches(resetRequest.getPassword(), user.getPassword());
        boolean samePassword = passwordEncoder().matches(resetRequest.getNewPassword(),user.getPassword());
        if (!matches){
            throw new Exception("Incorrect password!");
        }
        if (samePassword){
            throw new Exception("The new password cannot be the same as the old password.");
        }
        userRepository.updatePasswordByUsername(passwordEncoder().encode(newPassword),user.getUsername());



    }



    private String getUsername(String token){
        String newToken = token.substring(7);
        String username = jwtService.extractUsername(newToken);

        return username;
    }
    private PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
