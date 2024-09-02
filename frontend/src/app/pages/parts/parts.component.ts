import { Component, signal } from '@angular/core';
import { TBrand, TPart, TPartPopulate } from 'entities/types';
import { BrandService } from '../../services/brand.service';
import { PartService } from '../../services/part.service';
import { PartComponent } from "../../components/part/part.component";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pages-parts',
  standalone: true,
  imports: [PartComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.css'
})
export class PartsComponent {
  brands!: TBrand[];
  parts$ = new Observable<TPartPopulate[]>();
  newPart = signal(new FormGroup({
    name: new FormControl('', [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    price: new FormControl(10, [Validators.required, Validators.min(1)]),
    brandId: new FormControl(1, [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  }));

  constructor(private brandService: BrandService, private partService: PartService) {
    this.getParts();
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((data) => this.brands = data);
  }

  getParts() {
    this.parts$ = this.partService.getParts();
  }

  createPart() {
    if (this.newPart().invalid) {
      return;
    }
    this.partService.createPart({
      name: this.newPart().value.name!,
      barcode: this.newPart().value.barcode!,
      price: this.newPart().value.price!,
      brandId: this.newPart().value.brandId!,
      imageUrl: this.newPart().value.imageUrl!
    }).subscribe(() => {
      this.getParts();
      this.newPart().reset();
    });
  }
}
