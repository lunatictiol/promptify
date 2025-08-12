import { Link } from "react-router";
import LandingPage from '../assets/landing.png'
export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100">
      {/* Hero Section */}
      <main className="flex flex-col-reverse lg:flex-row items-center justify-center flex-1 px-6 lg:px-20">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Your <span className="text-indigo-600">AI-powered</span> productivity companion
          </h2>
          <p className="text-lg text-gray-600">
            Supercharge your workflow with AI. Generate, optimize, and execute your ideas effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
           {/* <Link>
            <span className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              Get Started
            </span>
            </Link> */}
            <Link to={"/learnmore"}>
            <span className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
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
            className="w-full max-w-md"
          />
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 lg:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Our AI Tools</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Tagline Generator", desc: "Get AI-powered taglines instantly.", icon: "💡" },
            { title: "Article Generator", desc: "Generate high-quality articles in seconds.", icon: "⚡" },
            { title: "Resume Reviewer", desc: "Get instant, AI-driven feedback on your resume.", icon: "🔗" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
