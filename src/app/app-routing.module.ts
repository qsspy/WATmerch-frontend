import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact/contact.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProductViewComponent } from './components/product-view/product-view/product-view.component';
import { ShopProductsComponent } from './components/shop/shop-products/shop-products.component';
import { ShopComponent } from './components/shop/shop/shop.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'product/:id', component: ProductViewComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
