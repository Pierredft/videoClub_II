import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Product from '../../../models/product.model';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule],  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  products: Product[] = [];
productId: string;
updateProductForm: FormGroup;

constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private formBuilder: FormBuilder,
  private router: Router
){
  this.productId = '';
  this.updateProductForm = this.formBuilder.group({
    name: ['', [Validators.minLength(2), Validators.required]],
    actor: ['', [Validators.required]],
    director: ['', [Validators.required]],
    price: ['', [Validators.required]],
    synopsis: ['', [Validators.required]],
    img: ['', [Validators.required]],
  });
}
ngOnInit(): void {
  this.productId = this.route.snapshot.params['id']!;
  const productIdNumber = parseInt(this.productId, 10);
  this.productService.getProduct(productIdNumber).subscribe((product: any) => {
    this.updateProductForm.setValue({
      name: product.name,
      actor: product.actor,
      director: product.director,
      price: product.price,
      synopsis: product.synopsis,
      img: product.img
    });
  });
}

onSubmit(): void {
  const updatedProduct = {
    id: this.productId,
    ...this.updateProductForm.value,
  };
  this.productService.updateProduct(updatedProduct).subscribe((response: any) => {
    console.log("Product updated successfully");
    this.router.navigate(['/panel']);
  });
}
}
