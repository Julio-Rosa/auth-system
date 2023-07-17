import { NgModule } from "@angular/core";
import { UserComponent } from "../pages/user/user.component";
import { CommonModule } from "@angular/common";
import { MeComponent } from "../components/me/me.component";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { UsersComponent } from "../components/users/users.component";
import { ResetPasswordComponent } from "../components/reset-password/reset-password.component";
import { UserRoutingModule } from "../routes/user.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RemoveInvalidCharsPipe } from "../pipes/remove-invalid-chars.pipe";



@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule, 
        FormsModule,
        ReactiveFormsModule
       
       
    ],
    exports: [],
    declarations: [UserComponent, MeComponent, NavbarComponent, UsersComponent, ResetPasswordComponent, RemoveInvalidCharsPipe],
    providers: [],
})

export class UserModule{

}