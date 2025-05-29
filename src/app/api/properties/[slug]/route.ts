import { NextResponse } from "next/server";
import propertiesData from "@/data/properties.json";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const property = propertiesData.properties.find(
      (p) => p.slug === params.slug
    );

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
