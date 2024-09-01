import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TBrandCreate, TBrandUpdate } from 'entities';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = 'http://localhost:3030/brand';

  constructor(private http: HttpClient) { }

  createBrand(brand: TBrandCreate) {
    return this.http.post(`${this.baseUrl}/create`, brand);
  }

  getBrands() {
    return this.http.get(`${this.baseUrl}/find`);
  }

  getBrandById(id: string) {
    return this.http.get(`${this.baseUrl}/find/${id}`);
  }

  updateBrand(id: string, brand: TBrandUpdate) {
    return this.http.put(`${this.baseUrl}/update/${id}`, brand);
  }
}
