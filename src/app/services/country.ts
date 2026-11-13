
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { expand, reduce } from 'rxjs/operators';

import { Country } from '../models/country';

interface ApiResponse {
  data: {
    objects: Country[];
    meta: {
      total: number;
      count: number;
      limit: number;
      offset: number;
      more: boolean;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl =
    'https://api.restcountries.com/countries/v5';

  private apiKey = 'rc_live_f2fd74c3bc8949138cde2d81e7bd4eac';

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.apiKey}`
  });

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {

    const limit = 100;

    const loadPage = (offset: number) => {

      return this.http.get<ApiResponse>(
        `${this.apiUrl}?limit=${limit}&offset=${offset}`,
        { headers: this.headers }
      );

    };

    return loadPage(0).pipe(

      expand(response => {

        const meta = response.data.meta;

        if (meta.more) {
          return loadPage(meta.offset + meta.limit);
        }

        return EMPTY;

      }),

      reduce((allCountries, response) => {

        return allCountries.concat(response.data.objects);

      }, [] as Country[])

    );

  }

}
