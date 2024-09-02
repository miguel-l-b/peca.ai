import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TPart, TPartPopulate, TVehicle, TVehicleCreate, TVehicleFilter, TVehicleList, TVehiclePopulate, TVehicleUpdate } from 'entities/types';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:3030/vehicle';
  constructor(private http: HttpClient) { }

  getVehicles(filter?: TVehicleFilter) {
    const params = new HttpParams();
    if (filter) {
      params.set('sort', filter.sort.field);
      params.set('order', filter.sort.order);
      params.set('per_page', filter.per_page);
      params.set('page', filter.page);
    }
    return this.http.get<TVehicleList>(`${this.baseUrl}/find`, { params });
  }

  createVehicle(vehicle: TVehicleCreate) {
    return this.http.post(`${this.baseUrl}/create`, vehicle);
  }

  getVehicleById(id: number) {
    return this.http.get<TVehiclePopulate>(`${this.baseUrl}/find/${id}`);
  }

  getVehiclePartsById(id: number) {
    return this.http.get<TPartPopulate[]>(`${this.baseUrl}/${id}/parts`);
  }

  updateVehicle(vehicle: TVehicleUpdate) {
    return this.http.put(`${this.baseUrl}/update/${vehicle.id}`, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
