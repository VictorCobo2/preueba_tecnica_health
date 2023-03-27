import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'prueba_tecnica_health';

  constructor( private cookies: CookieService){

  }

  validarLogin(){
    const token = this.cookies.get("x_token")
    if(token) {
      return true
    }
    return false
  }
}
