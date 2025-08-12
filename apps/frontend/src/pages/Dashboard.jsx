// src/pages/Dashboard.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { LightbulbIcon, FileTextIcon, BookOpenIcon } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const cards = [
  {
    id: "tagline",
    title: "Tagline Generator",
    description: "Generate catchy, creative taglines instantly.",
    icon: <LightbulbIcon className="w-12 h-12 text-yellow-300 drop-shadow-lg" />,
    color: "from-yellow-500/20 to-yellow-300/10",
    border: "border-yellow-400/30"
  },
  {
    id: "resume",
    title: "Resume Review",
    description: "Get AI-powered feedback on your resume.",
    icon: <FileTextIcon className="w-12 h-12 text-blue-300 drop-shadow-lg" />,
    color: "from-blue-500/20 to-blue-300/10",
    border: "border-blue-400/30"
  },
  {
    id: "article",
    title: "Article Writer",
    description: "Create engaging articles with AI assistance.",
    icon: <BookOpenIcon className="w-12 h-12 text-green-300 drop-shadow-lg" />,
    color: "from-green-500/20 to-green-300/10",
    border: "border-green-400/30"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center p-8">
      <motion.h1
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        AI Tools Dashboard
      </motion.h1>
       <DotLottieReact
      src="https://lottie.host/b7558977-fce0-4604-9249-225c26e02645/jUh19Ljh0P.lottie"
      loop
      autoplay
      style={{width:800,height:400}}
    />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`p-8 rounded-3xl bg-gradient-to-br ${card.color} ${card.border} border shadow-xl cursor-pointer backdrop-blur-lg`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{
              y: -8,
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255,255,255,0.3)"
            }}
            onClick={() => navigate(`/${card.id}`)}
          >
            <div className="flex flex-col items-center text-center text-white space-y-4">
              {card.icon}
              <h2 className="text-2xl font-semibold">{card.title}</h2>
              <p className="mt-1 text-sm text-gray-300">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
