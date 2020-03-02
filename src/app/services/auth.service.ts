import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel, EditarUsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyDsBgMMQX9ijiXClRuJ8JCnpZaPThQWEFY';
  userToken: string;
  displayName: string;

  // Crear Nuevo Usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  login( usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entró en el mapa del Rxjs');
        // tslint:disable-next-line:no-string-literal
        console.log(resp);
        // tslint:disable-next-line:no-string-literal
        this.guardarToken( resp['idToken'] , resp['displayName']);
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entró en el mapa del Rxjs');
        // tslint:disable-next-line:no-string-literal
        this.guardarToken( resp['idToken'] , resp['displayName']);
        return resp;
      })
    );

  }

  private guardarToken( idToken: string, displayName: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('name', displayName);
    const hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }

    return this.userToken.length > 2;

  }

  editarDatosUsuario( editUsuario: EditarUsuarioModel) {

    const editData = {
      idToken: editUsuario.idToken,
      displayName: editUsuario.displayName,
      photoUrl: editUsuario.photoUrl,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:update?key=${this.apiKey}`,
      editData
    ).pipe(
      map( resp => {
        console.log('Entró en el mapa del Rxjs');
        // tslint:disable-next-line:no-string-literal
        this.guardarNombre( resp['displayName']);
        return resp;
      })
    );
  }

  private guardarNombre( displayName: string ) {

    this.displayName = displayName;
    localStorage.setItem('name', displayName);

  }


}
