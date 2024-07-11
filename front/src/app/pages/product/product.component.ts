import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response, Router } from 'express';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  detail!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private ProductService : ProductService
  ) {}

  private subscribeProduct(id: number) :void{
    this.ProductService.getProduct(id).subscribe((response: any) => {
      this.detail = response;
    })
  }

  ngOnInit(): void {

  }
}
