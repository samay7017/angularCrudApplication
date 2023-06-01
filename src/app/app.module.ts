import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HamburgerComponent } from './shared/components/hamburger/hamburger.component';
import { ListOfProductsComponent } from './products/list-of-products/list-of-products.component';
import { QuickCreateProductComponent } from './products/quick-create-product/quick-create-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings/settings.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductFilterPipe } from './shared/pipes/product-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HamburgerComponent,
    ListOfProductsComponent,
    QuickCreateProductComponent,
    CreateProductComponent,
    LoginComponent,
    SettingsComponent,
    ProductDetailsComponent,
    ErrorComponent,
    ProductFilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
