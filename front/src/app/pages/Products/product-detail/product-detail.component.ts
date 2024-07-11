import { Component, Input } from '@angular/core';
import Product from '../../../models/product.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  detail!: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private productService: ProductService,
  ) {}

  private subscribeProduct(id:number) :void {
    this.productService.getProduct(id).subscribe((response) => {
      this.detail = response;
    })
  }

  private setSubscribe(id: string | null) {
    if (id) {
      this.subscribeProduct(+id);
    }else if (!id) {
      this.router.navigate(['/not-found'])
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.setSubscribe(id);
    }
  }
