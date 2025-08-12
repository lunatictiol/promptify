import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { fetchEventSource } from '@microsoft/fetch-event-source';

function Tagline() {
  const { accessToken, refreshToken } = useAuthStore();

  const [product, setProduct] = useState("");
  const [type, setType] = useState("creative");
  const [audience, setAudience] = useState("general");
  const [style, setStyle] = useState("catchy");

  const [tagline, setTagline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateTagline = async () => {
    setLoading(true);
    setTagline("");
    setError(null);

    const query = new URLSearchParams({
      product,
      type,
      audience,
      style
    }).toString();

    try {
      await fetchEventSource(`http://localhost:5000/api/ai/generate-tagline?${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
        onmessage(ev) {
          if (ev.data === "[DONE]") {
            setLoading(false);
          } else {
            setTagline((prev) => prev + ev.data);
          }
        },
        onerror(err) {
          console.error("SSE error:", err);
          setError("Failed to generate tagline. Please try again.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("Error generating tagline:", err);
      setError("Failed to generate tagline. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        ✨ Tagline Generator
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-md">
        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-200 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="product"
              className="block w-full px-4 py-2 border border-gray-500 bg-black/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g., EcoSmart Water Bottle"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-1">
              Type
            </label>
            <select
              id="type"
              className="block w-full px-4 py-2 border border-gray-500 bg-black/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="creative">Creative</option>
              <option value="descriptive">Descriptive</option>
              <option value="humorous">Humorous</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>

          {/* Audience */}
          <div>
            <label htmlFor="audience" className="block text-sm font-medium text-gray-200 mb-1">
              Audience
            </label>
            <select
              id="audience"
              className="block w-full px-4 py-2 border border-gray-500 bg-black/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="general">General</option>
              <option value="tech-savvy">Tech-Savvy</option>
              <option value="parents">Parents</option>
              <option value="eco-conscious">Eco-Conscious</option>
            </select>
          </div>

          {/* Style */}
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-200 mb-1">
              Style
            </label>
            <select
              id="style"
              className="block w-full px-4 py-2 border border-gray-500 bg-black/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="catchy">Catchy</option>
              <option value="elegant">Elegant</option>
              <option value="playful">Playful</option>
              <option value="bold">Bold</option>
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleGenerateTagline}
            disabled={loading || !product}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
              loading || !product
                ? 'bg-indigo-500/50 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Tagline'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-red-400 text-sm">{error}</p>
        )}

        {/* Tagline Output */}
        {tagline && (
          <div className="mt-6 p-4 bg-black/40 border border-indigo-400 rounded-md">
            <h2 className="text-lg font-semibold text-indigo-300">Your Tagline:</h2>
            <p className="mt-2 text-xl font-bold text-white leading-relaxed">{tagline}</p>
          </div>
        )}

        {/* Placeholder Message */}
        {!loading && !tagline && !error && (
          <p className="mt-6 text-center text-gray-400 text-sm">
            Enter product details and click "Generate Tagline" to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default Tagline;
