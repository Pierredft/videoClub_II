import { FormatService } from './../../../services/format.service';
import { Component } from '@angular/core';
import Format from '../../../models/format.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-update-format',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-format.component.html',
  styleUrl: './update-format.component.css'
})
export class UpdateFormatComponent {
  formats: Format[] = [];
  formatId: string;
  updateFormatForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formatService: FormatService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.formatId = '';
    this.updateFormatForm = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.required]],
    });
  }
  ngOnInit(): void {
    this.formatId = this.route.snapshot.params['id']!;
    const formatIdNumber = parseInt(this.formatId, 10);
    this.formatService.getFormat(formatIdNumber).subscribe((format: any) => {
      this.updateFormatForm.setValue({
        name: format.name,
      });
    });
  }

  onSubmit(): void {
    const updatedFormat = {
      id: this.formatId,
      ...this.updateFormatForm.value,
    };
    this.formatService.updateFormat(updatedFormat).subscribe((response: any) => {
      console.log("Product updated successfully");
      this.router.navigate(['/panel']);
    });
  }
}
