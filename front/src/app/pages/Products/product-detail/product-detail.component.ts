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
  detail!: Product; // sert à déclarer une variable sans l'initialiser

  // permet de récupérer les données de l'API
  constructor(
    private router: Router, // permet de naviguer entre les pages
    private route: ActivatedRoute, // permet de récupérer les paramètres de l'URL

    private productService: ProductService, // permet de récupérer les données de l'API
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
