import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { PaginadorPostModel } from 'src/app/core/models/Paginador.post.model';
import { PostModel } from 'src/app/core/models/Post.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';
declare let M: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, AfterViewInit {

  imageUrl: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LgIPwB4gjYlOy5_YtiC7GSU5VJQVBgwG2w&s";

  homeImageUrl: string = "https://media.gettyimages.com/id/1357529193/es/foto/renderizado-3d-de-una-acogedora-sala-de-estar.jpg?s=612x612&w=0&k=20&c=_KyFyYwcSf6blDOdi1AHwqppchJ26tzPGOda4YZCpHw=";
  technologyImageUrl: string = "https://media.gettyimages.com/id/1332176260/es/foto/hombre-que-trabaja-en-una-oficina-creativa-usando-su-computadora-y-personas-que-se-mueven-en.jpg?s=612x612&w=0&k=20&c=NY815wpKVmo82lDvRgLAa5ZIFYTuh1ye0cBk94xRfoQ=";
  gardenImageUrl: string = "https://media.gettyimages.com/id/971388782/es/foto/abuelo-y-nieto-en-jard%C3%ADn.jpg?s=612x612&w=0&k=20&c=9T_jBDK8e0jKLM21I9sdIkUf7a_TSWoxE8lTBEYze6o=";
  foodImageUrl: string = "https://media.gettyimages.com/id/1365546460/es/foto/woman-takes-fresh-organic-vegetables.jpg?s=612x612&w=0&k=20&c=-Fa7MZoHc8RPtrcHdIPe3WAI46nK11mi1LX1B76pbzc=";
  categorias = [
    { nombre: 'Hogar', imagen: this.homeImageUrl },
    { nombre: 'Tecnologia', imagen: this.technologyImageUrl },
    { nombre: 'Jardin', imagen: this.gardenImageUrl },
    { nombre: 'Comida', imagen: this.foodImageUrl}
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
  
    // Asegúrate de que haya al menos un carrusel
    if (elems.length > 0) {
      const carouselInstance = M.Carousel.init(elems[0], {
        fullWidth: true,
        indicators: true,
        duration: 300,
        interval: 2000 // Cambia cada 2 segundos
      });
  
      setInterval(() => {
        carouselInstance.next(); // Mueve al siguiente slide
      }, 4000); 
    } else {
      // Maneja el caso donde no hay carruseles (opcional)
      console.error("No se encontraron carruseles en la página.");
    }
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
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al listar los productos",
          showConfirmButton: false,
          timer: 1000
        });
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

  agregarAlCarrito(id: string) {
    this.servicioLogicaNegocio.AgregarProductosAlCarrito(id,1);
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
        this.router.navigate(['producto/carrito-compras']);
      }
    });
  }

}
