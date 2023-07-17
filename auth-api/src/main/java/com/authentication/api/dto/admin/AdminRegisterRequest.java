package com.authentication.api.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminRegisterRequest {
    @NotEmpty(message = "First name cannot be empty")
    @Size(min = 3, max = 60, message = "First name must be at least 3 characters long")

    private String firstName;
    @NotEmpty(message = "Last name cannot be empty")
    @Size(min = 3, max = 60, message = "Last name must be at least 3 characters long")
    private String lastName;

    @NotEmpty(message = "Username cannot be empty")
    @Size(min = 3, max = 60, message = "Username must be at least 3 characters long")


    private String username;
    @NotEmpty(message = "Password cannot be empty")
    @Size(min = 8,  message = "Password must be at least 8 characters long", max = 60)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", message = "The password must be at least one letter, one number and one special character ")


    private String password;
    @NotEmpty(message = "Role cannot be empty")
    @NotNull
    @Pattern(regexp = "ADMIN|USER")

    private String role;
}
