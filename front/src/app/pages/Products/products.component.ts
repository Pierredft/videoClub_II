import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "./product-list/product-list.component";
import Product from '../../models/product.model';
import Language from '../../models/language.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  // languages: Language[] = [];

  constructor(
    private productService: ProductService,
    // private LanguageService: LanguageService
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {this.products = response, console.log(response)});
    // this.LanguageService.getLanguages().subscribe((response) => {this.languages = response});
  }
}
