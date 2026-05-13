import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-property-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-filter.html',
  styleUrl: './property-filter.css',
})
export class PropertyFilter {

  filters = [

    {
      title: 'Tipo de operación',

      options: [
        'Venta',
        'Arriendo'
      ]
    },

    {
      title: 'Rango de precio',

      options: [
        '$50M',
        '$300M+'
      ]
    },

    {
      title: 'Ubicación',

      options: [
        'Ñuñoa',
        'Maipú',
        'La Florida',
        'San Miguel',
        'Puente Alto',
        'Santiago Centro'
      ]
    },

    {
      title: 'Tipo de propiedad',

      options: [
        'Departamentos',
        'Casas'
      ]
    },

    {
      title: 'Dormitorios',

      options: [
        '1+',
        '2+',
        '3+',
        '4+'
      ]
    }

  ];

}
