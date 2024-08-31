import { Component, Input } from '@angular/core';
import { BrandComponent } from "../brand/brand.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'component-vehicle',
  standalone: true,
  imports: [BrandComponent, RouterModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  @Input() id!: number;
  @Input() imageUrl!: string;
  @Input() name!: string;
  @Input() year!: number;
  @Input() brand!: { name: string; foundedAt: Date; imageUrl: string; }
  constructor(private router: Router) { }

  goToVehicle() {
    this.router.navigate(['/vehicle', this.id]);
  }
}
