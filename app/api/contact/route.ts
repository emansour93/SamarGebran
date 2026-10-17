import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }

    const smtpUser = process.env.SMTP_GMAIL_USER;
    const smtpPass = process.env.SMTP_GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_EMAIL || "roudrig@gmail.com";

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            "Gmail SMTP is not configured yet. Add SMTP_GMAIL_USER and SMTP_GMAIL_APP_PASSWORD to your environment variables.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formattedMessage = message.replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: smtpUser,
      to,
      replyTo: email,
      subject: `New contact form message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1d1d1d;">
          <h2 style="margin-bottom: 12px;">New message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 18px; padding: 16px; background: #f5f5f5; border-radius: 10px;">
            ${formattedMessage}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message was sent successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
