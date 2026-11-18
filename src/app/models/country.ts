
export interface Country {
  names: {
    common: string;
    official: string;
  };

  flag: {
    url_svg: string;
    url_png: string;
    emoji: string;
    description?: string;
  };

  capitals: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }[];

  population: number;

  area: {
    kilometers: number;
  };

  region: string;

  subregion?: string;

  coordinates?
  : {
    lat: number;
    lng: number;
  };

  links: {
    google_maps?: string;
    open_street_maps?: string;
  };

  // Nouvelles informations

  languages?: {
    name: string;
    native_name?: string;
  }[];

  currencies?: {
    code: string;
    name: string;
    symbol?: string;
  }[];

  borders?: string[];

  calling_codes?: string[];
}
