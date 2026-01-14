import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Data directory for submissions
const DATA_DIR = process.env.DATA_DIR || "/tmp/avantiterraform-data";
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

interface QuoteSubmission {
  id: string;
  timestamp: string;
  serviceType: string;
  description: string;
  location: string;
  timeline: string;
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  contactMethod: string;
  wantsWaterproofingGuide: boolean;
  wantsSlopeGuide: boolean;
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function getSubmissions(): Promise<QuoteSubmission[]> {
  await ensureDataDir();
  try {
    const data = await readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubmission(submission: QuoteSubmission) {
  const submissions = await getSubmissions();
  submissions.push(submission);
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

async function sendEmailNotification(submission: QuoteSubmission) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) {
    console.log("Email not configured, skipping notification");
    return;
  }

  // Use nodemailer if available, otherwise log
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587"),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: notifyEmail,
      subject: `New Quote Request: ${submission.serviceType}`,
      text: `
New quote request received:

Service Type: ${submission.serviceType}
Description: ${submission.description}

Project Details:
- Location: ${submission.location || "Not specified"}
- Timeline: ${submission.timeline || "Not specified"}
- Source: ${submission.source || "Not specified"}

Contact:
- Name: ${submission.name}
- Company: ${submission.company || "N/A"}
- Email: ${submission.email}
- Phone: ${submission.phone || "Not provided"}
- Preferred Contact: ${submission.contactMethod}

Guides Requested:
- Waterproofing Guide: ${submission.wantsWaterproofingGuide ? "Yes" : "No"}
- Slope Construction Guide: ${submission.wantsSlopeGuide ? "Yes" : "No"}

Submitted at: ${submission.timestamp}
      `.trim(),
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const submission: QuoteSubmission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      serviceType: body.serviceType || "",
      description: body.description || "",
      location: body.location || "",
      timeline: body.timeline || "",
      source: body.source || "",
      name: body.name || "",
      company: body.company || "",
      email: body.email || "",
      phone: body.phone || "",
      contactMethod: body.contactMethod || "email",
      wantsWaterproofingGuide: body.wantsWaterproofingGuide || false,
      wantsSlopeGuide: body.wantsSlopeGuide || false,
    };

    // Validate required fields
    if (!submission.name || !submission.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Save submission
    await saveSubmission(submission);

    // Send email notification (async, don't wait)
    sendEmailNotification(submission).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Error processing quote submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
