# 🛕 Devaseva - Seva Booking Application (MERN Stack)

A full-stack seva booking application built using the MERN stack (MongoDB, Express, React, Node.js) with OTP-based user authentication, address autofill, order creation, and a simulated payment system.

---

## 📦 Tech Stack

- **Frontend**: React 18+ (with Vite), Redux, Axios, CSS Modules.
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Auth**: OTP-based verification via phone number
- **State Management**: Redux
- **Routing**: React Router
- **Deployment**: **Render** for Backend and **Netlify** for Frontend

---

## 🚀 Features

- User Sign Up & OTP Verification (via phone number)
- Auto-fetch user address using PIN code
- Add/remove seva items in the cart
- Checkout with address + payment form
- Order creation with order ID and payment ID
- Responsive and mobile-friendly layout
- Clean code with modular structure

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/devaseva-app.git
cd devaseva-app
```

### 2. Start the Backend

```bash
cd server
npm install
```

- Create .env in /server with the following:
  ```bash
  MONGO_URI=your-mongodb-uri
  ```
- Then run:

```bash
nodemon server
```

### 3. Start the Frontend

```bash
cd ../client
npm install
npm run dev
```

- App will be running at: http://localhost:5173

---

## 🔍 Known Limitations / Important Notes

- **🏠 Address Autofill (PIN Code):**

  - Currently, the address autofill is hardcoded to work only for 560001 PIN code. If you enter any other PIN, the system won't return any data.

    - 📌 This logic is implemented in the backend route:

    ```js
    if (pinCode === "560001") {
      return res.json({
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      });
    }
    ```

- **💳 Payment System is Simulated:**

  - There is no real payment gateway like Razorpay/Stripe yet. Payment ID and Order ID are generated randomly for demo purposes.

- **🔒 OTP is mocked:**
  - There's no SMS gateway integrated. OTP verification is simulated and may always accept a random 6 digit OTP inside `server terminal`.

---

## 🧪 Test Flow (Sample)

- Go to Home Page and add seva items to cart
- Proceed to Checkout
- Enter user details & mobile number
- Receive OTP (simulated for now — hardcoded or mocked)
- Enter OTP to verify
- Autofill address using PIN code
- Click Proceed to Payment
- Enter Card details / UPI I'd
- Click Pay Now → Order created
- Redirect to homepage with success message

## 👨‍💻 Author

Made with ❤️ by Suraj Singhal
