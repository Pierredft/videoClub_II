import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/Products/products.component';
import { ProductDetailComponent } from './pages/Products/product-detail/product-detail.component';
import { PanelComponent } from './pages/CRUD/panel/panel.component';
import { AddComponent } from './pages/CRUD/add/add.component';
import { UpdateComponent } from './pages/CRUD/update/update.component';




export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},

  {path: 'product', component: ProductsComponent},

  {path: 'product/:id', component: ProductDetailComponent},

  {path: 'panel', component: PanelComponent},

  {path: 'addProduct', component: AddComponent},

  {path: 'updateProduct/:id', component: UpdateComponent},

  {path:'**', component: NotFoundComponent},
];
