from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

@app.route("/api/survey", methods=["POST"])
def survey():
    name = request.form.get("name")
    email = request.form.get("email")
    age = request.form.get("age")

    # Compose email
    msg = MIMEMultipart()
    msg["From"] = os.environ.get("GMAIL_USER")
    msg["To"] = os.environ.get("TO_EMAIL")
    msg["Subject"] = "New Survey Response"

    body = f"Name: {name}\nEmail: {email}\nAge: {age}"
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(os.environ.get("GMAIL_USER"), os.environ.get("GMAIL_PASS"))
        server.sendmail(msg["From"], msg["To"], msg.as_string())
        server.quit()
        return jsonify({"success": True, "message": "Survey submitted successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
