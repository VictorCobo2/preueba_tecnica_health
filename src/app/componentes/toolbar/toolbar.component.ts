import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AlertaComponent } from '../alerta/alerta.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{
  constructor(private cookies:CookieService, private _dialog: MatDialog){}
  
  nombre = this.cookies.get("nombre") 
  
  cerrarSesion(){
    const dialogRef = this._dialog.open(AlertaComponent, {
      width: '400px',
      data: { mensaje: '¿Estás seguro que deseas cerrar la sesion?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cookies.delete("x_token")
        this.cookies.delete("nombre")
        location.reload()
      }
    });
  }

}
