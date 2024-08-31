import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  @Input() name!: string;
  @Input() foundedAt!: Date;
  @Input() imageUrl!: string;
}
