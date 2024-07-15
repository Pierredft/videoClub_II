import { Component, OnInit } from '@angular/core';
import Product from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  // languages: Language[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {this.products = response; console.log(response)});
    let i = 0;
  }
}
