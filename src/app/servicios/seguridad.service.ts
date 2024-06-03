import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioValidadoModel } from '../core/models/UsuarioValidado.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from '../core/models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
urlBase: string = ConfiguracionRutasBackend.urlBackend;

constructor(private http:HttpClient) {
  this.validacionDeSesion();
 }

 /**
  * Identifica un usuario
  * @param datos 
  * @returns Data del usuario identificado
  */
 IdentificarUsuario(datos: any): Observable<UsuarioValidadoModel> {
  return this.http.post<UsuarioValidadoModel>(`${this.urlBase}auth/login`,datos);
}
/**
 * Registro de usuarios
 * @param datos 
 * @returns  Data del usuario registrado
 */
 RegistrarUsuario(datos: any): Observable<UsuarioModel> {
  return this.http.post<UsuarioModel>(`${this.urlBase}user/createUser`,datos);
}

 /**
   * Guarda en local storage informacion de l usuario validado
   * @param datos datos del usuario validado
   * @returns respuesta
   */
 AlmacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
  let datosLS = localStorage.getItem('datos-sesion');
  if (datosLS != null) {
    return false;
  } else {
    let datosString = JSON.stringify(datos);
    localStorage.setItem('datos-sesion', datosString);
    this.ActualizarComportamientoUsuario(datos);
    return true;
  }
}

/**
 * Cerrando session
 */

RemoverDatosUsuarioValidado() {
  let datosSesion = localStorage.getItem("datos-sesion");
  if(datosSesion){
    localStorage.removeItem("datos-sesion");
  }
  this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
  
}


/**
 * Busca los datos en local Storage de un usuario
 * @returns datos
 */
ObtenerDatosUsuarioLS(): UsuarioModel | null {
  let datosLS = localStorage.getItem('datos-sesion');
  if (datosLS) {
    let datos = JSON.parse(datosLS);
    return datos;
  } else {
    return null;
  }
}

   /** Administracion de la sesion de usuario */

   datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(
    new UsuarioValidadoModel()
  );

  ObtenerDatossesion(): Observable<UsuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  validacionDeSesion() : UsuarioValidadoModel| null {
    let ls = localStorage.getItem('datos-sesion');
    if (ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
      return objUsuario
    }
    return null
  }

  ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }

}
