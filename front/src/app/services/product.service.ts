import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // post(value: any) {
  //   throw new Error('Method not implemented.');
  // }

  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private httpClient:HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.apiUrl}/product`);
  }

  getProduct(id: number) : Observable<Product>{
    return this.httpClient.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  addProduct(product: Product) : Observable<Product>{
    return this.httpClient.post<Product>(`${this.apiUrl}/product`, product);
}

  updateProduct(product: Product) : Observable<Product>{
    return this.httpClient.put<Product>(`${this.apiUrl}/product/${product.id}`, product);
  }

  deleteProduct(id: number) : Observable<Product>{
    return this.httpClient.delete<Product>(`${this.apiUrl}/product/${id}`);
  }

}
