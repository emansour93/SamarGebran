import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const recentSubmissions = new Map<string, number[]>();
const spamKeywords = [
  "viagra",
  "casino",
  "bitcoin",
  "crypto",
  "lottery",
  "click here",
  "earn money",
  "free money",
  "work from home",
  "sex",
  "nude",
  "adult",
  "loan",
  "investment",
  "trading",
];

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown-client";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const previousRequests = recentSubmissions.get(ip) ?? [];
  const recentRequests = previousRequests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recentRequests.push(now);
  recentSubmissions.set(ip, recentRequests);
  return false;
}

function sanitizeText(value: unknown) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

function containsSpamPattern(value: string) {
  const lower = value.toLowerCase();

  if (/(https?:\/\/|www\.)/i.test(lower)) {
    return true;
  }

  const normalized = lower.replace(/[^a-z0-9\s]/g, " ");
  return spamKeywords.some((keyword) => normalized.includes(keyword));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, website } = body;
    const clientIp = getClientIp(request);

    if (website) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Too many submissions from this device. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    const cleanName = sanitizeText(name);
    const cleanEmail = sanitizeText(email).toLowerCase();
    const cleanPhone = sanitizeText(phone);
    const cleanSubject = sanitizeText(subject);
    const cleanMessage = sanitizeText(message);

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }

    if (cleanName.length < 2 || cleanName.length > 80) {
      return NextResponse.json(
        { error: "Please use a valid name between 2 and 80 characters." },
        { status: 400 },
      );
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 120) {
      return NextResponse.json(
        { error: "Subject must be between 3 and 120 characters." },
        { status: 400 },
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 2000 characters." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (cleanPhone && !/^[+()\d\s-]{7,20}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 },
      );
    }

    if (
      containsSpamPattern(cleanName) ||
      containsSpamPattern(cleanSubject) ||
      containsSpamPattern(cleanMessage)
    ) {
      return NextResponse.json(
        { error: "Your message looks suspicious and was blocked." },
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

    const formattedMessage = cleanMessage.replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: smtpUser,
      to,
      replyTo: cleanEmail,
      subject: `New contact form message: ${cleanSubject}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone || "Not provided"}\nSubject: ${cleanSubject}\n\n${cleanMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1d1d1d;">
          <h2 style="margin-bottom: 12px;">New message from ${cleanName}</h2>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Phone:</strong> ${cleanPhone || "Not provided"}</p>
          <p><strong>Subject:</strong> ${cleanSubject}</p>
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
