"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import LocationFilter from "@/components/LocationFilter";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import { PropertySummary } from "@/models/property";

interface PropertyData {
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
  description: string;
}

async function getProperties(
  destinationId: string | null,
  minPrice: number | null,
  maxPrice: number | null
): Promise<PropertySummary[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const params = new URLSearchParams();
  if (destinationId) params.append("destination_id", destinationId);
  if (minPrice) params.append("min_price", minPrice.toString());
  if (maxPrice) params.append("max_price", maxPrice.toString());

  const res = await fetch(`${baseUrl}/api/properties?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const properties = (await res.json()) as PropertyData[];

  return properties.map((property) => ({
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

export default function Home() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getProperties(destinationId, minPrice, maxPrice);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [destinationId, minPrice, maxPrice]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Featured Properties</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <LocationFilter onFilterChange={setDestinationId} />
          <PriceRangeFilter
            onFilterChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-8">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              No properties found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
