import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  email: string;
  nombre: string;
  editable = false;

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.email = localStorage.getItem('email');
    this.nombre = localStorage.getItem('name');
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  habEdicion() {
    this.editable = true;
  }

  cancelarEdicion() {
    this.editable = false;
  }

}
