import { NextResponse } from "next/server";
import propertiesData from "@/data/properties.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destinationId = searchParams.get("destination_id");
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    let filteredProperties = propertiesData.properties;

    // Filter by destination
    if (destinationId) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.location.state.toLowerCase() === destinationId.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price <= parseInt(maxPrice)
      );
    }

    return NextResponse.json(filteredProperties);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
