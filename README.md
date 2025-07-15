# 🛡️ Express Auth App

A secure authentication API built with **Express.js**, supporting:

- ✅ User Registration & Login with JWT
- 🔄 Refresh Tokens
- 🔐 Role-based Access Control
- 🧼 Input Validation & Sanitization
- 🧱 Security Best Practices (Helmet, Rate Limiting)
- 📦 Modular Architecture

---

## 🚀 Features

- User registration & login with hashed passwords (`bcryptjs`)
- Access + Refresh token management using `jsonwebtoken`
- Role-based route protection (`admin`, `user`)
- Input validation with `express-validator`
- Input sanitization with `xss-clean` and `express-mongo-sanitize`
- Rate limiting and secure HTTP headers using `helmet`
- Centralized error handling
- Logging for each request (extendable)
- Scalable modular structure (services, controllers, routes, models)

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (access & refresh tokens)
- **Security**: Helmet, Rate Limiting, Mongo Sanitize, XSS Clean

---

## 📁 HOW TO RUN

---

## 📦 Installation

1. **Clone the repo**
```
git clone https://github.com/yourusername/express-auth-app.git
cd express-auth-app
npm install

```
2. **Create .env in root folder**
```
PORT=5000
MONGO_URI=your_mongo_connection_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

```
3. **Run the server**
```
npm run dev


