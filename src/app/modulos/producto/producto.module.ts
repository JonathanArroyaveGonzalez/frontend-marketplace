import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostInfoComponent } from './post-info/post-info.component';
import { ReviewComponent } from './review/review.component';
import { My_postComponent } from './my_post/my_post.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';

@NgModule({
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    PostComponent,
    PostInfoComponent,
    ReviewComponent,
    My_postComponent,
    MisComprasComponent,
    CarritoComprasComponent
  ]
})
export class ProductoModule { }
