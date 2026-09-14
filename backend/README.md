# FENIX26 Symposium Backend

Complete Node.js + Express backend for the FENIX26 Symposium registration system.

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Installation](#2-installation)
3. [MongoDB Setup](#3-mongodb-setup)
4. [Google Cloud Setup](#4-google-cloud-setup)
5. [Environment Variables](#5-environment-variables)
6. [Starting the Server](#6-starting-the-server)
7. [API Documentation](#7-api-documentation)
8. [React Integration](#8-react-integration)
9. [Payment QR Configuration](#9-payment-qr-configuration)
10. [Admin Authentication](#10-admin-authentication)
11. [Deployment](#11-deployment)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **MongoDB** v6.0 or later (local or Atlas)
- A **Google Cloud** project with Sheets and Drive APIs enabled
- An **SMTP** email service (Gmail with App Passwords, or any SMTP provider)

## 2. Installation

```bash
cd backend

npm install
```

This installs all dependencies:
- `express` — Web server framework
- `mongoose` — MongoDB ODM
- `cors` — Cross-Origin Resource Sharing
- `helmet` — Security HTTP headers
- `express-rate-limit` — Rate limiting
- `bcryptjs` — Password hashing
- `jsonwebtoken` — JWT authentication
- `multer` — File uploads
- `nodemailer` — Email sending
- `qrcode` — QR code generation
- `winston` — Logging
- `googleapis` — Google Sheets & Drive APIs
- `express-validator` — Request validation
- `dotenv` — Environment variables
- `xss-clean` — XSS sanitization

## 3. MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service:
   ```bash
   mongod --dbpath ./data/db
   ```
3. Create a database:
   ```bash
   mongo
   > use fenix26
   ```

### Option B: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free-tier cluster
3. Create a database user
4. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fenix26
   ```

## 4. Google Cloud Setup

### 4.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Name it `fenix-26-backend`
4. Wait for creation

### 4.2 Enable Google Sheets API

1. In Cloud Console, go to **APIs & Services** → **Library**
2. Search for **Google Sheets API**
3. Click **Enable**

### 4.3 Enable Google Sheets API

1. In **APIs & Services** → **Library**
2. Search for **Google Sheets API**
3. Click **Enable**

### 4.4 Create a Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name: `fenix-26-service-account`
4. Grant **Project** → **Editor** role
5. Click **Done**
6. Click on the created service account → **Keys** → **Add Key** → **Create new key**
7. Select **JSON** → **Create**
8. Download the JSON file — this contains your credentials

### 4.5 Configure Google Sheet

1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Name it `FENIX26 Registrations`
3. In the first row, add these headers:
   ```
   Registration ID | Registration Date | Team Name | Team Leader | Email | Phone | College | Department | Year | Participants | Selected Events | Selected Workshops | Total Amount | Payment Status | Transaction ID | Payment Screenshot | Registration Status | Verified At | Verified By
   ```
4. Share the sheet with your service account email (found in the JSON credentials file)

### 4.6 Configure Cloudinary (Payment Screenshot Storage)

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. After signing up, note your **Cloud Name**, **API Key**, and **API Secret** from the dashboard
3. These credentials are used only for uploading payment screenshots — they are kept server-side in `.env`

### 4.7 Get Credentials

From the downloaded service account JSON file, note:
- `client_email` — Your service account email
- `private_key` — Your private key (includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- `project_id` — Your project ID

## 5. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/fenix26

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# Admin
ADMIN_EMAIL=admin@fenix26.in
ADMIN_PASSWORD=change-this-to-a-secure-password

# SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
EMAIL_FROM=FENIX26 <your-email@gmail.com>

# Google Sheets (paste values from service account JSON) - KEEP
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID=your-google-sheet-id

# Cloudinary (payment screenshot storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# UPI
UPI_ID=fenix26@upi
UPI_NAME=FENIX26

# JWT
JWT_SECRET=change-this-to-a-super-secret-key

# Workshop Rules (optional, configurable)
WORKSHOP_RULES=
```

### Getting Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select **Mail** and **Other** → Name it `FENIX26 Backend`
5. Copy the 16-character password → Paste as `SMTP_PASSWORD`

### Important

- **Never commit `.env`** — it's already in `.gitignore`
- Use `.env.example` as a template
- Use `\\n` for line breaks in `GOOGLE_PRIVATE_KEY` when setting in `.env`

## 6. Starting the Server

### Development

```bash
cd backend
cp .env.example .env    # Copy env template, then edit .env
npm install              # Install dependencies (first time)
npm run dev              # Start with auto-reload
```

The server runs on `http://localhost:5000`

### Production

```bash
npm run start
```

### Verify

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "status": "healthy"
}
```

## 7. API Documentation

All responses follow a consistent format:

**Success:**

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

**Error:**

```json
{
  "success": false,
  "message": "Error message",
  "code": "ERROR_CODE"
}
```

---

### POST /api/registrations — Create Registration

**Description:** Creates a new registration, calculates amount server-side, generates QR code, stores in MongoDB and Google Sheets.

**Request Body:**

```json
{
  "teamName": "Example Team",
  "teamLeader": "John Doe",
  "email": "team@example.com",
  "phone": "9876543210",
  "college": "Example College",
  "department": "CSE",
  "year": 3,
  "registrationType": "Individual",
  "selectedEvents": ["paper-presentation", "ai-battle"],
  "workshops": [],
  "participants": [
    { "name": "John Doe", "email": "john@example.com", "phone": "9876543210", "year": 3 }
  ],
  "foodPreference": "Vegetarian"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| teamName | string | Yes | Name of the team |
| teamLeader | string | Yes | Team leader's full name |
| email | string | Yes | Valid email address |
| phone | string | Yes | 10-digit Indian phone number |
| college | string | Yes | College name |
| department | string | Yes | Department name |
| year | number | Yes | Academic year (1-5) |
| registrationType | string | Yes | `Individual` or `Team` |
| selectedEvents | string[] | Yes | Array of event slugs |
| workshops | string[] | No | Array of workshop slugs |
| participants | object[] | No | Required for Team type |
| foodPreference | string | No | `Vegetarian` or `Non-vegetarian` |

**Response (201):**

```json
{
  "success": true,
  "data": {
    "registrationId": "F26-2026-000001",
    "totalAmount": 250,
    "payment": {
      "status": "pending",
      "qrCode": "data:image/png;base64,...",
      "upiPayload": "upi://pay?pa=fenix26@upi&pn=FENIX26&am=250.00&cu=INR"
    }
  },
  "message": "Registration created successfully"
}
```

---

### GET /api/registrations/:registrationId — Get Registration

**Description:** Retrieves a registration by its ID.

**Path Parameters:**

| Parameter | Type | Description |
|---|---|---|
| registrationId | string | The registration ID (e.g., F26-2026-000001) |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "registrationId": "F26-2026-000001",
    "teamName": "Example Team",
    "email": "team@example.com",
    "payment": {
      "status": "pending",
      "amount": 250,
      "qrPayload": "upi://pay?..."
    },
    "registrationStatus": "pending"
  },
  "message": "Registration retrieved successfully"
}
```

**Error (404):**

```json
{
  "success": false,
  "message": "Registration not found",
  "code": "REGISTRATION_NOT_FOUND"
}
```

---

### POST /api/registrations/:registrationId/payment-screenshot — Upload Payment Screenshot

**Description:** Uploads a payment screenshot image. Stores image in Cloudinary and saves reference in MongoDB. Updates payment status to `PENDING_VERIFICATION`. Sends an email notification to the admin.

**Content-Type:** `multipart/form-data`

**Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| screenshot | file | Yes | Image file (JPEG, PNG, GIF, WebP, BMP, max 10MB) |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "registrationId": "F26-2026-000001",
    "paymentStatus": "PENDING_VERIFICATION",
    "registrationStatus": "payment_submitted"
  },
  "message": "Payment screenshot uploaded successfully. Verification is pending."
}
```

**Error (400):**

```json
{
  "success": false,
  "message": "No screenshot file uploaded",
  "code": "NO_FILE"
}
```

---

### PATCH /api/admin/registrations/:registrationId/verify-payment — Verify Payment

**Authentication:** Required (Bearer JWT token)

**Description:** Admin verifies payment. Sets `payment.status = verified` and `registrationStatus = confirmed`.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Body:**

```json
{
  "verifiedBy": "Admin Name"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "registrationId": "F26-2026-000001",
    "paymentStatus": "verified",
    "registrationStatus": "confirmed"
  },
  "message": "Payment verified"
}
```

---

### PATCH /api/admin/registrations/:registrationId/reject-payment — Reject Payment

**Authentication:** Required (Bearer JWT token)

**Description:** Admin rejects payment. Sets `payment.status = rejected` and `registrationStatus = rejected`.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Body:**

```json
{
  "rejectionReason": "Payment not received"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "registrationId": "F26-2026-000001",
    "paymentStatus": "rejected",
    "registrationStatus": "rejected"
  },
  "message": "Payment rejected"
}
```

---

### POST /api/admin/login — Admin Login

**Description:** Authenticates admin and returns JWT token.

**Request Body:**

```json
{
  "email": "admin@fenix26.in",
  "password": "your-password"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "admin": {
      "id": "64f...",
      "email": "admin@fenix26.in",
      "name": "FENIX26 Admin"
    }
  },
  "message": "Login successful"
}
```

---

### GET /api/admin/registrations — List All Registrations

**Authentication:** Required (Bearer JWT token)

**Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| status | string | all | Filter by registration status |
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "registrations": [...],
    "pagination": { "page": 1, "limit": 20, "total": 150 }
  },
  "message": "Registrations retrieved successfully"
}
```

---

### GET /api/admin/registrations/:registrationId — Get Registration Details

**Authentication:** Required (Bearer JWT token)

**Description:** Admin retrieves full registration details including payment info.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "registrationId": "F26-2026-000001",
    "payment": {
      "status": "verified",
      "screenshotUrl": "https://drive.google.com/...",
      "verifiedAt": "2026-09-15T10:30:00Z",
      "verifiedBy": "Admin Name"
    }
  }
}
```

---

## 8. React Integration

Your React frontend (in `frontend-new/`) should communicate with this backend using `fetch` or `axios`. Here's how each step maps:

### Step 1: Submit Registration

In your `RegisterPage.jsx`, replace the "Continue" button handler:

```jsx
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// In your step 1 validation success:
const handleRegister = async () => {
  try {
    const response = await axios.post(`${API_URL}/registrations`, {
      teamName,
      teamLeader,
      email,
      phone,
      college,
      department,
      year,
      registrationType,
      selectedEvents: selected,
      foodPreference,
      participants: teamMembers.filter(m => m.name).map(m => ({
        name: m.name,
        email: '',
        phone: '',
        year: 3,
      })),
    });

    const { registrationId, totalAmount, payment } = response.data.data;
    
    // Store in state for Step 3 display
    setRegistrationData({ registrationId, totalAmount, qrCode: payment.qrCode });
    setStep(3);
  } catch (err) {
    console.error('Registration failed:', err.response?.data?.message || err.message);
  }
};
```

### Step 2: Display QR Code in Step 3

```jsx
{registrationData?.qrCode && (
  <div className="qr-display">
    <img src={registrationData.qrCode} alt="Payment QR Code" />
    <p>Pay ₹{registrationData.totalAmount}</p>
    <p>Registration ID: {registrationData.registrationId}</p>
  </div>
)}
```

### Step 3: Upload Payment Screenshot

```jsx
const handleScreenshotUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('screenshot', file);
    
    const response = await axios.post(
      `${API_URL}/registrations/${registrationData.registrationId}/payment-screenshot`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    alert('Screenshot uploaded successfully!');
  } catch (err) {
    console.error('Upload failed:', err.response?.data?.message || err.message);
  }
};
```

### Step 4: Check Registration Status

```jsx
const checkStatus = async () => {
  const response = await axios.get(
    `${API_URL}/registrations/${registrationData.registrationId}`
  );
  const status = response.data.data;
  console.log('Payment Status:', status.payment.status);
  console.log('Registration Status:', status.registrationStatus);
};
```

---

## 9. Payment QR Configuration

The QR code is generated automatically with the server-calculated amount. The format is:

```
upi://pay?pa=<UPI_ID>&pn=FENIX26&am=<CALCULATED_AMOUNT>&cu=INR
```

To change the UPI ID, edit `.env`:

```env
UPI_ID=your-upi-id@upi
UPI_NAME=Your Event Name
```

**Important:** The QR amount is for display only. Uploading a screenshot does NOT prove payment. Admin must verify payment manually (or via webhook integration later).

---

## 10. Admin Authentication

1. Start the server with admin credentials in `.env`:
   ```env
   ADMIN_EMAIL=admin@fenix26.in
   ADMIN_PASSWORD=secure-password
   ```

2. The server auto-creates the admin on startup (first run only)

3. Login:
   ```bash
   curl -X POST http://localhost:5000/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@fenix26.in","password":"secure-password"}'
   ```

4. Use the returned token for admin endpoints:
   ```bash
   curl http://localhost:5000/api/admin/registrations \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
   ```

### Password Security

- Passwords are hashed with bcrypt (12 rounds) before storage
- JWT tokens expire in 24 hours
- Admin passwords are never returned in API responses
- The JWT secret should be a long, random string

---

## 11. Deployment

### Environment Variables for Production

Set all environment variables in your hosting platform:

- `NODE_ENV=production`
- `MONGODB_URI` — Your production MongoDB connection string
- All other variables from `.env.example`

### Building and Running

```bash
cd backend
npm install --production
npm run start
```

### Process Manager (Recommended)

Use PM2 for production:

```bash
npm install -g pm2
pm2 start src/server.js --name fenix-backend
pm2 save
pm2 startup
```

### Reverse Proxy (Nginx example)

```nginx
server {
    listen 80;
    server_name api.fenix26.in;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Graceful Shutdown

The server handles `SIGTERM` and `SIGINT` signals for graceful shutdown:
1. Stops accepting new connections
2. Closes MongoDB connection
3. Exits cleanly

---

## 12. Troubleshooting

### MongoDB Connection Error

```
MongoDB connection error: ...
```

- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For Atlas: Whitelist your IP address in Atlas network access

### Google Sheets Error

```
Google Sheets initialization skipped: ...
```

- Verify `GOOGLE_SHEET_ID` is correct
- Check service account has access to the sheet
- Ensure Sheets API is enabled in Cloud Console

### Email Sending Fails

```
Failed to send confirmation email: ...
```

- Verify SMTP credentials in `.env`
- For Gmail: Use App Password, not regular password
- Check `EMAIL_FROM` format: `Name <email@domain.com>`

### CORS Error

- Verify `CLIENT_URL` matches your frontend origin
- If deploying frontend to a different domain, update `CLIENT_URL`

### File Upload Error

```
File too large. Maximum size is 10MB.
```

- Resize the image before uploading
- Supported formats: JPEG, PNG, GIF, WebP, BMP

### Registration ID Not Generated

Ensure `generateRegistrationId` utility is called properly — it auto-generates during `Registration.save()` via Mongoose pre-save hook.

---

## Project Structure

```
backend/
│
├── src/
│   ├── config/          → Database, Google API, Email configs
│   ├── controllers/     → Route handlers
│   ├── models/          → Mongoose schemas
│   ├── routes/          → Express routers
│   ├── services/        → Business logic
│   ├── middleware/       → Auth, upload, validation, error handling
│   ├── utils/           → Utilities (ID generator, logger)
│   ├── app.js           → Express app setup
│   └── server.js        → Server startup
│
├── tests/               → Test files
├── uploads/             → Local file uploads (fallback)
├── .env                 → Environment variables (not committed)
├── .env.example         → Template
├── .gitignore           → Ignored files
├── package.json
└── README.md
```
