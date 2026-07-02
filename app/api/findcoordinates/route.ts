import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const { pincode } = await req.json();

    try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${pincode},India&key=${process.env.OPENCAGE_API_KEY}&limit=1`
    );

    const data = await res.json();

    console.log("coordinates res", res);
    console.log("coordinates data", data);

    if (!data.results || data.results.length === 0) {
      throw new Error("No coordinates found");
      
    }

    console.log("Geometry response : ",data.results[0].geometry);

    return NextResponse.json({
      lat: data.results[0].geometry.lat,
      lng: data.results[0].geometry.lng,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}