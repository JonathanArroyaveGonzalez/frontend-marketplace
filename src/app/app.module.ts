import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PiePaginaComponent } from './publico/pie-pagina/pie-pagina.component';
import { EncabezadoComponent } from './publico/encabezado/encabezado.component';

@NgModule({
  declarations: [
    AppComponent,
    PiePaginaComponent,
    EncabezadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
