import { NextRequest, NextResponse } from "next/server";

const isValidPincode = (value: unknown): value is string => {
  return typeof value === "string" && /^[0-9]{6}$/.test(value.trim());
};

async function getCoordinates(pincode: string) {
  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey) {
    throw new Error("OpenCage API key is not configured.");
  }

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      `${pincode}, India`
    )}&key=${apiKey}&limit=1`
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`Coordinates not found for pincode ${pincode}`);
  }

  return {
    lat: data.results[0].geometry.lat,
    lng: data.results[0].geometry.lng,
  };
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pincode1, pincode2 } = body;

  if (!isValidPincode(pincode1) || !isValidPincode(pincode2)) {
    return NextResponse.json(
      { message: "Both pincode1 and pincode2 must be valid 6-digit pincodes." },
      { status: 400 }
    );
  }

  try {
    const [from, to] = await Promise.all([
      getCoordinates(pincode1.trim()),
      getCoordinates(pincode2.trim()),
    ]);

    const distance = haversineDistance(from.lat, from.lng, to.lat, to.lng);

    return NextResponse.json({
      pincode1: pincode1.trim(),
      pincode2: pincode2.trim(),
      distanceInKm: Number(distance.toFixed(3)),
      unit: "km",
      from,
      to,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to calculate distance.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
