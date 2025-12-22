# 🩺 CuriFix – AI-Powered Health Assistant  

## 🧠 Overview  
**CuriFix** is an all-in-one AI health platform that helps users understand and manage their health easily.  
It uses AI to analyze symptoms, give personalized advice, store medical reports, send medicine reminders, and connect users to doctors or emergency services.  

---

## 💭 Problem Statement  
Many people struggle to manage their health due to:  
- Lack of clear guidance for common illnesses  
- Scattered medical reports  
- Missed medicines and irregular follow-ups  
- Difficulty finding nearby doctors in emergencies  

**CuriFix** solves these problems by providing a **single smart platform** that connects users to essential healthcare services.  

---

## ⚙️ Features  
| Feature | Description |
|----------|-------------|
| 🤖 **AI Symptom Checker** | Get instant health advice by entering your symptoms. |
| 💡 **Do’s & Don’ts Guide** | Learn simple tips and precautions for your condition. |
| 📂 **Medical Report Storage** | Upload and manage all your medical reports safely in one place. |
| 📍 **Nearby Doctor Locator** | Find nearby doctors, clinics, or hospitals quickly. |
| 💊 **Medicine Reminders** | Get alerts for taking medicines on time. |
| 🚑 **Emergency Call Button** | One-tap emergency feature to contact the nearest ambulance. |
| 🎥 **Video Consultation** | Talk to certified doctors through online video calls. |
| 🌸 **Women’s Health Tracker** | Track periods and get health reminders. |
| 🧾 **Personal Health Profile** | Centralized profile for all user health data. |
| 🔐 **Secure Data System** | Ensures strong encryption and privacy protection. |

---

## 🧩 Tech Stack  
- **Frontend:** React 19, Vite, Tailwind CSS 4, Framer Motion, GSAP, Three.js  
- **Backend:** Node.js, Express 5, Socket.io  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** Clerk  
- **AI:** Google Gemini (via LangChain)  
- **File Storage:** Cloudinary, Multer  
- **Maps:** MapLibre GL  
- **Real-time:** Socket.io  

---

## 🔍 Workflow  
1. User enters symptoms → AI analyzes and provides suggestions.  
2. User stores reports and sets medicine reminders.  
3. Emergency button connects to ambulance or nearby hospital.  
4. Users can book and attend doctor consultations online.  
5. Health data is stored securely and used for personalized tips.  

---

## 🔒 Data Privacy  
- All reports and health data are **encrypted** before storage.  
- Users have full control over their medical data.  
- AI guidance includes a note: *“This is not a replacement for a doctor’s advice.”*  

---

## 🌱 Future Scope  
- AI can read and explain medical reports in simple language.  
- Personalized health, diet, and exercise plans.  
- Integration with smartwatches and health trackers.  
- Continuous AI improvement based on verified medical data.  

---

## 🌍 Impact  
- **Improved Access to Healthcare** – Quick guidance anytime, anywhere.  
- **Reduced Health Negligence** – Reminders help people follow healthy habits.  
- **Better Emergency Response** – One-tap ambulance feature can save lives.  
- **Support for Rural Areas** – Helps people with limited access to doctors.  
- **Organized Health Data** – All records in one safe, digital place.  

---

## ⚠️ Disclaimer  
CuriFix provides **AI-based health support**, not a professional diagnosis.  
Users are encouraged to consult certified doctors for expert medical advice.  


### 💬 Tagline  
*"CuriFix – AI that cares, not replaces."*

---

# 🚀 Curifix - Health Management Setup Guide

Follow these steps to clone, install, and run the **Curifix** project.

---

### 🧩 Step 1: Clone the Repository
Clone the repository from GitHub to your local machine.
```bash
git clone https://github.com/adityash2006/Curifix-All-in-One-health-Management.git
cd Curifix-All-in-One-health-Management
````

---

### ⚙️ Step 2: Install Dependencies for Backend

Navigate to the backend directory and install required dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and add these fields:

```env
MONGODB_URI=mongodb://localhost:27017/curifix
GOOGLE_API_KEY=your_gemini_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

### 🚀 Step 3: Start the Backend Server

Run the backend server locally.

```bash
npm run dev
```

The backend server will run on: `http://localhost:5000`

---

### 💻 Step 4: Install Dependencies for Frontend

Navigate to the frontend directory and install its dependencies.

```bash
cd ../frontend
npm install
```

---

### 🌐 Step 5: Start the Frontend App

Start the frontend application in development mode.

```bash
npm run dev
```

The frontend server will run on: `http://localhost:3000`

---

✅ **Now both the backend and frontend should be running successfully!**
You can open your browser and start using the app.

---

### ✨ Features

* Full-stack health management system
* User-friendly UI with modern animations (GSAP, Framer Motion)
* AI-powered health assistant using Google Gemini
* Real-time chat with Socket.io
* Secure authentication with Clerk
* Medical document storage with Cloudinary
* Interactive maps with MapLibre GL

---

### 🛠️ Contributing

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Make your changes
4. Commit your changes:

```bash
git commit -m "Description of changes"
```

5. Push to the branch:

```bash
git push origin feature-name
```

6. Open a Pull Request

---