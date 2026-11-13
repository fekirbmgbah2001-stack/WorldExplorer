
import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Country } from '../../models/country';

import * as L from 'leaflet';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css'
})
export class CountryDetailComponent implements AfterViewInit, OnDestroy {

  @Input() country!: Country;

  @Output() close = new EventEmitter<void>();

  @ViewChild('mapContainer')
  mapContainer!: ElementRef<HTMLDivElement>;

  private map?: L.Map;

  ngAfterViewInit(): void {

    const latitude = this.country.coordinates?.lat;
    const longitude = this.country.coordinates?.lng;

    // Vérifier la disponibilité des coordonnées
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number'
    ) {
      return;
    }

    // Initialiser la carte
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [latitude, longitude],
      5
    );

    // Ajouter le fond de carte OpenStreetMap
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }
    ).addTo(this.map);

    // Ajouter un marqueur circulaire
    L.circleMarker(
      [latitude, longitude],
      {
        radius: 10,
        color: '#ffffff',
        weight: 2,
        fillColor: '#e63946',
        fillOpacity: 1
      }
    )
      .addTo(this.map)
      .bindPopup(
        `<strong>${this.country.names.common}</strong>`
      )
      .openPopup();

  }

  ngOnDestroy(): void {

    if (this.map) {
      this.map.remove();
    }

  }

}
