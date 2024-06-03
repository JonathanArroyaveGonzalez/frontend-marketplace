import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificarUsuarioComponent } from './identificar-usuario/identificar-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSeccionComponent } from './cerrar-seccion/cerrar-seccion.component';


const routes: Routes = [
{ path: "", redirectTo: "iniciar-seccion", pathMatch: "full" },

{ path: "iniciar-seccion", component: IdentificarUsuarioComponent },
  
  { path: "cambiar-clave", component: CambioClaveComponent },
  
  { path: "recuperar-clave", component: RecuperarClaveComponent },
  
  { path: "cerrar-sesion", component: CerrarSeccionComponent },
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }