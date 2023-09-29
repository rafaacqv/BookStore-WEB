import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./shop/shop.component";
import { ProductDetailsComponent } from "./shop/product-details/product-details.component";

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
