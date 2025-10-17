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
- **Frontend:** React / Next.js, TailwindCSS, ShadCN UI  
- **Backend:** Node.js / Express  
- **Database:** MongoDB / PostgreSQL  
- **AI & NLP:** ClinicalBERT / BlueBERT / OpenAI API  
- **Cloud:** AWS / GCP  
- **APIs:** Google Maps (for doctor locator), Twilio (for emergency calls), Video SDK (for consultations)  

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

### Project Setup

```bash
# Clone repository
git clone https://github.com/adityash2006/Curifix-All-in-One-health-Management.git

Backend :
cd backend

# Install dependencies
npm install

# Create .env add these two fields
#   MONGODB_URI=mongodb://localhost:27017/curifix
#   GOOGLE_API_KEY=sample gemini api key

# Start development server
node server.js

Frontend :

cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

