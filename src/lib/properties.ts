import { Property, PropertySummary } from "@/models/property";
import propertiesData from "@/data/properties.json";

export function getAllProperties(): Property[] {
  return propertiesData.properties as Property[];
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return propertiesData.properties.find(
    (property) => property.slug === slug
  ) as Property | undefined;
}

export function getPropertySummaries(): PropertySummary[] {
  return propertiesData.properties.map((property) => ({
    id: property.id,
    slug: property.slug,
    title: property.title,
    price: property.price,
    location: {
      city: property.location.city,
      state: property.location.state,
    },
    rating: property.rating,
    thumbnail: property.thumbnail,
    shortDescription: property.description.split(".")[0] + ".",
  }));
}
