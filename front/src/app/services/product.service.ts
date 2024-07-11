import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';
  constructor(private htppClient:HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.htppClient.get<Product[]>(`${this.apiUrl}/product`);
  }

  getProduct(id: number) : Observable<Product>{
    return this.htppClient.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  addProduct(product: Product) : Observable<Product>{
    return this.htppClient.post<Product>(`${this.apiUrl}/product/`, product);
  }

  updateProduct(product: Product) : Observable<Product>{
    return this.htppClient.put<Product>(`${this.apiUrl}/product/${product.id}`, product);
  }

  delateProduct(id: number) : Observable<Product>{
    return this.htppClient.delete<Product>(`${this.apiUrl}/product/${id}`);
  }
}
