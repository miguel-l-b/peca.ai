import { Component, Input } from '@angular/core';
import { TBrand } from 'entities/types';
@Component({
  selector: 'component-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  @Input() brand: TBrand | undefined;
}
