from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

# Environment variables (configure on your server)
GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_PASS = os.environ.get("GMAIL_PASS")
TO_EMAIL = os.environ.get("TO_EMAIL", GMAIL_USER)


@app.route("/api/survey", methods=["POST"])
def handle_survey():
    # Read all incoming form fields (works with your GitHub form)
    data = request.form.to_dict()

    if not data:
        return jsonify({"success": False, "message": "No form data received"}), 400

    # Optionally require some basic fields if you want
    # For example: name, email
    # name = data.get("name")
    # email = data.get("email")
    # if not name or not email:
    #     return jsonify({"success": False, "message": "name and email required"}), 400

    # Build email body text from all fields
    lines = [f"{k}: {v}" for k, v in data.items()]
    body = "New survey form submission:\n\n" + "\n".join(lines)

    try:
        send_email("New survey response", body)
    except Exception as e:
        print("Error sending email:", e)
        return jsonify({"success": False, "message": "Failed to send email"}), 500

    return jsonify({"success": True, "message": "Survey submitted successfully"}), 200


def send_email(subject, body):
    if not GMAIL_USER or not GMAIL_PASS:
        raise RuntimeError("GMAIL_USER or GMAIL_PASS not set")

    msg = MIMEMultipart()
    msg["From"] = GMAIL_USER
    msg["To"] = TO_EMAIL
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(GMAIL_USER, GMAIL_PASS)
        server.send_message(msg)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
