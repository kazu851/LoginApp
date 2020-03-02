import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { EditarUsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  email: string;
  nombre: string;
  editData: EditarUsuarioModel;
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
    this.nombre = localStorage.getItem('name');
    this.editable = false;
  }

  editarPerfil() {
    this.editData = {
      idToken: localStorage.getItem('token'),
      displayName: this.nombre,
      photoUrl: ''
    };
    // this.auth.editarDatosUsuario(this.editData);
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info',
    });
    Swal.showLoading();

    this.auth.editarDatosUsuario( this.editData ).subscribe( resp => {

      console.log(resp);
      this.editable = false;
      Swal.close();

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al Crear la Cuenta',
        text: err.error.error.message,
        icon: 'error',
      });
    });
  }

}
