import { Component } from '@angular/core';
import { MeModel } from 'src/app/model/me.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  user: MeModel
  hasError =  false;
  constructor(private userServive: UserService){}
  ngOnInit(): void {
    
    this.userServive.me()
      .subscribe((res) => {
          this.user = res;
      }, (err) => {
          this.hasError = true;
      })  
    
  }

}
