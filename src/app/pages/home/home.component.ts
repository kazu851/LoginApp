import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayName: string;
  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.displayName = localStorage.getItem('name');
    console.log(this.displayName);
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  verPerfil() {
    this.router.navigateByUrl('/perfil-usuario');
  }

}
