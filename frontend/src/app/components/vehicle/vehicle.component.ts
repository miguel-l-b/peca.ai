import { Component, Input } from '@angular/core';
import { BrandComponent } from "../brand/brand.component";
import { Router, RouterModule } from '@angular/router';
import { TVehicle } from 'entities';

@Component({
  selector: 'component-vehicle',
  standalone: true,
  imports: [BrandComponent, RouterModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  @Input() vehicle!: TVehicle;
  constructor(private router: Router) { }

  goToVehicle() {
    this.router.navigate(['/vehicle', this.vehicle.id]);
  }
}
