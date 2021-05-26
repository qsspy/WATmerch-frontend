import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account/account.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete/order-complete.component';
import { OrderComponent } from './components/order/order/order.component';
import { ProductViewComponent } from './components/product-view/product-view/product-view.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ShopComponent } from './components/shop/shop/shop.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {depth: 1}},
  {path: 'shop', component: ShopComponent, data: {depth: 2}},
  {path: 'contact', component: ContactComponent, data: {depth: 3}},
  {path: 'product/:id', component: ProductViewComponent, data: {depth: 4}},
  {path: 'cart', component: CartComponent, data: {depth: 5}},
  {path: 'order', component: OrderComponent, data: {depth: 6}},
  {path: 'orderComplete', component: OrderCompleteComponent, data: {depth: 7}},
  {path: 'login', component: LoginComponent, data: {depth: 8}},
  {path: 'account', component: AccountComponent, data: {depth: 9}},
  {path: 'register', component: RegisterComponent, data: {depth: 10}},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
