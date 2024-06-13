import { Component, OnInit } from '@angular/core';
import { UsuarioValidadoModel } from 'src/app/core/models/UsuarioValidado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
declare let M: any;
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  constructor(private servicioSeguridad: SeguridadService) { }

  dataSesion: UsuarioValidadoModel = new UsuarioValidadoModel();
  fondoUrl: string = "https://media.gettyimages.com/id/1435020855/es/vector/fondo-abstracto-geom%C3%A9trico-degradado-verde-oscuro-moderno-fondo-abstracto.jpg?s=612x612&w=0&k=20&c=EpueVUYWvim8jFhVdO_bOaJ3Kvet9aStZzwWDUO7fM8="
  profileUrl: string = "https://media.gettyimages.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=grBa1KTwfoWBOqu1n0ewyRXQnx59bNHtHjvbsFc82gk="

  ngOnInit() {
    this.ValidarSesion();
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }
  ValidarSesion(){
    this.servicioSeguridad.ObtenerDatossesion().subscribe({
      next: (datos:UsuarioValidadoModel)=>{
        this.dataSesion = datos;
      },
      error:(err:any)=>{

      }
      
    })
  }

}
/* constructor(
    private servicioSeguridad: SeguridadService) { }

    sesionActiva:boolean = false;

  ngOnInit() {
    this.ValidarSesion();
  }

  ValidarSesion(){
    this.servicioSeguridad.ObtenerDatossesion().subscribe({
      next: (datos:UsuarioValidadoModel)=>{
        if(datos.token != "" && datos.token != null){
          this.sesionActiva = true;
        }else{
          this.sesionActiva = false;
        }
      },
      error:(err:any)=>{

      }
      
    })
    console.log("Sesion Activa: "+this.sesionActiva);
  }
} */