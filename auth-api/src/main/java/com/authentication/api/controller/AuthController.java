package com.authentication.api.controller;

import com.authentication.api.dto.AuthenticateRequest;
import com.authentication.api.dto.AuthenticationResponse;
import com.authentication.api.dto.RegisterRequest;
import com.authentication.api.repository.UserRepository;
import com.authentication.api.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {


    private final AuthenticationService authenticationService;



    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid  RegisterRequest registerRequest) throws Exception {

        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticateRequest authenticateRequest) throws Exception {

        return ResponseEntity.ok(authenticationService.authenticate(authenticateRequest));
    }


}