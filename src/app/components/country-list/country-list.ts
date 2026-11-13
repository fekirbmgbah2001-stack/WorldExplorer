
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CountryService } from '../../services/country';
import { Country } from '../../models/country';
import { CountryDetailComponent } from '../country-detail/country-detail';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CountryDetailComponent],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryListComponent implements OnInit {

  countries: Country[] = [];

  loading = true;

  errorMessage = '';

  searchTerm = '';

  selectedRegion = 'Tous';

regions: string[] = [
  'Tous',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania'
];

  selectedCountry: Country | null = null;

  constructor(
    private countryService: CountryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.countryService.getCountries().subscribe({

      next: (data: Country[]) => {

        this.countries = data;
        this.loading = false;

        this.cdr.markForCheck();

      },

      error: (error: any) => {

        console.error('Erreur API :', error);

        this.errorMessage =
          `Erreur HTTP ${error.status || 'inconnue'} : ${error.message}`;

        this.loading = false;

        this.cdr.markForCheck();

      }

    });

  }

  // Rechercher un pays
  get filteredCountries(): Country[] {

  const search = this.searchTerm.toLowerCase().trim();

  return this.countries.filter(country => {

    const matchesSearch =
      country.names.common.toLowerCase().includes(search) ||
      country.region.toLowerCase().includes(search);

    const matchesRegion =
      this.selectedRegion === 'Tous' ||
      country.region === this.selectedRegion;

    return matchesSearch && matchesRegion;

  });

}

  // Sélectionner un pays
  selectCountry(country: Country): void {

    this.selectedCountry = country;

  }

  // Fermer les détails
  closeDetails(): void {

    this.selectedCountry = null;

  }

}
