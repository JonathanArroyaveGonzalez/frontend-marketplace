import { Component, OnInit } from '@angular/core';
import { UsuarioValidadoModel } from 'src/app/core/models/UsuarioValidado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(
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
}
