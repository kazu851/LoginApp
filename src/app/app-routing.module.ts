import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  { path: 'home'          , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [ AuthGuard ] },
  { path: 'registro'      , component: RegistroComponent },
  { path: 'login'         , component: LoginComponent },
  { path: '**'            , redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
