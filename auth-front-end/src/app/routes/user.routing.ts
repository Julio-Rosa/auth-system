import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserComponent } from "../pages/user/user.component";
import { MeComponent } from "../components/me/me.component";
import { ResetPasswordComponent } from "../components/reset-password/reset-password.component";
import { UsersComponent } from "../components/users/users.component";
import { AuthorizedGuard } from "../guards/authorized.guard";


const userRoutes = [
    {path: 'user', component: UserComponent, canActivate: [AuthorizedGuard], children: [
        {path:'me', component: MeComponent },
        {path:'reset', component: ResetPasswordComponent},
        {path:'all', component: UsersComponent}
    ]}
];
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule{

}