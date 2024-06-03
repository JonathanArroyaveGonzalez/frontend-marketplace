import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-seccion',
  templateUrl: './cerrar-seccion.component.html',
  styleUrls: ['./cerrar-seccion.component.css']
})
export class CerrarSeccionComponent implements OnInit {

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(){
    this.cerrarSesion();
  }
  
  cerrarSesion(){
    this.servicioSeguridad.RemoverDatosUsuarioValidado();
    this.router.navigate([""]);
  }
}
