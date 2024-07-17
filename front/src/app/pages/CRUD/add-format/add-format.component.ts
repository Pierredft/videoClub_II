import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormatService } from '../../../services/format.service';

@Component({
  selector: 'app-add-format',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-format.component.html',
  styleUrl: './add-format.component.css'
})
export class AddFormatComponent {
  formatForm: FormGroup = this.FormBuilder.group({
    name: ['', [Validators.minLength(2), Validators.required]],
  })

  submitted: boolean = false;
  constructor(private FormBuilder: FormBuilder, private format: FormatService){}


  private addFormat(): void {
    this.format.addFormat(this.formatForm.value).subscribe();
    this.formatForm.reset();
    this.submitted = false;
  }

  public onSubmit(): void {
    this.submitted = true;
    console.log(this.formatForm.value);
    if (this.formatForm.valid) {
      this.addFormat();
    }
  }

  public get form() {
    return this.formatForm.controls;
  }
}
