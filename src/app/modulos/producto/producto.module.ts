import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostInfoComponent } from './post-info/post-info.component';
import { ReviewComponent } from './review/review.component';

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
    ReviewComponent
  ]
})
export class ProductoModule { }
