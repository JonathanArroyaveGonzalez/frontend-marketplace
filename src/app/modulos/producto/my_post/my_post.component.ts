import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/core/models/Post.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my_post',
  templateUrl: './my_post.component.html',
  styleUrls: ['./my_post.component.css']
})
export class My_postComponent implements OnInit {

  postsList: PostModel[] = [];
  postVacio: boolean = true;
  ordenesVacias: boolean = true;
  ordenesList: any[] = [];
  mostrarOrdenes: boolean = false;

  constructor(private logicaDeNegocioService: LogicaNegocioService,
              private seguridadService : SeguridadService
             )  { }

  ngOnInit() {
    this.ListarPost();
  }


  ListarPost(){
    this.logicaDeNegocioService.ListarPostUsuario(this.seguridadService.datosUsuarioValidado.value.id ?? "").subscribe(
      {
        next: (data: PostModel[]) => {
          this.postsList= data;
          if(this.postsList.length > 0){
            this.postVacio = false;
          }
          console.log(this.postsList)
        },
        error: (error) => {
        }
      });
  }

  VerOrdenesPost(id: string){
    const postEncontrado = this.postsList.find(post => post.id === id);
    this.ordenesList = postEncontrado?.orders ?? [];
    if (this.ordenesList.length > 0){
    this.mostrarOrdenes = true;
    }
  }

  PausarPost(id_post: string){
    const postEncontrado = this.postsList.find(post => post.id === id_post);
    let datos ={
      "id": id_post,
      "price": postEncontrado?.price,
      "description": postEncontrado?.description,
      "stock": postEncontrado?.stock,
      "status": 0,
    }

    Swal.fire({
      title: "Esta seguro de pausar el post?",
      text: "Este accion no se puede cambiar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pausar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.logicaDeNegocioService.ActualizarStatusPost(datos).subscribe({
          next: (datos:any)=>{
            Swal.fire({
              title: "Se pauso el post!",
              text: "Tu post ha sido pausado.",
              icon: "success"
            });
            this.ListarPost();
          },
          error:(err:any)=>{
            Swal.fire({
              title: "Error!",
              text: "No se pauso el post, intenta de nuevo mas tarde.",
              icon: "error"

            });
          }
        })
      }
    });

  }


  ActualizarEstadoOrden(id: string, estado: number){
    this.logicaDeNegocioService.ActualizarStatusPedido({"status": estado,"orderId": id}).subscribe({
      next: (datos:any)=>{
        console.log(datos);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })

    Swal.fire({
      title: "Esta seguro de cambiar el estado del pedido?",
      text: "Este accion no se puede cambiar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.logicaDeNegocioService.ActualizarStatusPedido({"status": estado,"orderId": id}).subscribe({
          next: (datos:any)=>{
            Swal.fire({
              title: "Se cambio el estado de la orden!",
              text: "Tu estado ha sido actualizado.",
              icon: "success"
            });
          },
          error:(err:any)=>{
            Swal.fire({
              title: "Error!",
              text: "No se actualizo el estado de la orden, intenta de nuevo mas tarde.",
              icon: "error"

            });
          }
        })
      }
    });

    this.VerOrdenesPost(id);
  }

  

}
