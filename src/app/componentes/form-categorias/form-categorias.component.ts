import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicioApiService } from 'src/app/servicios/servicio-api.service';
import { CategoriasComponent } from 'src/app/tablas/categorias/categorias.component';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrls: ['./form-categorias.component.scss']
})

export class FormCategoriasComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioApiService: ServicioApiService,
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<AlertaComponent>
  ) {
    this.empForm = this._fb.group({
      nombre: '',
    });
  }

  ngOnInit(): void {
    if(!this.data.guardar) this.empForm.get('nombre')?.setValue(this.data.data.nombre)
    this.empForm.patchValue({});
  }

  onFormSubmit() {
    switch (this.data.guardar) {
      case true:
        this.guardarCategoria();
        break;
      case false:
        this.editarCategoria();
        break;
      default:
        break;
    }
  }

  guardarCategoria() {
    this.servicioApiService.post('categorias', this.empForm.value).subscribe(
      (response) => {
        const dialogRef = this._dialog.open(AlertaComponent, {
          width: '400px',
          data: {
            mensaje: `La Categoria ${this.empForm.value.nombre}, se agrego exitosamente!`,
            advertencia: true,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this._dialog.closeAll();
          }
        });
      },
      (error) => {
        console.log(error);
        if (error.status == 400) {
          const dialogRef = this._dialog.open(AlertaComponent, {
            width: '400px',
            data: {
              mensaje: `La Categoria ${this.empForm.value.nombre}, ya existe!`,
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
      }
    );
  }

  editarCategoria() {
    console.log(this.data)
    this.servicioApiService.put(`categorias/${this.data.data._id}`, this.empForm.value).subscribe(
      (response) => {
        const dialogRef = this._dialog.open(AlertaComponent, {
          width: '400px',
          data: {
            mensaje: `La Categoria ${this.empForm.value.nombre}, se edito correctamente!`,
            advertencia: true,
          },
        });
        this.dialogRef.close(true)
      },
      (error) => {
        if (error.status == 400) {
          const dialogRef = this._dialog.open(AlertaComponent, {
            width: '400px',
            data: {
              mensaje: `La Categoria ${this.empForm.value.nombre}, ya existe!`,
              advertencia: true,
            },
          });
          this.dialogRef.close(true)
        }
      }
    );
  }

}
