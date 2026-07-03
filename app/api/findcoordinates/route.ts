import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pincode = String(body.pincode || "").trim();

  if (!pincode) {
    return NextResponse.json({ message: "Pincode is required." }, { status: 400 });
  }

  if (!process.env.OPENCAGE_API_KEY) {
    return NextResponse.json({ message: "OpenCage API key is not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(`${pincode}, India`)}&key=${process.env.OPENCAGE_API_KEY}&limit=1`
    );

    const data = await res.json();

    console.log("coordinates res", res);
    console.log("coordinates data", data);

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ message: "No coordinates found for the provided pincode." }, { status: 404 });
    }

    console.log("Geometry response : ", data.results[0].geometry);

    return NextResponse.json({
      lat: data.results[0].geometry.lat,
      lng: data.results[0].geometry.lng,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unable to fetch coordinates. Please try again later." },
      { status: 500 }
    );
  }
}