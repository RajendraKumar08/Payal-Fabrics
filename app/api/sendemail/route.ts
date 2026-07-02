import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { to, subject = "Order Confirmed", message} = body;

  if (!to || typeof to !== "string") {
    return NextResponse.json({ message: "Recipient email is required." }, { status: 400 });
  }

  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailPassword) {
    return NextResponse.json({ message: "GMAIL_APP_PASSWORD is not configured." }, { status: 500 });


  }

  console.log("Sending email to:", to);
  console.log("Email subject:", subject);
  console.log("Email message:", message);
  

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "myphonestorage1rkdbp@gmail.com",
      pass: gmailPassword,
    },
  });
  const html = message;

  try {
    await transporter.sendMail({
      from: "myphonestorage1rkdbp@gmail.com",
      to,
      subject,
      html,
    });

    return NextResponse.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { message: "Failed to send email.", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
