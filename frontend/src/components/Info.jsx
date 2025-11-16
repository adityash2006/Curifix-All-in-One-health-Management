import { Link } from "react-router-dom";

export default function InfoPage() {
    const formsubmit=(event)=>{
      event.preventDefault();
      alert("Thank you for reaching out! We will get back to you soon.");
    }

  return (
    <div className="max-w-3xl bg-amber-400 mx-auto p-6 text-white">
              <Link to="/" className="text-3xl font-bold mb-6 text-left"><i class="fa-solid fa-arrow-left"></i></Link>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">About Curifix</h1>

      {/* Curifix AI Chatbot */}
      <section className="mb-10 bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-3">🤖 Curifix AI Chatbot</h2>
        <p className="text-gray-300 leading-relaxed">
          Curifix AI is an intelligent medical-assistance chatbot designed to help users
          understand their symptoms, interpret medical reports, and receive health guidance in 
          simple and understandable language. It uses advanced AI models to analyse user input 
          and provide personalized suggestions while clearly stating that it does not replace 
          professional medical advice.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-10 bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-3">⚙️ How It Works</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-2">
          <li>Users interact with the chatbot by typing symptoms or uploading medical reports.</li>
          <li>AI analyses the input and returns simplified explanations.</li>
          <li>The system provides general precautions, health tips, and dos/don'ts.</li>
          <li>All personal data is processed securely and never shared externally.</li>
          <li>Users can also store medical documents, set reminders, or connect to emergency features.</li>
        </ul>
      </section>

      {/* Privacy Policy */}
      <section className="mb-10 bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-3">🔒 Privacy Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          Curifix values your privacy and ensures that all your personal information is handled 
          securely. We do not share, sell, or misuse your medical data. All uploaded documents 
          and chat interactions are encrypted and stored safely.  
          <br /><br />
          Curifix is designed for informational purposes only and does not replace consultation 
          with a certified medical professional.
        </p>
      </section>

      {/* Contact Support */}
      <section className="mb-10 bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-3">📞 Contact Support</h2>

        <p className="text-gray-300 mb-4">
          If you have questions, issues, or suggestions, feel free to reach out to us.
        </p>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg "
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg "
              placeholder="Enter your email"
              required

            />
          </div>

          <div>
            <label className="block mb-1">Message</label>
            <textarea
              className="w-full p-3 rounded-lg h-28"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <button
            onClick={formsubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-lg font-semibold transition"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
