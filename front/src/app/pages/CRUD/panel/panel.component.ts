import { ProductCardComponent } from './../../Products/product-card/product-card.component';
import { SlicePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import Product from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [SlicePipe, ProductCardComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  products: Product[] = [];
  // languages: Language[] = [];

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
