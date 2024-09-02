import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VehiclePageComponent } from './pages/vehicle/vehicle.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { PartsComponent } from './pages/parts/parts.component';
import { PartPageComponent } from './pages/part/part.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicle/:id', component: VehiclePageComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'part/:id', component: PartPageComponent },
  { path: '**', component: NotFoundComponent }
];
