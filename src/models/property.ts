export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
  };
  rating: number;
  thumbnail: string;
  images: {
    main: string;
    gallery: string[];
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
  };
  amenities: string[];
  propertyType: "house" | "apartment" | "villa";
  status: "for-sale" | "for-rent";
  yearBuilt: number;
  contactInfo: {
    agent: string;
    phone: string;
    email: string;
  };
}

export interface PropertySummary {
  id: string;
  slug: string;
  title: string;
  price: number;
  location: {
    city: string;
    state: string;
  };
  rating: number;
  thumbnail: string;
  shortDescription: string;
}
