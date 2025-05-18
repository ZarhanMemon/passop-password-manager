# 🔐 Pass/Op – Secure Password Manager App

Pass/Op is a full-stack **Password Manager** built with the **MERN stack**. It allows users to securely **save, manage, and access** their passwords for various websites or accounts – all in one place. Think of it as your **personal digital vault**.

## ✅ Features

- 🔐 User Authentication (Signup, Login, Logout)
- 🔒 Save passwords securely with **bcrypt encryption**
- ✏️ Add, Edit, and Delete your stored credentials
- 🏷️ Label or categorize passwords
- 🔍 Search & filter through saved accounts
- 🌐 Responsive UI for desktop and mobile
- 🎨 Smooth animations using **DaisyUI**
- 🔐 Token-based session handling with **JWT**

## 🚀 Live Demo

🔗 [passop-manager.onrender.com](https://passop-manager.onrender.com)

## 📸 Preview

### 🖥️ Desktop View

<p align="center">
  <img src="https://github.com/user-attachments/assets/63ab19e3-3a62-41cc-b8ba-1c67309ee5d2" width="95%" />
  <img src="https://github.com/user-attachments/assets/2a6400e0-da67-42eb-a3d7-fdad2c514dd2" width="95%" />
  <img src="https://github.com/user-attachments/assets/20ce7192-e91c-4598-b276-6059ab048f43" width="95%" />
  <img src="https://github.com/user-attachments/assets/512a0306-5539-443e-9892-f0beb88502f9" width="95%" />
  <img src="https://github.com/user-attachments/assets/f6684a93-b352-44ab-82de-c6c7048c512f" width="350" />
</p>

---

### 📱 Mobile View

<!-- Small preview images in reversed order -->
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c23e93dd-3261-4b7e-b9f1-653295bb5ccf" width="130" /></td>
    <td><img src="https://github.com/user-attachments/assets/ffef2b66-e41e-4c79-9b08-b7503c4e148a" width="130" /></td>
    <td><img src="https://github.com/user-attachments/assets/bca872a6-da0f-48cd-89ab-5e57b155f0c2" width="130" /></td>
    <td><img src="https://github.com/user-attachments/assets/79bb2013-b9f0-4ee3-b1f5-ec847ade5a88" width="130" /></td>
  </tr>
</table>


## ⚙️ Tech Stack

| Layer      | Technology                            |
|------------|----------------------------------------|
| Frontend   | React, Zustand, Tailwind CSS, DaisyUI  |
| Backend    | Node.js, Express, MongoDB              |
| Auth       | JWT (JSON Web Tokens), bcrypt          |
| State Mgmt | Zustand                                 |
| Styling    | Tailwind CSS + DaisyUI                 |

## 📁 Folder Structure
```
passop/
├── frontend/ # Frontend (React)
│ ├── components/ # UI components (Navbar, Card, Modal, etc.)
│ ├── pages/ # Route-based pages (Home, Login, Dashboard)
│ ├── store/ # Zustand store for state management
│ ├── lib/ # Utility functions (API, validation)
│ └── App.jsx # Root React component
│
├── backend/ # Backend (Node.js/Express)
│ ├── controllers/ # Business logic (auth, password actions)
│ ├── routes/ # API route handlers
│ ├── middleware/ # Auth middleware (JWT verification)
│ ├── models/ # Mongoose schemas (User, Password)
│ └── index.js # Entry point for the backend server


```

## 🛠️ Getting Started Locally

1. **Clone the Repository**
```bash
git clone https://github.com/ZarhanMemon/passop-password-manager.git
cd passop-password-manager
```

2. ***Frontend Setup***
```bash
cd frontend
npm install
npm run dev
```

3. ***Backend Setup***
```bash
cd ../backend
npm install
node index.js
```

---

***🤝 Contributing***

  Pull requests are welcome. 
  For major changes, open an issue first to discuss what you'd like to change.

---

***📄 License***

  MIT License

---

Made with 💙 by @ZarhanMemon

