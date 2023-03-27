import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaComponent } from 'src/app/componentes/alerta/alerta.component';
import { FormProductosComponent } from '../../componentes/form-productos/form-productos.component';
import {ServicioApiService} from '../../servicios/servicio-api.service'

export interface UserData {
  nombre: string;
  categoria: object;
  precio: number;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicioApiService: ServicioApiService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.cargarProductos()
  }


  abrirFormProductos(guardar:boolean, data?:any){
    const dialogRef = this._dialog.open(FormProductosComponent,{
      data: {
        guardar: guardar,
        data: data
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.cargarProductos()
      }
    });
  }

  eliminarProducto(data:any) {
    const dialogRef = this._dialog.open(AlertaComponent, {
      width: '400px',
      data: { mensaje: '¿Estás seguro de que quieres eliminar este producto?' },
    });

    console.log(data)
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.servicioApiService.delete<any>(`productos/${data._id}`).subscribe((response) => {
          this.cargarProductos()
        });
      }
    });
  }


  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  cargarProductos(){
    this.servicioApiService.get<any>('productos').subscribe(response => {
      this.dataSource = new MatTableDataSource(response.productos);
      console.log(response);
    });
  }
}
