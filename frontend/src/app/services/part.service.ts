import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TPartCreate, TPartFilter } from 'entities';

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
    const params = new HttpParams()
      .set('sort', filter?.sort.field || '')
      .set('order', filter?.sort.order || '')
      .set('page', filter?.page || '')
      .set('limit', filter?.limit || '');
    return this.http.get(`${this.baseUrl}/find`, { params });
  }

  getPartById(id: string) {
    return this.http.get(`${this.baseUrl}/find/${id}`);
  }

  getVehiclesByPartId(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/vehicles`);
  }

  updatePart(id: string, part: TPartCreate) {
    return this.http.put(`${this.baseUrl}/update/${id}`, part);
  }

  deletePart(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  addVehicleToPart(id: string, vehicleId: string) {
    return this.http.put(`${this.baseUrl}/${id}/vehicles/add/${vehicleId}`, {});
  }

  removeVehicleFromPart(id: string, vehicleId: string) {
    return this.http.put(`${this.baseUrl}/${id}/vehicles/remove/${vehicleId}`, {});
  }
}
