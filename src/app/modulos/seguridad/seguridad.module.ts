import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentificarUsuarioComponent } from './identificar-usuario/identificar-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CerrarSeccionComponent } from './cerrar-seccion/cerrar-seccion.component';

@NgModule({
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    IdentificarUsuarioComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,
    CerrarSeccionComponent,
  ]
})
export class SeguridadModule { }
