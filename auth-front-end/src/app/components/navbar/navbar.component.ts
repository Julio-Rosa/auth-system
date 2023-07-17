import { Component, OnInit } from '@angular/core';
import { MeModel } from 'src/app/model/me.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdmin = false;
  user: MeModel
  hasError =  false;
  
  constructor(private userService: UserService, private authService: AuthService){

  }
  
  
  
  
  ngOnInit(): void {

    this.userService.me()
      .subscribe((res) => {
          this.user = res;
          if(this.user.role === '[ADMIN]'){
              this.isAdmin = true;
          }
      }, (err) => {
          this.hasError = true;
      })  

      

  }

  logOut(){
    this.authService.logOut();
  }

}
