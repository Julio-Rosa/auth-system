package com.authentication.api.dto;

import com.authentication.api.repository.UserRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class RegisterRequest {
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
}
