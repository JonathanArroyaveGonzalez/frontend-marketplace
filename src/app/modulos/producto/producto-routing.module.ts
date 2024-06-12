import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { ReviewComponent } from './review/review.component';
import { My_postComponent } from './my_post/my_post.component';
import { MisComprasComponent } from './mis-compras/mis-compras.component';



const routes: Routes = [
{ path: "", redirectTo: "post", pathMatch: "full" },

{ path: "post", component: PostComponent },

{ path: "post-info/:id", component: PostInfoComponent },

{ path: "post-review", component: ReviewComponent },

{ path: "my-post", component: My_postComponent },

{ path: "mis-compras", component: MisComprasComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }