import { FormatService } from './../../../../services/format.service';
import { Component } from '@angular/core';
import Format from '../../../../models/format.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-panel-format',
  standalone: true,
  imports: [],
  templateUrl: './panel-format.component.html',
  styleUrl: './panel-format.component.css'
})
export class PanelFormatComponent  {
  formats: Format[] = [];

  constructor(
    private FormatService: FormatService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.FormatService.getFormats().subscribe((response) => {this.formats = response, console.log(response)});
    const id = this.route.snapshot.paramMap.get('id');
  }

  deleteFormat(id: number): void {
    this.FormatService.deleteFormat(id).subscribe(() => {
      this.formats = this.formats.filter(format => format.id !== id);
    });
  }
}
