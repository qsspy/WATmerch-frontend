import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart/cart.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { HomeComponent } from './components/home/home/home.component';
import { OrderComponent } from './components/order/order/order.component';
import { ProductViewComponent } from './components/product-view/product-view/product-view.component';
import { ShopComponent } from './components/shop/shop/shop.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'product/:id', component: ProductViewComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
