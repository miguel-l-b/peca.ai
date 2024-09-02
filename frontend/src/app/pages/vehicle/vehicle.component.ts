import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TBrand, TPartPopulate, TVehiclePopulate } from 'entities/types';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { BrandComponent } from "../../components/brand/brand.component";
import { PartComponent } from "../../components/part/part.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { VehicleComponent } from "../../components/vehicle/vehicle.component";

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, BrandComponent, PartComponent, ReactiveFormsModule, RouterModule, VehicleComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehiclePageComponent {
  editVehicle = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brandId: new FormControl(1, [Validators.required]),
    year: new FormControl<number | null>(null, [Validators.required, Validators.min(1900), Validators.max(2025)]),
    vehicleType: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });
  vehicleId = signal<number>(0);
  vehicle!: TVehiclePopulate;
  parts$ = new Observable<TPartPopulate[]>();
  brands$ = new Observable<TBrand[]>();

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscreve ao paramMap Observable para observar mudanças nos parâmetros da rota
    this.route.paramMap.subscribe(params => {
      const vehicleId = parseInt(params.get('id')!);
      this.vehicleId.set(vehicleId);
      this.getVehicle(vehicleId);
      this.getParts(vehicleId);
    }).unsubscribe();
    this.getBrands();
  }

  getBrands() {
    this.brands$ = this.brandService.getBrands();
  }

  getVehicle(vehicleId: number) {
    this.vehicleService.getVehicleById(vehicleId).subscribe(
      (vehicle) => {
        this.editVehicle.setValue({
          name: vehicle.name,
          brandId: vehicle.brandId,
          year: vehicle.year,
          vehicleType: vehicle.vehicleType,
          imageUrl: vehicle.imageUrl
        })
        this.vehicle = vehicle;
      },
      (error) => {
        this.router.navigate(['/vehicles']);
      }
    );
  }

  getParts(vehicleId: number) {
    this.parts$ = this.vehicleService.getVehiclePartsById(vehicleId);
  }

  updateVehicle() {
    this.vehicleService.updateVehicle({
      id: this.vehicleId(),
      name: this.editVehicle.value.name ?? undefined,
      imageUrl: this.editVehicle.value.imageUrl ?? undefined,
      year: this.editVehicle.value.year ?? undefined,
    })
      .subscribe(
        () => {
          this.router.navigate(['/vehicles']);
        },
        (error) => {
          console.error('Error editing vehicle:', error);
        }
      );
  }

  deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      () => {
        this.router.navigate(['/vehicles']);
      },
      (error) => {
        console.error('Error deleting vehicle:', error);
      }
    );
  }
}
