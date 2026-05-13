import { Component } from '@angular/core';
import { PropertyCard } from '../../components/property-card/property-card';
import { PropertyFilter } from '../../components/property-filter/property-filter';
import { PropertyHeader } from '../../components/property-header/property-header';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [PropertyCard, PropertyFilter, PropertyHeader, Navbar],
  templateUrl: './propiedades.html',
  styleUrl: './propiedades.css',
})
export class Propiedades {}
