import { Component } from '@angular/core';
import { VehicleComponent } from "../../components/vehicle/vehicle.component";
import { BrandComponent } from "../../components/brand/brand.component";
import { PartComponent } from "../../components/part/part.component";
import { TBrand, TPart, TPartPopulate, TVehicle, TVehiclePopulate } from 'entities/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VehicleComponent, BrandComponent, PartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  exempleBrand: TBrand = {
    id: 0,
    name: 'Volkswagen',
    foundedAt: new Date('1937-05-28'),
    country: 'Alemanha',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Volkswagen_Logo_till_1995.svg/1200px-Volkswagen_Logo_till_1995.svg.png'
  }
  exempleVehicle: TVehiclePopulate = {
    id: 0,
    name: 'Fusca',
    year: 1970,
    vehicleType: 'hatchback',
    imageUrl: 'https://garagem360.com.br/wp-content/uploads/2022/06/Milivie-001.jpg',
    brandId: 0,
    brand: this.exempleBrand
  }

  exemplePart: TPartPopulate = {
    id: 0,
    name: 'Pastilha de freio',
    price: 85.00,
    stock: 10,
    imageUrl: 'https://a-static.mlcdn.com.br/450x450/jogo-pastilha-freio-dianteira-bosch-polo-mpi-1-0-2017-a-2023/naska2/npfdb-008/ce5725000b9a0e6d35f0cd0da3b501fa.jpeg',
    brandId: 0,
    barcode: '123456789',
    brand: this.exempleBrand
  }
}
