import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TPart, TPartCreate, TPartFilter, TPartPopulate, TPartUpdate, TVehicle, TVehiclePopulate } from 'entities/types';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private baseUrl = 'http://localhost:3030/part';

  constructor(private http: HttpClient) { }

  createPart(part: TPartCreate) {
    return this.http.post(`${this.baseUrl}/create`, part);
  }

  getParts(filter?: TPartFilter) {
    const params = new HttpParams();
    if (filter) {
      params.set('sort', filter.sort.field);
      params.set('order', filter.sort.order);
      params.set('page', filter.page);
      params.set('per_page', filter.per_page);
    }
    return this.http.get<TPartPopulate[]>(`${this.baseUrl}/find`, { params });
  }

  getPartById(id: number) {
    return this.http.get<TPart>(`${this.baseUrl}/find/${id}`);
  }

  getVehiclesByPartId(id: number) {
    return this.http.get<TVehiclePopulate[]>(`${this.baseUrl}/${id}/vehicles`);
  }

  updatePart(part: TPartUpdate) {
    return this.http.put(`${this.baseUrl}/update/${part.id}`, part);
  }

  deletePart(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  addVehicleToPart(id: string, vehicleId: string) {
    return this.http.put(`${this.baseUrl}/${id}/vehicles/add/${vehicleId}`, {});
  }

  removeVehicleFromPart(id: string, vehicleId: string) {
    return this.http.put(`${this.baseUrl}/${id}/vehicles/remove/${vehicleId}`, {});
  }
}
