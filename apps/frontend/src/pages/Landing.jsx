import { Link } from "react-router";
import LandingPage from "../assets/landing.png";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-8">
      {/* Hero Section */}
      <main className="flex flex-col-reverse lg:flex-row items-center justify-center flex-1 px-6 lg:px-20 text-white">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Your <span className="text-indigo-400">AI-powered</span> productivity companion
          </h2>
          <p className="text-lg text-gray-300">
            Supercharge your workflow with AI. Generate, optimize, and execute your ideas effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to={"/learnmore"}>
              <span className="px-6 py-3 border border-indigo-400 text-indigo-300 rounded-lg hover:bg-indigo-900/40 transition">
                Learn More
              </span>
            </Link>
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <div className="lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img
            src={LandingPage}
            alt="AI Productivity"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-6 lg:px-20 bg-black/30 backdrop-blur-xl rounded-2xl mt-12"
      >
        <h3 className="text-3xl font-bold text-center mb-12 text-white">Our AI Tools</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Tagline Generator", desc: "Get AI-powered taglines instantly.", icon: "💡" },
            { title: "Article Generator", desc: "Generate high-quality articles in seconds.", icon: "⚡" },
            { title: "Resume Reviewer", desc: "Get instant, AI-driven feedback on your resume.", icon: "🔗" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition border border-white/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
