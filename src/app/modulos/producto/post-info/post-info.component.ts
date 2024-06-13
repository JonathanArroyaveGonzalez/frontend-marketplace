import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostIdModel } from 'src/app/core/models/Post.id.model';
import { QualificationModel } from 'src/app/core/models/Qualification.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';

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
    private logicaNegocioService: LogicaNegocioService
  ) {
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit() {
    this.loadPost();
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
    alert('Producto agregado al carrito');
  }
  
}


