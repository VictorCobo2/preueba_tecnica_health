import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { CategoriasComponent } from './tablas/categorias/categorias.component';
import { ProductosComponent } from './tablas/productos/productos.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'productos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
