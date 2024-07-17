import { ProductService } from './../../../services/product.service';
import Product from '../../../models/product.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Add this line to import FormsModule
import { Component, OnInit } from '@angular/core';
import Format from '../../../models/format.model';
import { FormatService } from '../../../services/format.service';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [DatePipe, FormsModule, ReactiveFormsModule, RouterLink, CommonModule], // Add FormsModule here
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  public get form() {
    return this.productForm.controls;
  }

  productForm: FormGroup;
  formats: Format[] = [];
  products: Product[] = [];
  submitted: boolean = false;
  constructor(
    private FormBuilder: FormBuilder,
    private formatService: FormatService,
    private ProductService: ProductService,
    private router: Router
  ) {
    this.productForm = this.FormBuilder.group({
      name: ['', Validators.required],
      actor: ['', Validators.required],
      director: ['', Validators.required],
      price: ['', Validators.required],
      synopsis: ['', Validators.required],
      img: ['', Validators.required],
      popular: [false, Validators.required],
      idFormat: ['null', Validators.required]
    });
    }

    ngOnInit(): void {
      this.loadFormats();
    }

    loadFormats(): void {
      this.formatService.getFormats().subscribe((formats)=> {
        this.formats = formats;
      });
    }
    onSubmit(): void {
      if (this.productForm.valid) {
        console.log(this.productForm.value);
        this.ProductService.addProduct(this.productForm.value).subscribe({
          next: (response) => {
            alert('Product added successfully');
            this.products.push(response);
            this.productForm.reset();
          },
          error: (error) => {
            console.error("There was an error!", error);
          }
        })
      }
    }
  }
