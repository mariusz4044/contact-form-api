# Contact Form API with Discord Integration

## Description

A backend API designed to handle contact form submissions. It includes:

* CAPTCHA generation and validation to prevent spam.
* Receiving contact messages (email and message content) via a POST request.
* User tracking middleware to gather information like IP address, browser, OS, device type, visit count, language, and referrer.
* Forwarding the submitted message along with detailed user tracking data to a specified Discord webhook.
* Session management using `express-session`.
* Basic rate limiting to prevent abuse.

## Tech Stack

* **Backend:** Node.js, Express, TypeScript.
* **Key Libraries:**
    * `express-session`: For handling user sessions.
    * `cors`: For enabling Cross-Origin Resource Sharing.
    * `dotenv`: For managing environment variables.
    * `express-rate-limit`: For applying rate limits to requests.
    * `svg-captcha` & `sharp`: For generating CAPTCHA images.
    * `ua-parser-js`: For parsing user agent strings.
    * `node-fetch`: For sending data to the Discord webhook.

## Setup & Configuration

### Backend (Server)

1.  Navigate to the main project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
   
3.  Create a `.env` file in the main directory with the following variables:
    ```dotenv
    PORT=3000 # Example port, adjust as needed
    EXPRESS_SESSION_SECRET=your_secret_key_here # Replace with a strong secret
    DISCORD_WEBHOOK=your_discord_webhook_url_here # Paste your Discord webhook URL
    ```
4.  Build the TypeScript project:
    ```bash
    npm run build
    ```
   
5.  Start the server:
    ```bash
    npm run start
    ```
   
    Alternatively, after building, you can run:
    ```bash
    node build/app.js
    ```
    The server should be running on the port defined in your `.env` file (e.g., `http://localhost:3000`).

## API Endpoints

### CAPTCHA Generation

<details>
<summary>`GET /captcha` - Retrieve a CAPTCHA image</summary>

**Description:** Generates a new CAPTCHA image (as a PNG) and stores the corresponding answer text in the user's session.

**Response:**
* **Content-Type:** `text/html` (containing an `<img>` tag with base64 PNG data).
* **Example:** `<img src="data:image/png;base64,..." alt="captcha-image" />`
</details>

### Form Submission

<details>
<summary>`POST /form` - Submit the contact form</summary>

**Description:** Receives the contact form data, validates the CAPTCHA answer against the value stored in the session, and forwards the message along with user tracking details to the configured Discord webhook. The CAPTCHA answer is cleared from the session after attempting submission.

**Request Body:**
```json
{
  "email": "String", // User's email address (Note: currently not explicitly used in the webhook message format)
  "message": "String", // The user's message content
  "captcha": "String" // The user's answer to the CAPTCHA
}
```


**Response Body (Success):**
```text
Successfully sent message!
```


**Response Body (Error):**
* `400 Bad Request` - "Wrong captcha!" (if CAPTCHA fails).
* `400 Bad Request` - "Please enter a message!" (if message is missing or too short).
* `400 Bad Request` - "Please reload the page!" (if no CAPTCHA answer exists in the session).
* `400 Bad Request` - "Invalid JSON format" (if the request body is malformed).
* `429 Too Many Requests` - "Slow down!" (if rate limit is exceeded).
</details>

## Additional Information

* The application uses `express-session` for managing user sessions and storing CAPTCHA answers and user tracking data temporarily.
* User agent details (browser, OS, device) and other tracking information (IP, visits, language, referrer) are collected via middleware for context.
* Rate limiting is implemented using `express-rate-limit` to control request frequency.
* Sensitive information like the session secret and Discord webhook URL are managed via a `.env` file.
* The API relies on external communication via a Discord webhook to deliver the messages.
