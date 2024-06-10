import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../core/models/Post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicaNegocioService {

urlBase: string = ConfiguracionRutasBackend.urlBackend;


constructor(private http:HttpClient) { }

/**
 * 
 * @returns Lista de los post con imagenes
 */
ListarPost(): Observable<PostModel[]> {
  return this.http.get<PostModel[]>(`${this.urlBase}post/posts-with-images`);
}


}




