import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import { TokenModel } from 'src/app/model/token.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() btnText = "Login";
  loginForm!: FormGroup;
  badCredential = false;
  genericError = false;
  token!: TokenModel;
  inputType = false;
  @Input() type = "Show";

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });


   
   
  }
 
  showPassword(){
    this.inputType = !this.inputType
    if(this.inputType){
        this.type = "Hide"
    }else{
      this.type = "Show"
    }
  }

  get username() {
    return this.loginForm.get('username')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }
  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe((res) => {
        this.token = res;
        this.cookieService.deleteAll();
        this.cookieService.delete('token','/user');
        this.cookieService.set('token',`Bearer ${this.token.token}`);
      }, (err) => {
        this.loginForm.reset()
        if (err.error.status === 500) {
         
          this.badCredential = true;
          
          setTimeout(() => {
            this.badCredential = false;
            
          },4000);
        }else{
          this.genericError = true;
          setTimeout(() => {
            this.genericError = false;
            
          },4000);
          
        }

      }, () => {
        this.router.navigate(['user/me']);
      })


  }

}
