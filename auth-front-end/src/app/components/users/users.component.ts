import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users = new Array<User>;
  user: User;
  error: string;
  removeTrue = false;
  removeMessage: string;
  userToDelete: string;
  successDeleted = false;
  errorOnDelete = false;
  userInSession: string;

  constructor(private userService: UserService) {
    

   }


  ngOnInit(): void {
    this.getUserInSession();
    this.listAll();
    
   
    
 
    
  }


  
   
  
  getUserInSession() {
    this.userService.me()
      .subscribe((res) => {
        this.user = res;
        this.userInSession = this.user.username;

          
        let index = this.users.findIndex((user) => {
          return user.username === this.user.username;
         
      });
      this.users.splice(index,1);
          
          
      }, (err) => {

      })
  }
  listAll() {
    this.userService.all()
      .subscribe((res) => {
        for (let k in res['content']) {
            if(res['content'][k]['username'] !== this.userInSession){
              this.users.push((res['content'][k]));
            }
            


            
        }
        




      }, (err) => {

        if (err.status === 403) {
          this.error = "You do not have permission to access this page.";

        }
      })

  }
  remove(username) {
    this.removeTrue = true;
    this.removeMessage = `${'Are you sure you want to delete the user'} ${username} ?`;
    this.userToDelete = username;

  }
  cancel() {
    this.removeTrue = false;
  }
  confirm() {
    this.removeUser(this.userToDelete);
  }
  removeUser(username) {
    this.removeTrue = false;

    this.userService.remove(username)
      .subscribe((res) => {
        this.successDeleted = true;
        setTimeout(() => {
          this.ngOnInit();
          this.successDeleted = false;

        }, 2000);
      }, (err) => {

        this.errorOnDelete = true;
        setTimeout(() => {
          this.errorOnDelete = false;
          ;

        }, 2000);


      }, () => {

      })
  }

}
