# 🛡️ Express Auth & Wallet API

A secure and scalable **JWT-based authentication & token portfolio backend**, built with **Express.js**, following clean architecture principles and security best practices. Designed for **Web2-Web3 bridge projects** where authenticated users manage crypto wallets across multiple blockchains.

---

## 🚀 Features

### 🔐 Authentication
- ✅ JWT-based Login, Registration
- 🔁 Access & Refresh Token support
- 🛑 Role-based Access Control (`user`, `admin`)

### 🧾 Wallet Management
- ➕ Add wallet(s) to user profile
- 🔍 Paginated, filtered, and searchable wallet listing
- ❌ Delete user wallets
- 🧑‍💼 Admin-only route to manage all wallets
- 🌐 Blockchain enum-based validation

### 🛡️ Security
- 🧱 `Helmet` for secure HTTP headers
- ❗ Rate limiting (5 requests per 5 mins)
- 🧼 XSS & MongoDB injection protection (`xss-clean`, `express-mongo-sanitize`)
- 🔒 Password hashing with `bcryptjs`

### ⚙️ Developer Features
- 📁 Modular file structure (routes, controllers, services, models, constants)
- 🧪 Test routes for user/admin protected access
- 🧠 Logging with `chalk` for debugging
- 🧮 Aggregation vs Populate performance benchmarking
- 🐳 Dockerized for deployment

---

## 🧰 Tech Stack

| Layer         | Tech                           |
|--------------|--------------------------------|
| Backend      | Node.js, Express.js            |
| Auth         | JWT (access + refresh tokens)  |
| Database     | MongoDB (via Mongoose)         |
| Security     | Helmet, Rate Limiting, XSS-Clean, Mongo-Sanitize |
| Logging      | Custom `chalk`-based logger    |
| Deployment   | Docker (with `.env` support)   |

---

## 📁 Folder Structure

src/
│
├── config/ # DB, logger, constants
├── routes/ # Express routes
├── controllers/ # Request handlers
├── services/ # Business logic
├── models/ # Mongoose schemas
├── middlewares/ # Auth, error handling, validation, etc.
├── constants/ # Enums like blockchain list
├── test/ # Test routes (admin/user)
└── app.js # Main Express app

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
```
## 🐳 Run with Docker

1. **Build the Image**
```
docker build -t express-auth-app .

```
2. **Run the Container**
```
  docker run -d \
  --name express-auth-container \
  -p 5000:5000 \
  --env-file .env \
  express-auth-app

```

## 👨‍💻 Author
```
Ahsan Farooq – Backend Intern @ Kaizen Global
Feel free to contribute or suggest improvements!
```
