package com.authentication.api.controller;

import com.authentication.api.dto.admin.AdminRegisterRequest;
import com.authentication.api.dto.user.UserModelResponse;
import com.authentication.api.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/admin")

@RequiredArgsConstructor


public class AdminController {

    private final AdminService adminService;



    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user")
    public ResponseEntity<Page<UserModelResponse>> findAll(Pageable pageable){
        return new ResponseEntity<>(adminService.findAll(pageable), HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user/{username}")
    public ResponseEntity<UserModelResponse> findByUsername(@PathVariable String username){
        return new ResponseEntity<>(adminService.findByUsername(username), HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/user/{username}")
    public ResponseEntity<JSONObject> delete(@PathVariable String username){
        return new ResponseEntity(adminService.delete(username), HttpStatus.OK);
    }
}
