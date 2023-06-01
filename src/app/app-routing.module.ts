import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ListOfProductsComponent } from './products/list-of-products/list-of-products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { QuickCreateProductComponent } from './products/quick-create-product/quick-create-product.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    component: LoginComponent,
    path: ''
  },
  {
    component: CreateProductComponent,
    path: 'create-product',
    canActivate: [AuthGuard]
  },
  {
    component: CreateProductComponent,
    path: 'create-product/:id'
    , canActivate: [AuthGuard]
  },
  {
    component: QuickCreateProductComponent,
    path: 'create-quick-product',
    canActivate: [AuthGuard]
  },
  {
    component: SettingsComponent,
    path: 'admin-settings',
    canActivate: [AuthGuard]
  },
  {
    component: ListOfProductsComponent,
    path: 'list-of-products',
    canActivate: [AuthGuard]
  },
  {
    component: ProductDetailsComponent,
    path: 'product-details/:id',
    canActivate: [AuthGuard]
  },
  {
    path: '**', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
