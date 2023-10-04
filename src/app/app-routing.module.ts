import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./shop/shop.component";
import { ProductDetailsComponent } from "./shop/product-details/product-details.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { ServerErrorComponent } from "./core/server-error/server-error.component";

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
