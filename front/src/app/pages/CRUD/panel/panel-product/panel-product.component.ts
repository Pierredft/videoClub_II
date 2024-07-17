import { Component } from '@angular/core';
import Product from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ProductCardComponent } from '../../../Products/product-card/product-card.component';

@Component({
  selector: 'app-panel-product',
  standalone: true,
  imports: [SlicePipe, ProductCardComponent],
  templateUrl: './panel-product.component.html',
  styleUrl: './panel-product.component.css'
})
export class PanelProductComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router, // permet de naviguer entre les pages
    private route: ActivatedRoute, // permet de récupérer les paramètres de l'URL
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {this.products = response, console.log(response)});
    // this.LanguageService.getLanguages().subscribe((response) => {this.languages = response});
    const id = this.route.snapshot.paramMap.get('id');
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
