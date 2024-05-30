import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { NosotrosComponent } from './publico/nosotros/nosotros.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';

const routes: Routes = [
  {
  path:"inicio",
  component: InicioComponent,
},
{
  path:"",
  pathMatch: "full", 
  redirectTo: "/inicio"
},
{
  path:"nosotros",
  component: NosotrosComponent
},
{
  path: "**", 
  component: RutaNoEncontradaComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
