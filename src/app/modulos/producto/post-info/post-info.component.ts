import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostIdModel } from 'src/app/core/models/Post.id.model';
import { QualificationModel } from 'src/app/core/models/Qualification.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import Swal from 'sweetalert2';

declare let M: any;
@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent implements OnInit {
  
  post: PostIdModel | null = null;
  recordId: string = "";
  currentImageIndex: number = 0;
  urlImage: string = "";
  qualification: boolean = false;
  qualificationList: QualificationModel[]= [];
  cantidadProducto = 1;

  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private logicaNegocioService: LogicaNegocioService
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit() {
    this.loadPost();
    M.AutoInit();
  }

  loadPost() {
    this.logicaNegocioService.ObtenerPost(this.recordId).subscribe({
      next: (respuesta: PostIdModel) => {
        this.post = respuesta;
        this.updateImage();
       
        if (this.post && this.post.qualifications && this.post.qualifications.length > 0) { 
          for (const qualification of this.post.qualifications[0]) { 
            this.qualificationList.push(qualification);
          }
        }
        if (this.qualificationList.length > 0) {
          this.qualification = true;
        }
       },
      error: (error: any) => {
        console.error('Error fetching post:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    });
  }

  updateImage() {
    // Check if post and images are available before accessing
    this.urlImage = this.post?.images?.[this.currentImageIndex]?.url || "https://via.placeholder.com/300"; 
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
    this.updateImage();
  }

  createArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

  agregarAlCarrito() {

    this.logicaNegocioService.AgregarProductosAlCarrito(this.post?.id ?? '',this.cantidadProducto);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1000
    });

    Swal.fire({
      title: "Producto agregado al carrito",
      text: "Quieres ir al carrito de compras ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Seguir comprando",
      confirmButtonText: "Ver carrito",
    }).then((result) => {
      if (result.isConfirmed) {
        this.Router.navigate(['producto/carrito-compras']);
      }
    });
  }
  
}


