import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoriasComponent } from './tablas/categorias/categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { FormProductosComponent } from './componentes/form-productos/form-productos.component';
import { FormCategoriasComponent } from './componentes/form-categorias/form-categorias.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import { AlertaComponent } from './componentes/alerta/alerta.component';
import { ProductosComponent } from './tablas/productos/productos.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    FormProductosComponent,
    FormCategoriasComponent,
    AlertaComponent,
    ProductosComponent,
    LoginComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  entryComponents: [AlertaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
