import taglineImage from '../assets/taglinegenerator.png'
import articleImage from '../assets/articlegenerator.png'
import resumeImage from '../assets/resumereviewer.png'

export default function LearnMore() {
  const tools = [
    {
      title: "Tagline Generator",
      desc: "Craft compelling, AI-powered taglines for your product, campaign, or brand. By analyzing your audience and tone, our AI delivers impactful taglines that resonate and grab attention instantly.",
      icon: "💡",
      image: taglineImage,
    },
    {
      title: "Article Generator",
      desc: "Create long-form, high-quality articles in seconds. Whether you need blog posts, marketing copy, or technical documentation, our AI generates content that's coherent, engaging, and SEO-friendly.",
      icon: "⚡",
      image: articleImage,
    },
    {
      title: "Resume Reviewer",
      desc: "Get AI-powered insights to improve your resume instantly. We analyze it against job descriptions, highlighting strengths, pinpointing weaknesses, and suggesting actionable improvements to help you stand out.",
      icon: "🔗",
      image: resumeImage,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 py-16 px-6 lg:px-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6">
        Learn More About <span className="text-indigo-600">Promptify</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-16">
        Here’s a closer look at the AI tools that make Promptify your ultimate productivity companion.
      </p>

      <div className="space-y-24">
        {tools.map((tool, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-10 ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:w-1/2 flex justify-center">
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
              <div className="text-5xl">{tool.icon}</div>
              <h2 className="text-3xl font-bold text-gray-900">{tool.title}</h2>
              <p className="text-gray-600 text-lg">{tool.desc}</p>
              <a
                href={`/${tool.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Try Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <a
          href="/"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
