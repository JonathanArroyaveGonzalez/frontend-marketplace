import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../core/models/Post.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../config/configuracion.paginacion';
import { PaginadorPostModel } from '../core/models/Paginador.post.model';
import { PostIdModel } from '../core/models/Post.id.model';

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
ListarPost(pag: number): Observable<PaginadorPostModel> {
  let limit = ConfiguracionPaginacion.registrosPorPagina;
  let skip = (pag -1) * limit;
  let url = `${this.urlBase}post/posts-with-images?filter={"limit":${limit}, "skip":${skip}}`;
  return this.http.get<PaginadorPostModel>(url);
}

/**
 * 
 * @param id Identificador del post
 * @returns Post con imagenes
 */
ObtenerPost(id: string): Observable<PostIdModel> {
  let url = `${this.urlBase}post/getPostById?id=${id}`;
  return this.http.get<PostIdModel>(url);

}


}




