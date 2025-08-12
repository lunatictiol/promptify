import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import ReactMarkdown from "react-markdown";
import { generateArticle } from "../api/ai-client/article";
import { marked } from "marked";
import html2pdf from "html2pdf.js";

function Article() {
  const { accessToken, refreshToken } = useAuthStore();

  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("informative");
  const [tone, setTone] = useState("neutral");
  const [length, setLength] = useState("medium");
  const [audience, setAudience] = useState("general");

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: ({ topic, style, tone, length, audience }) =>
      generateArticle({
        accessToken,
        refreshToken,
        data: { topic, style, tone, length, audience },
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ topic, style, tone, length, audience });
  };
  const downloadPDF = () => {

    const htmlContent = marked(data.article);

    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    element.style.width = "210mm"; // A4 width
    element.style.padding = "20px";
    element.style.boxSizing = "border-box";

  
    const style = document.createElement("style");
    style.innerHTML = `
      * { box-sizing: border-box; }
      h1, h2, h3, p, li {
        page-break-inside: avoid;
      }
      div {
        page-break-after: always;
      }
    `;
    element.appendChild(style);

    const options = {
      margin: 10,
      filename: `${topic}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, scrollY: 0 }, 
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold text-white mb-10">
        📝 AI Article Generator
      </h1>

      <div className="flex gap-8 w-full max-w-6xl">
        {/* Left Form */}
        <div className="w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-indigo-300">
            Generate Your Article
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-black/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g., The Future of AI"
                required
              />
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-black/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="informative">Informative</option>
                <option value="persuasive">Persuasive</option>
                <option value="narrative">Narrative</option>
              </select>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-black/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="neutral">Neutral</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="motivational">Motivational</option>
              </select>
            </div>

            {/* Length */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Length
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-black/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="short">Short (~300 words)</option>
                <option value="medium">Medium (~600 words)</option>
                <option value="long">Long (~1000+ words)</option>
              </select>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-black/40 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="general">General Public</option>
                <option value="students">Students</option>
                <option value="professionals">Professionals</option>
                <option value="experts">Experts</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
                isPending
                  ? "bg-indigo-500/50 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isPending ? "Generating..." : "Generate Article"}
            </button>
          </form>
           {/* Submit */}
        {data &&  <button
              disabled={isPending}
              onClick={downloadPDF}
              className={`w-full py-3 px-4 rounded-lg mt-5 font-semibold text-white transition-colors duration-200 ${
                isPending
                  ? "bg-indigo-500/50 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {"Download Article"}
            </button> }
          {error && (
            <p className="mt-4 text-red-400 text-sm">
              Failed to generate article. Please try again.
            </p>
          )}
        </div>

        {/* Right Article Card */}
        <div className="w-1/2 h-150 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700 overflow-y-scroll">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">
            Generated Article
          </h2>
          {isPending && (
            <p className="text-gray-300 italic">Generating your masterpiece...</p>
          )}
          {data?.article ? (
            
            <ReactMarkdown >
              {data.article}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-500 italic">
              Your article will appear here once generated.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
