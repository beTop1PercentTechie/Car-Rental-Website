















import React, {useState} from 'react'
import { FaComments, FaTimes } from 'react-icons/fa'
import { GoogleGenerativeAI } from '@google/generative-ai';




function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);


  const apiKey = newKey;
  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const systemPrompt = `You are a helpful car rental assistant. Here are the specific questions and answers you should provide:

    1. For questions about car models and prices:
       - Economy Car (Honda Amaze): ₹2000/day
       - Sedan (Honda City): ₹2500/day
       - SUV (Toyota Fortuner): ₹4000/day
       - Luxury (Mercedes C-Class): ₹6000/day
  
    2. For rental process questions:
       - Required Documents: Valid Driver's License, ID Proof, Address Proof
       - Booking Process: Online booking or visit nearest branch
       - Payment Options: Credit/Debit Cards, UPI, Cash
  
    3. For rental requirements:
       - Minimum age: 21 years
       - Minimum driving experience: 2 years
       - Security deposit: ₹5000 (refundable)
  
    4. For rental locations:
       - Main Branch: banglore
       - Airport Branch: banglore
       - Downtown Branch: Business District
  
    For any questions outside these topics, respond with:
    "For this specific inquiry, please contact our customer care at 1800-123-4567 or email us at support@carrentals.com"
  
    Keep responses concise and friendly. Format prices and important information in bold using **text**.`;


  return (
    <>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50"
        >
            {isOpen ? <FaTimes size={24} className="animate-spin-slow" /> : <FaComments size={24} className="animate-bounce" />}
        </button>


    </>
  )
}

export default Chatbot