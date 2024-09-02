import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TBrand, TBrandCreate, TBrandUpdate } from 'entities/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = 'http://localhost:3030/brand';

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get<TBrand[]>(`${this.baseUrl}/find`);
  }
}
