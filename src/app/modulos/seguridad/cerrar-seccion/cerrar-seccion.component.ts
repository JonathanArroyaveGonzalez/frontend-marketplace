import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-seccion',
  templateUrl: './cerrar-seccion.component.html',
  styleUrls: ['./cerrar-seccion.component.css']
})
export class CerrarSeccionComponent implements OnInit {

  constructor(
    private servicioSeguridad: SeguridadService,
    private logicaDeNegocioService: LogicaNegocioService,
    private router: Router
  ) { }

  ngOnInit(){
    this.cerrarSesion();
  }
  
  cerrarSesion(){
    this.servicioSeguridad.RemoverDatosUsuarioValidado();
    this.logicaDeNegocioService.LimpiarCarrito();
    this.router.navigate([""]);
  }
}
