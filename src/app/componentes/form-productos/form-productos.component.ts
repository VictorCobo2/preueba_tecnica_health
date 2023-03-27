import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ServicioApiService } from 'src/app/servicios/servicio-api.service';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss'],
})
export class FormProductosComponent {
  empForm: FormGroup;

  categorias: any[] = [];

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioApiService: ServicioApiService,
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<AlertaComponent>
  ) {
    this.empForm = this._fb.group({
      nombre: '',
      categoria: '',
    });
  }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.data){

      console.log(this.data.data.categoria.nombre)

      this.empForm.get('nombre')?.setValue(this.data.data.nombre)
      this.empForm.get('categoria')?.setValue(this.data.data.categoria.nombre)
      
    }
    this.empForm.patchValue({});
    this.cargarCategorias();
  }

  onFormSubmit() {
    switch (this.data.guardar) {
      case true:
        this.guardarProducto();
        break;
      case false:
        this.editarProducto();
        break;
      default:
        break;
    }
  }
  cargarCategorias() {
    this.servicioApiService.get<any>('categorias').subscribe((response) => {
      this.categorias = response.categorias;
    });
  }

  guardarProducto() {
    this.empForm.value.categoria = this.empForm.value.categoria._id;
    this.servicioApiService.post('productos', this.empForm.value).subscribe(
      (response) => {
        const dialogRef = this._dialog.open(AlertaComponent, {
          width: '400px',
          data: {
            mensaje: `El producto ${this.empForm.value.nombre}, se agrego exitosamente!`,
            advertencia: true,
          },
        });

        this.dialogRef.close(true)
      },
      (error) => {
        console.log(error);
        if (error.status == 400) {
          const dialogRef = this._dialog.open(AlertaComponent, {
            width: '400px',
            data: {
              mensaje: `El producto ${this.empForm.value.nombre}, ya existe!`,
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

  editarProducto() {
    console.log(this.data.data)
    this.empForm.value.categoria = this.empForm.value.categoria._id;
    this.servicioApiService.put(`productos/${this.data.data._id}`, this.empForm.value).subscribe(
      (response) => {
        this._dialog.open(AlertaComponent, {
          width: '400px',
          data: {
            mensaje: `El producto ${this.empForm.value.nombre}, se edito correctamente!`,
            advertencia: true,
          },
        });
        this.dialogRef.close(true)
      },
      (error) => {
        if (error.status == 400) {
          this._dialog.open(AlertaComponent, {
            width: '400px',
            data: {
              mensaje: `El producto ${this.empForm.value.nombre}, ya existe!`,
              advertencia: true,
            },
          });
        }
      }
    );
  }
}
