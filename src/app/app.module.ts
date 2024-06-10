import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this line

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PiePaginaComponent } from './publico/pagina-maestra/pie-pagina/pie-pagina.component';
import { EncabezadoComponent } from './publico/pagina-maestra/encabezado/encabezado.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { ErrorDeServidorComponent } from './publico/errores/error-de-servidor/error-de-servidor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuLateralComponent } from './publico/pagina-maestra/menu-lateral/menu-lateral.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    PiePaginaComponent,
    EncabezadoComponent,
    InicioComponent,
    RutaNoEncontradaComponent,
    ErrorDeServidorComponent,
    MenuLateralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
