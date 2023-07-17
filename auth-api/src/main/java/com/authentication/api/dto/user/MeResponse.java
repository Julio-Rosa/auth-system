package com.authentication.api.dto.user;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String role;
}
