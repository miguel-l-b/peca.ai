import { Component, signal } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { TBrand, TVehicleFilter, TVehicleList, TVehiclePopulate } from 'entities/types';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleComponent } from "../../components/vehicle/vehicle.component";
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  brands$ = new Observable<TBrand[]>();
  vehicles = signal<TVehicleList>({ items: [], total: 0, pages: 0 });

  newVehicle = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      brandId: new FormControl(1, [Validators.required]),
      year: new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(2025)]),
      vehicleType: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    })
  );

  page = signal<number>(1);

  constructor(private brandService: BrandService, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getBrands();
    this.getVehicles();
  }

  createVehicle() {
    if (this.newVehicle().invalid) return;

    this.vehicleService.createVehicle({
      ...this.newVehicle().value,
      brandId: parseInt(this.newVehicle().value.brandId),
    }).subscribe(
      () => {
        this.getVehicles();
        console.log('Vehicle created successfully!');
      },
      (error) => {
        console.error('Error creating vehicle:', error);
      }
    );
    this.newVehicle().reset();
  }

  getBrands() {
    this.brands$ = this.brandService.getBrands();
  }

  nextPage() {
    this.page.update((old) => old + 1);
    this.getVehicles();
  }

  previousPage() {
    this.page.update((old) => old - 1);
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles.set(data);
    });
  }
}
