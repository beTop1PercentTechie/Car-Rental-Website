let newKey = "Your api key"















import React, {useState} from 'react'
import { FaComments, FaTimes, FaRobot, FaPaperPlane } from 'react-icons/fa'
import { GoogleGenerativeAI } from '@google/generative-ai';




function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
        sender: 'bot',
        text: 'blah blah'
    },
    {
        sender: 'user',
        text: 'blah blah blah'
    }
  ])
  const [input, setInput] = useState("")


  async function handleSend() {
    if(!input.trim()) return;

    const userMessage = {"text": input, "sender": 'user'}
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try{
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });

        const result = await model.generateContent({
            generationConfig,
            contents: [
                { role: 'user', parts: [{ text: systemPrompt + "\n\nUser: " + input }] }
            ]
        })

        if(!result.response) {
            throw new Error('No response recieved.')
        }

        const botMessage= { text: result.response.text(), sender: 'bot' }
        setMessages(prev => [...prev, botMessage])
    }

    catch(error) {
        setMessages(prev => [...prev, {
            text: "Sorry!!!, I'm facing some technical issues.",
            sender: 'bot'
        }])
    }
  }

  
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

        {
            isOpen && (
                <div className='fixed bottom-24 right-6 w-80 h-[500px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 '>
                    {/* Header of chatbot */}
                    <div className='bg-gradient-to-r from bg-indigo-400 to-purple-700 p-4 flex items-center gap-3'>
                        <FaRobot className='text-2xl text-white animate-pulse'/>
                        <div>
                            <h3 className='text-white font-bold'>Car Rental Assistant</h3>
                            <p className='text-indigo-200 text-xs'>Online | Ready to help</p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className='flex-1 p-4 overflow-y-auto'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-3 flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                            >
                                
                                {message.sender === 'bot' && (
                                    <div className='w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 flex justify-center items-center mr-2'>
                                        <FaRobot className='text-white text-xs'/>
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] p-3 ${
                                        message.sender == 'user'
                                            ? 'bg-gradient-to-r from-indigo-500 to bg-purple-400 text-white rounded-xl shadow-lg'
                                            : 'bg-white/80 text-gray-800 rounded-xl shadow-md ' 
                                    }`}
                                >
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Footer input and all */}
                    <div className='p-4 white/80 backdrop-blur-sm border-gray-100/20'>
                        <div className='flex gap-2'>
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Type your message...'
                                className='flex-1 p-3 bg-gray-50/50 border border-gray-200/50 rounded-lg text-sm focus:outline-none focus:ring-2' 
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer'
                                onClick={handleSend}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                    
                </div>
            )
        }
    </>
  )
}

export default Chatbot