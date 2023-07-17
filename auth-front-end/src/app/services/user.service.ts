import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private meEndpoint = 'user/me'
  private allEndpoint = 'admin/user';
  private removeEndpoint = 'admin/user';
  private domain: string | undefined;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.domain = environment.api;
   }


  me(): Observable<any>{
    return this.http.get(`${this.domain}${this.meEndpoint}`, {headers: new HttpHeaders().set('Authorization',this.cookieService.get('token') )});
  }
  all(): Observable<any>{
    return this.http.get(`${this.domain}${this.allEndpoint}`,{headers: new HttpHeaders().set('Authorization', this.cookieService.get('token'))});
  }
  
  remove(username:any){
    return this.http.delete(`${this.domain}${this.removeEndpoint}/${username}`,{headers: new HttpHeaders().set('Authorization', this.cookieService.get('token'))});
 }

}
