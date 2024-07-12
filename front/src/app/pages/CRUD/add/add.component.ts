import { ProductService } from './../../../services/product.service';
import Product from '../../../models/product.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Add this line to import FormsModule
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [DatePipe, FormsModule, ReactiveFormsModule], // Add FormsModule here
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  productForm: FormGroup = this.formBuilder.group({
    name: ['test', [Validators.minLength(2), Validators.required]],
    actor: ['test', [Validators.required]],
    director: ['test', [Validators.required]],
    price: ['15.54', [Validators.required]],
    synopsis: ['test', [Validators.required]],
    img: ['test', [Validators.required]],
  })

  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private product: ProductService){}


  private addProduct(): void {
    this.product.addProduct(this.productForm.value).subscribe();
    this.productForm.reset();
    this.submitted = false;
  }

  public onSubmit(): void {
    this.submitted = true;
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      this.addProduct();
    }
  }

  public get form() {
    return this.productForm.controls;
  }

  // ngOnInit(): void {
  //   // Initialize the form
  //   this.productForm = this.formBuilder.group({
  //     name: ['', [Validators.minLength(2), Validators.required]],
  //     actor: ['', [Validators.required]],
  //     director: ['', [Validators.required]],
  //     price: ['', [Validators.required]],
  //     synopsis: ['', [Validators.required]],
  //     img: ['', [Validators.required]],
  //   });
  // }


    }
