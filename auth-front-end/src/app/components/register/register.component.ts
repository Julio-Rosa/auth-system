import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/model/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidators } from 'src/app/utils/password-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() passtype = "Show";
  @Input() passConfirmtype = "Show";
  submitted = false;
  isWorking = false;
  userExists = false;
  genericError = false;
  success = false;
  inputTypePass: boolean;
  inputTypeConfirmPass: boolean;

  user: RegisterModel

  constructor(private authService: AuthService, private router: Router) { }


  signupForm = new FormGroup({
    firstName: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    ),
    lastName: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    ),
    username: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    ),
    password: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordValidators.patternValidator(new RegExp('(?=.*[0-9])'), {
          requiresDigit: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
          requiresSpecialChars: true
        })
      ])
    ),
    confirmPassword: new FormControl(
      null,
      [
        Validators.required,
        Validators.minLength(8)

      ])
  },
    {
      validators: PasswordValidators.MatchValidator
    }

  );

  get f() {
    return this.signupForm.controls;
  }
  get requiredValid() {
    return !this.signupForm.controls["password"].hasError("required");
  }
  get minLengthValid() {
    return !this.signupForm.controls["password"].hasError("minlength");
  }
  get requiresDigitValid() {
    return !this.signupForm.controls["password"].hasError("requiresDigit");
  }
  get requiresUppercaseValid() {
    return !this.signupForm.controls["password"].hasError("requiresUppercase");
  }
  get requiresLowercaseValid() {
    return !this.signupForm.controls["password"].hasError("requiresLowercase");
  }
  get requiresSpecialCharsValid() {
    return !this.signupForm.controls["password"].hasError("requiresSpecialChars");
  }
  get passwordValid() {
    return this.signupForm.controls["password"].errors === null;
  }

  showPassword(){
    this.inputTypePass = !this.inputTypePass
    if(this.inputTypePass){
        this.passtype = "Hide"
    }else{
      this.passtype = "Show"
    }
  }
  showConfirmPassword(){
    this.inputTypeConfirmPass = !this.inputTypeConfirmPass
    if(this.inputTypeConfirmPass){
        this.passConfirmtype = "Hide"
    }else{
      this.passConfirmtype = "Show"
    }
  }
  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.user = {
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      username: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value
    }

    this.authService.register(this.user)
      .subscribe((res) => {
        this.success = true;
      }, (err) => {

        if (err.error.message === "Username already exists") {
          this.userExists = true;
        } else {
          this.genericError = true;

        }

      }, () => {
        setTimeout(() => {
          this.success = false;
          this.router.navigate(['user/me']);
        },3000);
      })



  }

}
