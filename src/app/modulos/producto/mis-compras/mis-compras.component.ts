import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/core/models/Order.model';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  constructor(
    private servicioLogicaDeNegocio: LogicaNegocioService,
    private servicioSeguridad: SeguridadService) { }

    ordenes: any = [];
    ordenesVacias: boolean = false;
  ngOnInit() {
    this.ListarOrdenes();
  }

  ListarOrdenes() {
    this.servicioLogicaDeNegocio.ListarOrdenes(this.servicioSeguridad.datosUsuarioValidado.value.id ?? '')
    .subscribe({
      next: (datos:any)=>{
        if(datos.length > 0){
          this.ordenes = datos;
          console.log(datos)
        }else{
          this.ordenesVacias = true;
        }
      },
      error:(err:any)=>{
        console.log(err);
      }
  })

  }

  CancelarOrden(orderId: string){
    this.servicioLogicaDeNegocio.ActualizarStatusPedido({"status": 2,"orderId": orderId}).subscribe({
      next: (datos:any)=>{
        console.log(datos);
        this.ListarOrdenes();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  CalificarOrden(){
    console.log('Calificar Orden');
  }

}
