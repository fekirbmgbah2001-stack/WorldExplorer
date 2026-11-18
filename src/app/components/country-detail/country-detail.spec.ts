
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail';
import { Country } from '../../models/country';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;

  const mockCountry: Country = {
    names: {
      common: 'Guinée',
      official: 'République de Guinée'
    },
    flag: {
      url_svg: '',
      url_png: '',
      emoji: '🇬🇳'
    },
    capitals: [
      {
        name: 'Conakry'
      }
    ],
    population: 14000000,
    area: {
      kilometers: 245857
    },
    region: 'Africa',
    subregion: 'Western Africa',
    links: {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('country', mockCountry);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
