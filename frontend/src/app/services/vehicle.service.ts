import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TVehicleCreate, TVehicleUpdate } from 'entities';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:3030/vehicle';
  constructor(private http: HttpClient) { }

  getVehicleList() {
    return this.http.get(`${this.baseUrl}/find`);
  }

  createVehicle(vehicle: TVehicleCreate) {
    return this.http.post(`${this.baseUrl}/add`, vehicle);
  }

  getVehicleById(id: number) {
    return this.http.get(`${this.baseUrl}/find/${id}`);
  }

  getVehiclePartsById(id: number) {
    return this.http.get(`${this.baseUrl}/find/${id}/parts`);
  }

  updateVehicle(id: number, vehicle: TVehicleUpdate) {
    return this.http.put(`${this.baseUrl}/update/${id}`, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
