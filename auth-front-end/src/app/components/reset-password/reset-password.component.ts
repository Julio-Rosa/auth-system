import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidators } from 'src/app/utils/password-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  @Input() passtype = "Show";
  @Input() newPasstype = "Show";
  @Input() newPassConfirmtype = "Show";
  submitted = false;
  success = false;
  samePassword =  false;
  incorrectPassword = false;
 
  inputTypePass: boolean;
  inputTypeNewPass: boolean;
  inputTypeNewPassConfirm: boolean;
  
 
  user: {password: string, newPassword:string};

  constructor(private authService: AuthService, private router: Router){}

  showPassword(){
    this.inputTypePass = !this.inputTypePass
    if(this.inputTypePass){
        this.passtype = "Hide"
    }else{
      this.passtype = "Show"
    }
  }
  showPasswordNewPass(){
    this.inputTypeNewPass = !this.inputTypeNewPass
    if(this.inputTypeNewPass){
        this.newPasstype = "Hide"
    }else{
      this.newPasstype = "Show"
    }
  }
  showPasswordNewPassConfirm(){
    this.inputTypeNewPassConfirm = !this.inputTypeNewPassConfirm
    if(this.inputTypeNewPassConfirm){
        this.newPassConfirmtype = "Hide"
    }else{
      this.newPassConfirmtype = "Show"
    }
  }

  resetForm = new FormGroup({
    oldPassword: new FormControl(
      null,
      [
        Validators.required,
        Validators.minLength(8)

      ]
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
    return this.resetForm.controls;
  }
  get requiredValid() {
    return !this.resetForm.controls["password"].hasError("required");
  }
  get minLengthValid() {
    return !this.resetForm.controls["password"].hasError("minlength");
  }
  get requiresDigitValid() {
    return !this.resetForm.controls["password"].hasError("requiresDigit");
  }
  get requiresUppercaseValid() {
    return !this.resetForm.controls["password"].hasError("requiresUppercase");
  }
  get requiresLowercaseValid() {
    return !this.resetForm.controls["password"].hasError("requiresLowercase");
  }
  get requiresSpecialCharsValid() {
    return !this.resetForm.controls["password"].hasError("requiresSpecialChars");
  }
  get passwordValid() {
    return this.resetForm.controls["password"].errors === null;
  }
 
  onSubmit() {
    this.submitted = true;

    if(this.resetForm.invalid){
      return;
    }
    this.user = {
      password: this.resetForm.get('oldPassword').value,
      newPassword: this.resetForm.get('password').value
    }
    this.authService.reset(this.user)
      .subscribe((res)=> {
          this.success = true;
          this.resetForm.reset()
          
      }, (err) => {
          if(err.error.message === "The new password cannot be the same as the old password."){
              this.samePassword = true;
              setTimeout(() => {
                this.samePassword = false;
              },2000);
          }
          if(err.error.message === "Incorrect password!"){
            this.incorrectPassword = true;
            setTimeout(() => {
              this.incorrectPassword = false;
            },2000);
          }
      },() => {
        setTimeout(() => {
          this.success = false;
        },2000);
      })
    
  }

}
