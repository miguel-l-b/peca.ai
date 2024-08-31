import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { PartsComponent } from './pages/parts/parts.component';
import { PartComponent } from './pages/part/part.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicle/:id', component: VehicleComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'part/:id', component: PartComponent },
  { path: '**', component: NotFoundComponent }
];
