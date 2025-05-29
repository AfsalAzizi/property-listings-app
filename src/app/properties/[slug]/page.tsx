import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Property } from "@/models/property";
import { getAllProperties } from "@/lib/properties";

type Props = {
  params: {
    slug: string;
  };
};

// Generate static params for all properties at build time
export async function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getProperty(params.slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.title,
    description: property.description,
  };
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/properties/${slug}`, {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch property");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export default async function PropertyPage({ params }: Props) {
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

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
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <p className="text-gray-600 mb-6">{property.description}</p>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">Bedrooms</div>
                <div className="text-xl font-semibold">
                  {property.features.bedrooms}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">Bathrooms</div>
                <div className="text-xl font-semibold">
                  {property.features.bathrooms}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">Area</div>
                <div className="text-xl font-semibold">
                  {property.features.area} sq ft
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">Parking</div>
                <div className="text-xl font-semibold">
                  {property.features.parking} spots
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {property.images.gallery.map((image, index) => (
                <div key={index} className="relative h-64">
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Agent:</span>{" "}
                {property.contactInfo.agent}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {property.contactInfo.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {property.contactInfo.email}
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
