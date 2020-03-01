import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info',
    });
    Swal.showLoading();

    this.auth.login( this.usuario ).subscribe( resp => {

    console.log(resp);
    Swal.close();
    this.router.navigateByUrl('/home');

   }, (err) => {
     console.log(err.error.error.message);
     Swal.fire({
      title: 'Error al Autenticar',
      text: err.error.error.message,
      icon: 'error',
    });
   });

  }

}
