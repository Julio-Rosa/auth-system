package com.authentication.api.service;

import com.authentication.api.dto.AuthenticateRequest;
import com.authentication.api.dto.AuthenticationResponse;
import com.authentication.api.dto.RegisterRequest;
import com.authentication.api.model.Role;
import com.authentication.api.model.User;
import com.authentication.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest registerRequest) throws Exception {

        if (userRepository.existsByUsername(registerRequest.getUsername())){
            throw new Exception("Username already exists");
        }
        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))

                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticateRequest authenticateRequest) throws Exception {


            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                authenticateRequest.getUsername(),
                                authenticateRequest.getPassword()


                        )
                );


                User user = userRepository.findByUsername(authenticateRequest.getUsername())
                        .orElseThrow();

                String jwtToken = jwtService.generateToken(user);

                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();

            }catch (BadCredentialsException e){
                throw new Exception(e.getMessage());
            }





    }


}
