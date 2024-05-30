import { AfterViewInit, Component, OnInit } from '@angular/core';
declare let M: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, AfterViewInit {
  imageUrl: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LgIPwB4gjYlOy5_YtiC7GSU5VJQVBgwG2w&s";

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

  ngOnInit() {
    // Lógica para cargar productos destacados y categorías desde tu API
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems);
  }
}
