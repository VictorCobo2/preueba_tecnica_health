import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertaComponent } from '../componentes/alerta/alerta.component';
import { ServicioApiService } from '../servicios/servicio-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private servicioApiService: ServicioApiService,
    private cookieService: CookieService,
    private router: Router,
    private _dialog: MatDialog
  ) {
    this.loginForm = this._fb.group({
      correo: '',
      password: '',
    });
  }
  ngOnInit() {}

  onFormSubmit() {
    this.servicioApiService
      .post<any>('auth/login', this.loginForm.value)
      .subscribe((response) => {
        console.log(response);
        if (response.token) {
          this.cookieService.set('x_token', response.token),
          this.cookieService.set('nombre', response.usuario.nombre),
          this.router.navigate(['productos']);
        }
      },(error) => {
        if (error.status == 400) {
          const dialogRef = this._dialog.open(AlertaComponent, {
            width: '400px',
            data: {
              mensaje: `Usuario o contraseña incorrectos.`,
              advertencia: true,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this._dialog.closeAll();
            }
          });
        } else {
          const dialogRef = this._dialog.open(AlertaComponent, {
            width: '400px',
            data: {
              mensaje: `Error desconocido :()`,
              advertencia: true,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this._dialog.closeAll();
            }
          });
        }
      })
  }
}
