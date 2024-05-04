export interface ITour {
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  id: string;
  type?: string;
  date?: string;
  country?: string;
  createdAt?: string;
  avatar?: string;
}


export interface ITourTypeSelect {
  label?: string,
  value?: string,
  date?: string
}

export interface INearestTour extends ITour {
  locationId: string;
}

export interface ITourLocation {
  name: string;
  id: string;
  country: string;
}

export  interface INearestTourWithCountry extends INearestTour {
  country: string;
  
}

