import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/Products/products.component';
import { ProductDetailComponent } from './pages/Products/product-detail/product-detail.component';
import { PanelComponent } from './pages/CRUD/panel/panel.component';




export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},

  {path: 'product', component: ProductsComponent},

  {path: 'product/:id', component: ProductDetailComponent},

  {path: 'panel', component: PanelComponent},

  {path:'**', component: NotFoundComponent},
];
