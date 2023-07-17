import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private cookieService: CookieService) { }

  authorized(){
    return this.cookieService.check('token');
  }
}
