import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../core/models/Post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../config/configuracion.paginacion';
import { PaginadorPostModel } from '../core/models/Paginador.post.model';
import { PostIdModel } from '../core/models/Post.id.model';
import { OrderModel } from '../core/models/Order.model';
import { CarritoItemModel } from '../core/models/Carrito.item.model';

@Injectable({
  providedIn: 'root'
})
export class LogicaNegocioService {

urlBase: string = ConfiguracionRutasBackend.urlBackend;

private shopingCartSubject = new BehaviorSubject<CarritoItemModel[]>(this.cargarCarritoDesdeLocalStorage()); // Carga inicial desde localStorage
shopingCart$ = this.shopingCartSubject.asObservable();


constructor(private http:HttpClient) { }


/**
 * Función para listar las ordenes de un cliente por su id
 * @param id Identificador del usuario
 * @returns Lista de ordenes
 */
ListarOrdenes(id: string): Observable<OrderModel[]> {
  // Usar FormData para enviar el parametro id_user
  const formData = new FormData();
  formData.append('user_id', id);
  const url = `${this.urlBase}order/getOrderByUser?user_id=${id}`;
  return this.http.get<OrderModel[]>(url);
}

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

/**
 * Creacion de un pedido para un cliente
 * @param datos Datos del pedido
 * @returns 
 */
CrearPedido(datos: OrderModel): Observable<any> {
  return this.http.post<any>(`${this.urlBase}order/createOrder`,datos);
}


ActualizarStatusPedido(datos: any): Observable<any> {
  return this.http.put<any>(`${this.urlBase}order/updateOrderStatus`,datos);
}

/* Calificacion de productos  */
CalficarProducto(datos: any): Observable<any> {
  return this.http.post<any>(`${this.urlBase}qualification/createQualification`,datos);
}


/* Carrito de compras  */
AgregarProductosAlCarrito(id: string, cantidad: number): void {
  const currentCart = this.shopingCartSubject.value;
  const existingItem = currentCart.find(item => item.id === id);

  if (existingItem) {
    existingItem.cantidad += cantidad;
  } else {
    currentCart.push({ id, cantidad });
  }

  this.shopingCartSubject.next(currentCart);
  this.guardarCarritoEnLocalStorage(currentCart); // Guarda en localStorage
}

LimpiarCarrito() {
  this.shopingCartSubject.next([]);
  this.guardarCarritoEnLocalStorage([]); // Limpia en localStorage
}

private guardarCarritoEnLocalStorage(carrito: CarritoItemModel[]): void {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

private cargarCarritoDesdeLocalStorage(): CarritoItemModel[] {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

ListarPostUsuario(id: string): Observable<PostModel[]> {
  const url = `${this.urlBase}post/getPostByUser?user_id=${id}`;
  return this.http.get<PostModel[]>(url);
}


ActualizarStatusPost(datos: any): Observable<any> {
  return this.http.put<any>(`${this.urlBase}post/editPost`,datos);
}

}


