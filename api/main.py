"""
Contact form API for avantiterraform.com
Receives form submissions, saves to file, and sends email notification.
"""
import json
import os
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Avanti Terraform Contact API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://avantiterraform.com", "https://www.avantiterraform.com", "http://localhost:8080"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Data directory
DATA_DIR = Path("/var/www/avantiterraform/data")
DATA_DIR.mkdir(parents=True, exist_ok=True)


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str = ""
    message: str


class SubmissionResponse(BaseModel):
    success: bool
    message: str


def save_submission(data: ContactForm) -> dict:
    """Save submission to JSON file."""
    submission = {
        "timestamp": datetime.now().isoformat(),
        "name": data.name,
        "email": data.email,
        "subject": data.subject,
        "message": data.message,
    }

    submissions_file = DATA_DIR / "submissions.json"

    # Load existing submissions
    submissions = []
    if submissions_file.exists():
        try:
            submissions = json.loads(submissions_file.read_text())
        except json.JSONDecodeError:
            submissions = []

    submissions.append(submission)
    submissions_file.write_text(json.dumps(submissions, indent=2))

    return submission


def send_email_notification(data: ContactForm) -> bool:
    """Send email notification via Zoho SMTP."""
    smtp_host = os.getenv("SMTP_HOST", "smtp.zoho.in")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    notify_email = os.getenv("NOTIFY_EMAIL", "bharat@avantiterraform.com")

    if not smtp_user or not smtp_pass:
        print("SMTP credentials not configured, skipping email")
        return False

    try:
        msg = MIMEMultipart()
        msg["From"] = smtp_user
        msg["To"] = notify_email
        msg["Subject"] = f"New Contact: {data.subject or 'Website Inquiry'}"

        body = f"""
New contact form submission from avantiterraform.com

Name: {data.name}
Email: {data.email}
Subject: {data.subject or 'Not specified'}

Message:
{data.message}

---
Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """

        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False


@app.post("/api/contact", response_model=SubmissionResponse)
async def submit_contact(form: ContactForm):
    """Handle contact form submission."""
    try:
        # Save to file
        save_submission(form)

        # Send email notification
        email_sent = send_email_notification(form)

        return SubmissionResponse(
            success=True,
            message="Thank you! We'll get back to you soon."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}
