import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RoutingService } from './shared/services/routing.service';
import { ProductsModule } from './components/products/products.module';
import { CartModule } from './components/cart/cart.module';
import { SharedModule } from './shared/services/shared.module';
import { CartService } from './components/cart/cart.service';
import { NavigationService } from './shared/services/navigation.service';
import { CheckoutModule } from './components/checkout/checkout.module';
import { CheckoutService } from './components/checkout/checkout.service';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [AppComponent, OrdersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LoginModule,
    ProductsModule,
    HttpClientModule,
    CartModule,
    CheckoutModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    HttpClient,
    RoutingService,
    CartService,
    NavigationService,
    CheckoutService,
  ],
})
export class AppModule {}
