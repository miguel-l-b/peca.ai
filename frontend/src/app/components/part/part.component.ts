import { Component, Input } from '@angular/core';
import { BrandComponent } from "../brand/brand.component";
import { Router, RouterModule } from '@angular/router';
import { TBrand, TPart, TPartPopulate } from 'entities/types';

@Component({
  selector: 'component-part',
  standalone: true,
  imports: [BrandComponent, RouterModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.css'
})
export class PartComponent {
  @Input() part!: TPartPopulate;
  constructor(private router: Router) {
  }

  goToPart() {
    this.router.navigate(['/part', this.part.id]);
  }
}
