import { Component, signal } from '@angular/core';
import { TBrand, TPartList } from 'entities/types';
import { BrandService } from '../../services/brand.service';
import { PartService } from '../../services/part.service';
import { PartComponent } from "../../components/part/part.component";
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
  parts = signal<TPartList>({ items: [], total: 0, pages: 0 });
  newPart = signal(new FormGroup({
    name: new FormControl('', [Validators.required]),
    barcode: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]),
    price: new FormControl(10, [Validators.required, Validators.min(1)]),
    brandId: new FormControl('1', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  }));
  page = signal(1);

  constructor(private brandService: BrandService, private partService: PartService) {
    this.getParts();
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((data) => this.brands = data);
  }

  getParts() {
    this.partService.getParts({
      per_page: 4,
      page: this.page(),
      sort: { field: 'name', order: 'asc' }
    }).subscribe((data) => this.parts.set(data));
  }

  createPart() {
    if (this.newPart().invalid) {
      return;
    }
    this.partService.createPart({
      name: this.newPart().value.name!,
      barcode: this.newPart().value.barcode!,
      price: this.newPart().value.price!,
      brandId: parseInt(this.newPart().value.brandId!),
      imageUrl: this.newPart().value.imageUrl!
    }).subscribe(() => {
      this.getParts();
      this.newPart().reset();
    });
  }

  nextPage() {
    this.page.update((page) => page + 1);
    this.getParts();
  }

  previousPage() {
    this.page.update((page) => page - 1);
    this.getParts();
  }
}
