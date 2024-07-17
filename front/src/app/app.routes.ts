import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/Products/products.component';
import { ProductDetailComponent } from './pages/Products/product-detail/product-detail.component';
import { PanelComponent } from './pages/CRUD/panel/panel.component';
import { AddComponent } from './pages/CRUD/add/add.component';
import { UpdateComponent } from './pages/CRUD/update/update.component';
import { AddFormatComponent } from './pages/CRUD/add-format/add-format.component';
import { PanelProductComponent } from './pages/CRUD/panel/panel-product/panel-product.component';
import { PanelFormatComponent } from './pages/CRUD/panel/panel-format/panel-format.component';
import { UpdateFormatComponent } from './pages/CRUD/update-format/update-format.component';




export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},

  {path: 'product', component: ProductsComponent},

  {path: 'product/:id', component: ProductDetailComponent},

  {path: 'panel', component: PanelComponent},

  {path: 'panel/product', component: PanelProductComponent},

  {path: 'panel/format', component: PanelFormatComponent},

  {path: 'addProduct', component: AddComponent},

  {path: 'updateProduct/:id', component: UpdateComponent},

  {path: 'updateFormat/:id', component: UpdateFormatComponent},

  {path: 'addFormat', component: AddFormatComponent},

  {path:'**', component: NotFoundComponent},
];
