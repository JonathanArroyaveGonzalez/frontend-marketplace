import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { PaginadorPostModel } from 'src/app/core/models/Paginador.post.model';
import { PostModel } from 'src/app/core/models/Post.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
declare let M: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, AfterViewInit {
  imageUrl: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LgIPwB4gjYlOy5_YtiC7GSU5VJQVBgwG2w&s";
  imageUrl2: string = "https://firebasestorage.googleapis.com/v0/b/marketplace-6efa7.appspot.com/o/e0761072d3247b75ba50b1107f7991f4-default.png?alt=media";
  productosDestacados = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1',imagen: this.imageUrl  },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',imagen: this.imageUrl },
    { nombre: 'Producto 3', descripcion: 'Descripción del producto 3',imagen: this.imageUrl }
  ];

  categorias = [
    { nombre: 'Categoría 1', imagen: this.imageUrl },
    { nombre: 'Categoría 2', imagen: this.imageUrl },
    { nombre: 'Categoría 3', imagen: this.imageUrl }
  ];

  productList : PostModel [] = [];
  pag =1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registrosPorPagina;

  constructor(
    private servicioLogicaNegocio: LogicaNegocioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarPost();
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems);
  }

  listarPost() {
    this.servicioLogicaNegocio.ListarPost(this.pag).subscribe({
      next: (respuesta: PaginadorPostModel ) => {
        this.productList = respuesta.registros;
        this.total = respuesta.totalRegistros;
        console.log(this.productList);
      },
      error: (error: any) => {
        console.log(error);
        alert('Error al listar los productos');
      }
    });
  }

  getFirstImageUrl(post: PostModel): string | null {
    if (post.images && post.images.length > 0) {
      return (post.images[0].url ?? this.imageUrl);
    } else {
      return this.imageUrl; // O una URL de imagen por defecto si lo prefieres
    }
  }

  hasImage(post: PostModel): boolean {
    return (post.images ?? []).length > 0; // Si post.images es null o undefined, usa un array vacío
  }

}
