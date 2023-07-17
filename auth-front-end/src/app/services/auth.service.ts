import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../model/register.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginEndpoint = 'auth/authenticate';
  private registerEndpoint = 'auth/register';
  private resetEndpoint = 'user/reset-password';
  private domain: string | undefined;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.domain = environment.api;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.domain}${this.loginEndpoint}`, { username, password });
  }
  register(request: RegisterModel): Observable<any> {
    return this.http.post<any>(`${this.domain}${this.registerEndpoint}`, request);
  }
  reset(user): Observable<any>{
    return this.http.put(`${this.domain}${this.resetEndpoint}`,user,{headers: new HttpHeaders().set('Authorization',this.cookieService.get('token') )});
  }

  logOut(){
    this.cookieService.delete('token','/');
    this.cookieService.delete('token','/user');
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

}
