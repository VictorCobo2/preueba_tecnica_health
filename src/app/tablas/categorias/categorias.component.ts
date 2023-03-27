import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaComponent } from 'src/app/componentes/alerta/alerta.component';
import { FormCategoriasComponent } from 'src/app/componentes/form-categorias/form-categorias.component';
import {ServicioApiService} from '../../servicios/servicio-api.service'



export interface UserData {
  nombre: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicioApiService: ServicioApiService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.cargarCategorias()
  }
  
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  abrirFormCategorias(guardar:boolean, data?:any){
    const dialogRef = this._dialog.open(FormCategoriasComponent,{
      data: {
        guardar: guardar,
        data:data
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarCategorias()
      }
    });
  }

  eliminarCategoria(data:any) {
    console.log(data._id)
    const dialogRef = this._dialog.open(AlertaComponent, {
      width: '400px',
      data: { mensaje: '¿Estás seguro de que quieres eliminar esta Categoria?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.servicioApiService.delete<any>(`categorias/${data._id}`).subscribe((response) => {
          this.cargarCategorias()
        });
      }
    });
  }

  cargarCategorias(){
    this.servicioApiService.get<any>('categorias').subscribe(response => {
      this.dataSource = new MatTableDataSource(response.categorias);
      console.log(response);
    });
  }

}

