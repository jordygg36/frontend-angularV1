import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProductosListaComponent } from './components/productos-lista/productos-lista.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { CarritoModeradorComponent } from './components/carrito-moderador/carrito-moderador.component';

import { AuthGuard } from './services/auth.guard'; 
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'usuario', component: UsersComponent, canActivate: [AuthGuard], data: { role: 1 }},  
  { path: 'productos', component: ProductosListaComponent},  
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard], data: { role: 1 }},  
  { path: 'edit-user/:idusuarios', component: EditUserComponent,  canActivate: [AuthGuard]},
  { path: 'perfil/:idusuarios', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'carrito-compras', component: CarritoComprasComponent, canActivate: [AuthGuard], data: { role: 3} }, 
  { path: 'carrito-moderador', component: CarritoModeradorComponent, canActivate: [AuthGuard], data: { role: 2} },  

  { path: 'dashboard', component: DashboardComponent },  
  { path: '**', redirectTo: 'login' },  
];
