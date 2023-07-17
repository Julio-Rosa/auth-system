package com.authentication.api.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResetRequest {
    @NotEmpty(message = "Password Cannot be empty")
    private String password;
    @NotEmpty(message = "The new password Cannot be empty")
    @Size(min = 8,  message = "The new password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", message = "The new password must be at least one letter, one number and one special character ")
    private String newPassword;
}
