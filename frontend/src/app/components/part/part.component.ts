import { Component, Input } from '@angular/core';
import { BrandComponent } from "../brand/brand.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'component-part',
  standalone: true,
  imports: [BrandComponent, RouterModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.css'
})
export class PartComponent {
  @Input() id!: number;
  @Input() imageUrl!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() stock!: number;
  @Input() brand!: { name: string, foundedAt: Date, imageUrl: string };
  constructor(private router: Router) { }

  goToPart() {
    this.router.navigate(['/part', this.id]);
  }
}
