import { Component, signal } from '@angular/core';
import { PartComponent } from "../../components/part/part.component";
import { VehicleComponent } from "../../components/vehicle/vehicle.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TBrand, TPartPopulate, TVehiclePopulate } from 'entities/types';
import { PartService } from '../../services/part.service';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [PartComponent, VehicleComponent, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.css'
})
export class PartPageComponent {
  editPart = new FormGroup({
    name: new FormControl('', [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    brandId: new FormControl(1, [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });
  partId = signal<number>(0);
  part!: TPartPopulate;
  vehicles$ = new Observable<TVehiclePopulate[]>();
  brands$ = new Observable<TBrand[]>();

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscreve ao paramMap Observable para observar mudanças nos parâmetros da rota
    this.route.paramMap.subscribe(params => {
      const partId = parseInt(params.get('id')!);
      this.partId.set(partId);
      this.getPart(partId);
      this.getVehicles(partId);
    }).unsubscribe();
    this.getBrands();
  }

  getBrands() {
    this.brands$ = this.brandService.getBrands();
  }

  getPart(partId: number) {
    this.partService.getPartById(partId).subscribe(
      (part) => {
        this.editPart.setValue({
          name: part.name,
          barcode: part.barcode,
          price: part.price,
          stock: part.stock ?? 0,
          brandId: part.brandId,
          imageUrl: part.imageUrl,
        });
        this.part = part;
      }
    );
  }

  getVehicles(partId: number) {
    this.vehicles$ = this.partService.getVehiclesByPartId(partId);
  }

  deletePart(partId: number) {
    this.partService.deletePart(partId).subscribe(
      () => {
        this.router.navigate(['/parts']);
      }
    );
  }

  updatePart(partId: number) {
    this.partService.updatePart({
      id: partId,
      name: this.editPart.value.name ?? undefined,
      barcode: this.editPart.value.barcode ?? undefined,
      price: this.editPart.value.price ?? undefined,
      imageUrl: this.editPart.value.imageUrl ?? undefined,
      stock: this.editPart.value.stock ?? undefined,
    }).subscribe(
      () => {
        this.getPart(partId);
        this.router.navigate(['/parts']);
      },
      (error) => {
        console.error('Error editing part:', error);
      }
    );
  }
}
