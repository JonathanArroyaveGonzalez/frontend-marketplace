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
shopingCart: string[] = [];


constructor(private http:HttpClient) { }

/**
 * 
 * @returns Lista de los post con imagenes
 */
ListarPost(pag: number): Observable<PaginadorPostModel> {
  const limit = ConfiguracionPaginacion.registrosPorPagina;
  const skip = (pag - 1) * limit;
  const url = `${this.urlBase}post/posts-with-images?limit=${limit}&skip=${skip}`; 
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

/**
 * 
 * @param datos Datos del post
 * @returns Post creado
 */
CrearPost(datos: any): Observable<any> {
  return this.http.post<any>(`${this.urlBase}post/createPost`,datos);
}


CargarImagenesPost(imageFile: File, postId: string): Observable<any> {
  const url = `${this.urlBase}image/uploadImage`; 

  // Usar FormData para enviar el archivo y el parámetro por separado
  const formData = new FormData();
  formData.append('image', imageFile, imageFile.name); 
  formData.append('idPost', postId);

  return this.http.post<any>(url, formData); // Enviar formData
}

AgregarProductosAlCarrito(id: string): void {
  this.shopingCart.push(id);  
}

}




