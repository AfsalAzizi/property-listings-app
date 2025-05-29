import { PropertySummary } from "@/models/property";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  property: PropertySummary;
  priority?: boolean;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};

export default function PropertyCard({
  property,
  priority = false,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48 w-full">
          <Image
            src={property.thumbnail}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {property.title}
            </h2>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-600">{property.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-2">
            {property.location.city}, {property.location.state}
          </p>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {property.shortDescription}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </span>
            <span className="text-blue-600 font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
