import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CarritoItemListModel } from 'src/app/core/models/Carrito.item.list.model';
import { CarritoItemModel } from 'src/app/core/models/Carrito.item.model';
import { OrderModel } from 'src/app/core/models/Order.model';
import { PostIdModel } from 'src/app/core/models/Post.id.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  constructor(private LogicaDeNegocioService: LogicaNegocioService,
              private SeguridadService: SeguridadService,
              private Router: Router,
             ) { }

  shopingCart: CarritoItemModel[] = [];
  listItem: CarritoItemListModel[] = [];
  totalCompra: number = 0; // Variable para el total
  id_user: string = this.SeguridadService.datosUsuarioValidado.value.id ?? '';

  ngOnInit() {
    this.LogicaDeNegocioService.shopingCart$.subscribe(carrito => {
      this.shopingCart = carrito;
      this.cargarListaItem(); // Recargar la lista cuando el carrito cambia
    });
  }

  cargarListaItem() {
    const postObservables = this.shopingCart.map(item => this.LogicaDeNegocioService.ObtenerPost(item.id));

    forkJoin(postObservables).subscribe({
      next: (respuestas: PostIdModel[]) => {
        this.listItem = respuestas.map((respuesta, index) => ({
          id: this.shopingCart[index].id,
          cantidad: this.shopingCart[index].cantidad,
          nombre: respuesta.name ?? '',
          total: respuesta.price ?? 0 * this.shopingCart[index].cantidad
        }));

        this.calcularTotalCompra();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  calcularTotalCompra() {
    this.totalCompra = this.listItem.reduce((acc, item) => acc + item.total, 0);
  }

  eliminarItemList(id: string) {
    this.listItem = this.listItem.filter(item => item.id !== id);
    this.calcularTotalCompra();
  }

  RealizarPedido(){
    this.listItem.forEach(item => {
      let orden: OrderModel = {
        quantity: item.cantidad,
        userId :this.id_user,
        postId: item.id,
      };

      this.LogicaDeNegocioService.CrearPedido(orden).subscribe({
        next: (respuesta: OrderModel) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Orden Creada con exito.",
            showConfirmButton: false,
            timer: 1500
          });
          this.LogicaDeNegocioService.LimpiarCarrito(); // Vaciar el carrito
          this.Router.navigate(['/producto/mis-compras']); // Navegar hacia mis compras
        },
        error: (error: any) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Se produjo un error al crear el pedido, Intentelo de nuevo mas tarde.",
            showConfirmButton: false,
            timer: 1000
          });
        }
      });


    });
    
  }

}

