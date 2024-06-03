import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    PostComponent,
  ]
})
export class ProductoModule { }
