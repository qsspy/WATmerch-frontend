import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HeaderComponent } from './components/home/header/header.component';
import { HomeComponent } from './components/home/home/home.component';
import { HomeProductsComponent } from './components/home/home-products/home-products.component';
import { QualityComponent } from './components/home/quality/quality.component';
import { NewsletterComponent } from './components/home/newsletter/newsletter.component';
import { ShopComponent } from './components/shop/shop/shop.component';
import { CategoryBarComponent } from './components/shop/category-bar/category-bar.component';
import { ShopProductsComponent } from './components/shop/shop-products/shop-products.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductViewComponent } from './components/product-view/product-view/product-view.component';
import { ColorPickerComponent } from './components/product-view/color-picker/color-picker.component';
import { SizePickerComponent } from './components/product-view/size-picker/size-picker.component';
import { QuantityPickerComponent } from './components/product-view/quantity-picker/quantity-picker.component';
import { ProductInfoComponent } from './components/product-view/product-info/product-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CartDetailsComponent } from './components/cart/cart-details/cart-details.component';
import { CartTotalsComponent } from './components/cart/cart-totals/cart-totals.component';
import { OrderComponent } from './components/order/order/order.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { OrderTotalsComponent } from './components/order/order-totals/order-totals.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete/order-complete.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LeftSidebarComponent,
    HeaderComponent,
    HomeComponent,
    HomeProductsComponent,
    QualityComponent,
    NewsletterComponent,
    ShopComponent,
    CategoryBarComponent,
    ShopProductsComponent,
    ContactComponent,
    ProductViewComponent,
    ColorPickerComponent,
    SizePickerComponent,
    QuantityPickerComponent,
    ProductInfoComponent,
    SidebarComponent,
    CartComponent,
    CartDetailsComponent,
    CartTotalsComponent,
    OrderComponent,
    OrderFormComponent,
    OrderTotalsComponent,
    OrderCompleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatBadgeModule, 
    ReactiveFormsModule
  ],
  exports: [MatSidenavModule, MatBadgeModule],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
