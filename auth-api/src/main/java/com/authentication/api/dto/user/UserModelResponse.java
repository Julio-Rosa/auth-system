package com.authentication.api.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserModelResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String role;
}
