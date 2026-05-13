import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Property {
  id: number;
  image: string;
  type: string;
  price: number;
  title: string;
  location: string;
  meters: number;
  bedrooms: number;
  bathrooms: number;
}

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
})
export class PropertyCard {
  // Datos mock para pruebas mientras no exista integración con backend/DB.
  properties: Property[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      type: 'Venta',
      price: 98000000,
      title: 'Casa familiar moderna',
      location: 'La Florida, Santiago',
      meters: 120,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      type: 'Arriendo',
      price: 650000,
      title: 'Departamento céntrico',
      location: 'Providencia, Santiago',
      meters: 68,
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      type: 'Venta',
      price: 175000000,
      title: 'Casa con patio amplio',
      location: 'Maipu, Santiago',
      meters: 160,
      bedrooms: 4,
      bathrooms: 3,
    },
  ];
}
