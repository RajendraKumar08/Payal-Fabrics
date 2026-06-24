import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const myPhone = process.env.WHATSAPP_PHONE;

    const formattedMessage = `
*New Contact Form Message*

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `;

    const whatsappURL = `https://wa.me/${myPhone}?text=${encodeURIComponent(
      formattedMessage
    )}`;

    return NextResponse.json({
      success: true,
      whatsappURL,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}