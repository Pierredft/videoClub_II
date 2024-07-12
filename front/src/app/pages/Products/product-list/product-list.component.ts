import { Component, Input } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { PanelComponent } from '../../CRUD/panel/panel.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, PanelComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() products: any[] = [];
}
