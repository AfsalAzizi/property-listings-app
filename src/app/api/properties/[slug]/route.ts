import { NextRequest, NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/properties";

export async function GET(request: NextRequest) {
  try {
    const slug = request.url.split("/").pop();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const property = getPropertyBySlug(slug);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
