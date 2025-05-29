import { notFound } from "next/navigation";
import Image from "next/image";
import { Property } from "@/models/property";

async function getProperty(slug: string): Promise<Property> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/properties/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch property");
  }

  return res.json();
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full mb-8">
        <Image
          src={property.images.main}
          alt={property.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="ml-1 text-gray-600">{property.rating}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">
                {property.location.city}, {property.location.state}
              </span>
            </div>

            <p className="text-gray-700 text-lg mb-6">{property.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Bedrooms</div>
                <div className="text-xl font-semibold">
                  {property.features.bedrooms}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Bathrooms</div>
                <div className="text-xl font-semibold">
                  {property.features.bathrooms}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Area</div>
                <div className="text-xl font-semibold">
                  {property.features.area} sq ft
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Parking</div>
                <div className="text-xl font-semibold">
                  {property.features.parking} spots
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {property.images.gallery.map((image, index) => (
                <div key={index} className="relative h-48">
                  <Image
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="text-3xl font-bold text-blue-600 mb-6">
              {formatPrice(property.price)}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Agent</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span>{" "}
                    {property.contactInfo.agent}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span>{" "}
                    {property.contactInfo.phone}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span>{" "}
                    {property.contactInfo.email}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Property Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Type:</span>{" "}
                    {property.propertyType}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{" "}
                    {property.status}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Year Built:</span>{" "}
                    {property.yearBuilt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
