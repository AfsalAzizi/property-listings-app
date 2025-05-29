import { NextRequest, NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/properties";

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(request: NextRequest, context: Props) {
  try {
    const property = getPropertyBySlug(context.params.slug);

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
