import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

const bioData = `
Name: Hardik Varshney
Email: hardikvarshney5@gmail.com
Contact: 7668850124

College: GL Bajaj Institute of Management and Technology
Program: B.Tech in Computer Science (Artificial Intelligence & Machine Learning)
Year: 2nd Year (as of 2025)
Club Involvement: Member of Abhyudaya Club (PR team, CSAIML Branch)

Academic Achievements:
- Scored 90% in Class 10th (CBSE)
- Scored 86% in Class 12th (PCM, CBSE)
- Secured 90+ percentile in JEE Mains

Mini Project:
Title: Gesture-Controlled Cursor System
Description: Developed a Python-based software project that enables real-time computer cursor control using wrist gestures, ideal for wearable tech applications.
Key Features:
- Real-time cursor movement using ADXL345 sensor data
- Smooth X-Y axis tracking with minimal latency
- Replaces traditional input devices like the mouse
- Designed with future scope for gesture-based virtual keyboard typing

Tech Stack:
- Hardware: ADXL345, Arduino Uno/Nano
- Languages: Python, C/C++
- Tools: Arduino IDE, Visual Studio Code
- Python Libraries: pyserial, pyautogui, pynput, opencv-python (optional), matplotlib (optional)

Technical Skills:
- Programming: Python, C++, C
- Tools/IDEs: Arduino IDE, VS Code
- Concepts: Embedded Systems, Human-Computer Interaction, Real-time Systems
- Interests: AI, Machine Learning, Wearable Tech, Innovative Software Solutions

What I Like:
- Building intelligent systems that interact with humans naturally
- Exploring how hardware and software can work together to solve real-world problems
- Learning new tech tools and applying them in creative ways
- Participating in technical clubs and collaborative projects

Future Goals:
- To work on cutting-edge projects in AI & embedded tech
- Build smart, intuitive software that enhances user experience
- Contribute to open-source and tech communities
- Create impactful solutions through interdisciplinary innovation

Quote:
"I'm passionate about blending hardware and software to build real-world tech that feels intuitive and futuristic."
`;

const QAPairs = [
  {
    q: ["name", "who are you", "your name", "tell me about yourself", "introduce yourself", "tell me about hardik", "who is hardik", "about hardik", "about you"],
    a: "My name is Hardik Varshney. I'm a B.Tech student specializing in AI and ML at GL Bajaj Institute of Management and Technology. I'm passionate about building intelligent systems that combine hardware and software to solve real-world problems. I've worked on projects like a gesture-controlled cursor system and have participated in various hackathons, including winning the IIIT Delhi National Hackathon."
  },
  {
    q: ["education", "studies", "academic", "college", "where do you study", "institute", "university", "school", "qualification"],
    a: "I'm currently pursuing B.Tech in Computer Science with a specialization in Artificial Intelligence and Machine Learning at GL Bajaj Institute of Management and Technology. I'm in my 2nd year. My academic journey includes scoring 90% in Class 10th, 86% in Class 12th (PCM), and securing 90+ percentile in JEE Mains."
  },
  {
    q: ["course", "program", "degree", "what do you study", "branch", "specialization"],
    a: "I'm pursuing B.Tech in Computer Science with a specialization in Artificial Intelligence and Machine Learning. This program combines core computer science concepts with advanced AI/ML technologies, preparing me for a career in cutting-edge technology development."
  },
  {
    q: ["year", "which year", "current year", "semester"],
    a: "I'm currently in my 2nd year of B.Tech. I'm actively involved in various projects and hackathons while maintaining my academic performance."
  },
  {
    q: ["achievements", "academic", "scores", "marks", "10th", "12th", "jee", "accomplishments", "awards"],
    a: "My academic achievements include scoring 90% in Class 10th, 86% in Class 12th (PCM), and securing 90+ percentile in JEE Mains. I've also won the IIIT Delhi National Hackathon and been a top 10 finalist in the GGSIPU Vespera Hackathon."
  },
  {
    q: ["contact", "email", "phone", "number", "reach", "connect", "how to contact", "contact details"],
    a: "You can reach me through my email at hardikvarshney5@gmail.com or call me at 7668850124. I'm also active on LinkedIn, GitHub, and other professional platforms."
  },
  {
    q: ["club", "abhyudaya", "community", "team", "branch", "extracurricular", "activities"],
    a: "I'm an active member of the Abhyudaya Club from the CSAIML Branch at GL Bajaj. I'm part of the PR team, where I help organize and promote tech events and workshops."
  },
  {
    q: ["projects", "project", "work", "gesture", "cursor", "mini project", "portfolio", "what have you built"],
    a: "I've worked on several projects, including: 1) A gesture-controlled cursor system using Python and ADXL345 sensor, 2) AI Scheme Recommender (winner at IIIT Delhi Hackathon), 3) SunShare - a solar community sharing platform, and 4) SpendWise - a student budgeting web app. Each project combines different technologies and focuses on solving real-world problems."
  },
  {
    q: ["gesture", "cursor project", "mini project details", "gesture control"],
    a: "I developed a gesture-controlled cursor system that allows users to control their computer cursor using wrist movements. It uses Python, C/C++, and the ADXL345 sensor. The system features real-time cursor movement, smooth X-Y tracking, and is designed for wearable integration. It also has future scope for gesture-based virtual keyboard typing."
  },
  {
    q: ["hackathon", "hackathons", "competitions", "wins", "prizes"],
    a: "I've participated in several hackathons: 1) Winner at IIIT Delhi National Hackathon for AI Scheme Recommender, 2) Top 10 Finalist at GGSIPU Vespera Hackathon for SunShare, 3) Built SpendWise at GFG Hackathon. These experiences have helped me develop practical problem-solving skills and work under pressure."
  },
  {
    q: ["skills", "technical skills", "programming", "languages", "tools", "technologies", "what do you know"],
    a: "My technical skills include: Programming Languages: Python, C++, C; Tools & IDEs: Arduino IDE, VS Code; Concepts: Embedded Systems, Human-Computer Interaction, Real-time Systems; Areas: AI, Machine Learning, Wearable Tech. I'm constantly learning and expanding my skill set."
  },
  {
    q: ["interests", "areas", "what interests you", "passion", "hobbies", "what do you like"],
    a: "I'm deeply interested in AI, Machine Learning, Embedded Systems, Human-Computer Interaction, and wearable technology. I enjoy building intelligent systems that interact with users naturally, combining software with hardware to solve real-world problems."
  },
  {
    q: ["future", "goals", "aim", "dream", "plans", "career", "aspirations"],
    a: "My future goals include working on innovative AI and embedded systems projects, contributing to open-source communities, and creating impactful, user-friendly tech solutions. I aim to make technology more accessible and intuitive for everyone."
  },
  {
    q: ["quote", "motto", "philosophy", "belief", "saying"],
    a: "I'm passionate about blending hardware and software to build real-world tech that feels intuitive and futuristic. I believe in creating technology that enhances human capabilities and makes a positive impact on society."
  }
];

function getAIAnswer(question: string) {
  const q = question.toLowerCase();

  // Handle compliments and positive feedback
  const compliments = [
    "good", "great", "awesome", "amazing", "excellent", "wonderful", "fantastic", "brilliant",
    "impressive", "nice", "cool", "perfect", "best", "outstanding", "incredible", "superb",
    "marvelous", "exceptional", "terrific", "fabulous", "splendid", "magnificent", "phenomenal",
    "beautiful", "lovely", "handsome", "smart", "intelligent", "talented", "skilled", "gifted",
    "genius", "pro", "expert", "master", "champion", "winner", "successful", "achiever"
  ];

  if (compliments.some(word => q.includes(word))) {
    return "Thank you for your kind words! I'm glad you think so. Is there anything specific you'd like to know about me?";
  }

  // Handle greetings
  const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"];
  if (greetings.some(word => q.includes(word))) {
    return "Hello! I'm here to tell you about Hardik. What would you like to know?";
  }

  // Handle thanks
  if (q.includes("thank") || q.includes("thanks")) {
    return "You're welcome! Feel free to ask if you have any other questions about Hardik.";
  }

  // Handle goodbyes
  const goodbyes = ["bye", "goodbye", "see you", "farewell"];
  if (goodbyes.some(word => q.includes(word))) {
    return "Goodbye! Feel free to come back if you have more questions about Hardik.";
  }

  // Handle general conversation
  const generalQuestions = [
    "how are you", "how's it going", "what's up", "how do you do",
    "what's new", "how's your day", "how's everything"
  ];
  if (generalQuestions.some(phrase => q.includes(phrase))) {
    return "I'm doing well, thank you for asking! I'm here to tell you about Hardik. What would you like to know about him?";
  }

  // Handle questions about the chatbot itself
  if (q.includes("who made you") || q.includes("who created you") || q.includes("what are you")) {
    return "I'm an AI chatbot created to tell you about Hardik Varshney. I can answer questions about his education, projects, skills, and more!";
  }

  // Regular Q&A matching
  for (const pair of QAPairs) {
    if (pair.q.some(keyword => q.includes(keyword))) {
      return pair.a;
    }
  }

  // Fallback response
  return "I'm not sure about that. You can ask me about Hardik's education, projects, skills, hackathons, or future goals!";
}

export default function AIBioChatBox() {
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setInput('');
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'ai', text: getAIAnswer(input) }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {!isExpanded && (
        <>
          {/* Tooltip message above the chatbox button */}
          <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center">
            <div className="mb-1 px-0 py-0 text-xs font-semibold font-[Quicksand, Nunito, Poppins, Arial, sans-serif] text-accent-color flex items-center gap-1 animate-wave">
              <span role="img" aria-label="wave" className="animate-waving-hand">👋</span> Any doubt?
            </div>
          </div>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent-color text-white rounded-full shadow-lg flex items-center justify-center text-2xl overflow-hidden"
            aria-label="Open AI Chat"
          >
            <img src="/ai-avatar.png" alt="AI Avatar" className="w-12 h-12 object-cover rounded-full" />
          </motion.button>
        </>
      )}
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white dark:bg-[#222] rounded-xl shadow-2xl border border-accent-color/30 dark:border-cyan-400/20 flex flex-col"
          >
            {/* Header with gradient background */}
            <div className="px-4 py-3 font-bold border-b border-accent-color/20 flex justify-between items-center bg-gradient-to-r from-accent-color to-blue-500 rounded-t-xl">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <img src="/ai-avatar.png" alt="AI Avatar" className="w-8 h-8 object-cover rounded-full" />
                </div>
                <span className="text-black dark:text-white">Ask About Hardik</span>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsExpanded(false);
                  setMessages([]); // Clear messages when closing
                }}
                className="w-8 h-8 rounded-full bg-white/80 border border-accent-color font-bold flex items-center justify-center z-[100] shadow-lg hover:bg-accent-color hover:text-white text-accent-color dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-color"
                aria-label="Close chat"
                style={{ position: 'relative' }}
              >
                ✕
              </motion.button>
            </div>

            {/* Messages area with gradient background */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-[#222]" style={{ maxHeight: 320 }}>
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-2 ${
                      msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.from === 'user' ? 'bg-accent-color' : 'bg-blue-500'
                    }`}>
                      {msg.from === 'user' ? <FaUser className="text-white text-xs" /> : <img src="/ai-avatar.png" alt="AI Avatar" className="w-6 h-6 object-cover rounded-full" />}
                    </div>
                    <div className={`text-sm rounded-lg px-3 py-2 max-w-[80%] ${
                      msg.from === 'user' 
                        ? 'bg-accent-color text-white' 
                        : 'bg-gray-100 dark:bg-[#333] text-gray-800 dark:text-gray-100'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <img src="/ai-avatar.png" alt="AI Avatar" className="w-6 h-6 object-cover rounded-full" />
                    </div>
                    <div className="bg-gray-100 dark:bg-[#333] text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2">
                      <span className="typing-indicator">...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            {/* Input area with gradient border */}
            <div className="flex border-t border-accent-color/20 bg-white dark:bg-[#222] rounded-b-xl">
              <input
                className="flex-1 px-3 py-2 rounded-bl-xl bg-transparent outline-none text-sm"
                placeholder="Ask me anything about Hardik..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-accent-color font-bold hover:bg-accent-color hover:text-white rounded-br-xl transition-colors"
                onClick={handleSend}
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 