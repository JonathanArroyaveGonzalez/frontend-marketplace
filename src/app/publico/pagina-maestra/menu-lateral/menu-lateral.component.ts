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