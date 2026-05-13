import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-property-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-header.html',
  styleUrl: './property-header.css',
})
export class PropertyHeader {

  isDropdownOpen = false;

  selectedOption = 'Más recientes';

  sortOptions = [
    'Más recientes',
    'Precio: menor a mayor',
    'Precio: mayor a menor',
    'Más habitaciones',
    'Mayor tamaño',
    'Menor tamaño'
  ];

  toggleDropdown(): void {

    this.isDropdownOpen =
      !this.isDropdownOpen;

  }

  selectOption(option: string): void {

    this.selectedOption = option;

    this.isDropdownOpen = false;

  }

}
