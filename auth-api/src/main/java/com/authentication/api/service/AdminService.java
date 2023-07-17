package com.authentication.api.service;

import com.authentication.api.dto.admin.AdminRegisterRequest;
import com.authentication.api.dto.user.UserModelResponse;
import com.authentication.api.model.Role;
import com.authentication.api.model.User;
import com.authentication.api.repository.UserRepository;
import com.google.gson.JsonObject;
import io.swagger.v3.core.util.Json;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;





    public Page<UserModelResponse> findAll(Pageable pageable){
        List<User> all = userRepository.findAll();
        List<UserModelResponse> users = new ArrayList<>();

        for (User user : all) {
            users.add( UserModelResponse.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .role(user.getAuthorities().toString())
                    .build());

        }
         return new PageImpl<>(users,pageable,users.size());





    }
    public UserModelResponse findByUsername(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        return UserModelResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getAuthorities().toString())
                .build();
    }
    public JSONObject delete(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        userRepository.delete(user);
        JSONObject json = new JSONObject();
        String message = user.getUsername()+"deleted";
        json.put("message",message);

        return json;


    }
}
