# Profile Page - MERN Stack Application

A full-stack user profile management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can register, login, and manage their profiles with image uploads.

## 🚀 Live Demo

- **Frontend**: [https://authprofilepage.netlify.app](https://authprofilepage.netlify.app)
- **Backend API**: [https://profile-page-a95r.onrender.com](https://profile-page-a95r.onrender.com)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT
- **Profile Management**: Edit name, email, age, DOB, contact, region, and bio
- **Image Upload**: Profile picture upload using Cloudinary
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Protected Routes**: Secure profile pages with authentication middleware
- **Smart Navigation**: New users directed to profile completion, existing users to home

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **React Router** - Navigation
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

### Backend
- **Node.js** & **Express.js**
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File uploads

## 📁 Project Structure

```
Profile Page/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppHeader.jsx
│   │   │   ├── HeaderContent.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── profile.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── model/
│   │   ├── user.model.js
│   │   └── profile.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── profile.route.js
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone Repository
```bash
git clone <repository-url>
cd "Profile Page"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=1h
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:3000
```

Start frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Create Web Service**:
   - Connect your GitHub repository
   - Select `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `node index.js`

3. **Environment Variables**:
   Add all variables from backend `.env` file in Render dashboard

4. **Deploy**: Render will auto-deploy on every push to main branch

### Frontend Deployment (Netlify)

1. **Create Netlify Account**: Sign up at [netlify.com](https://www.netlify.com)

2. **Deploy Site**:
   - Connect your GitHub repository
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

3. **Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `VITE_BACKEND_URL` = `https://your-render-backend-url.com`

4. **Deploy**: Netlify will auto-deploy on every push

### Alternative: Create `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_BACKEND_URL = "https://your-render-backend-url.com"
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Profile
- `GET /profile` - Get user profile (Protected)
- `PUT /profile` - Update profile (Protected)

## 🔐 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT |
| `JWT_EXPIRES` | JWT expiration time |
| `FRONTEND_URL` | Frontend URL for CORS |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend API URL |

## 🎨 Features Breakdown

### User Flow
1. **New User**: Register → Login → Complete Profile → Home
2. **Existing User**: Login → Home (or Edit Profile)

### Profile Features
- Editable name and email
- Age, date of birth, contact number
- Region/location
- Bio (max 1000 characters)
- Profile picture upload

### UI Components
- **AppHeader**: Navigation with user dropdown (Edit Profile, Logout)
- **HeaderContent**: Welcome message with user bio
- **ProtectedRoute**: Route guard for authenticated pages
- **Loading**: Loading spinner component

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes with middleware
- CORS configuration
- Input validation
- Secure file uploads

## 🐛 Troubleshooting

### Common Issues

**404 Error on API calls**:
- Verify `VITE_BACKEND_URL` is set correctly
- Check backend is running and accessible
- Ensure Render backend is not sleeping (free tier)

**Image upload fails**:
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper CORS settings

**Login redirects incorrectly**:
- Clear browser localStorage
- Check profile completion logic
- Verify JWT token validity

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 👨‍💻 Author

Created as a MERN stack learning project.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
