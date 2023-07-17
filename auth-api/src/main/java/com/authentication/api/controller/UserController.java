package com.authentication.api.controller;

import com.authentication.api.dto.user.MeResponse;
import com.authentication.api.dto.user.ResetRequest;
import com.authentication.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("/me")
    public ResponseEntity<MeResponse> me(@RequestHeader(name = HttpHeaders.AUTHORIZATION)String authorization){
        return new ResponseEntity<>(userService.me(authorization), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PutMapping("/reset-password")
    public void reset( @RequestBody ResetRequest resetRequest,@RequestHeader(name = HttpHeaders.AUTHORIZATION)String authorization) throws Exception {
       userService.reset(resetRequest,authorization);
    }


}
