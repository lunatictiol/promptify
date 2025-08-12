import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { reviewResume } from "../api/ai-client/resume";


export default function Resume() {
  const { accessToken, refreshToken } = useAuthStore();

  const [jobRole, setJobRole] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
    const [review, setReview] = useState({
    keypoints: [],
    pluspoints: [],
    improvements: [],
    verdict: ""
  });

  const { mutate, data: res, isPending, error } = useMutation({
    mutationFn: ({ jobRole, resumeFile }) => {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("job_role", jobRole);

      return reviewResume({
        accessToken,
        refreshToken,
        data: formData,
      }).then((res) => {
        // Backend sometimes sends JSON as string
          try {
            const cleanJsonString = res.review.replace(/^```json\s*|```$/g, '');
             const parsed = JSON.parse(cleanJsonString);
             console.log(parsed)
            setReview(prev => ({
              keypoints: [...prev.keypoints, ...(parsed.keypoints || [])],
              pluspoints: [...prev.pluspoints, ...(parsed.pluspoints || [])],
              improvements: [...prev.improvements, ...(parsed.improvements || [])],
              verdict: parsed.verdict || prev.verdict
            }));
          } catch(e) {
            console.log("error",e)
            throw new Error("Invalid JSON response from server");
          }
  
      });
    },
  });

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ jobRole, resumeFile });
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">
          📄 AI Resume Reviewer
        </h1>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700 w-full">
          <div className="space-y-6">
            {/* Job Role Input */}
            <div>
              <label htmlFor="jobRole" className="block text-sm font-medium text-gray-200 mb-2">
                Job Role You're Applying For
              </label>
              <input
                type="text"
                id="jobRole"
                className="block w-full px-4 py-3 border border-gray-500 bg-black/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            {/* Resume File Input */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-200 mb-2">
                Upload Your Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-black/40 rounded-md font-medium text-indigo-400 hover:text-indigo-500 px-1">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {resumeFile ? `Selected: ${resumeFile.name}` : 'PDF, DOC, DOCX, TXT up to 10MB'}
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleSubmit}
              disabled={isPending || !jobRole || !resumeFile}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
                isPending || !jobRole || !resumeFile
                  ? 'bg-indigo-500/50 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
              }`}
            >
              {isPending ? 'Reviewing...' : 'Review My Resume'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
              <p className="text-center text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Review Output */}
          {review && (review.keypoints.length > 0 || review.pluspoints.length > 0 || review.improvements.length > 0 || review.verdict) && (
            <div className="mt-8 space-y-6">
              <section>
                <h3 className="text-lg font-bold text-indigo-300">Key Points</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {review.keypoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-green-300">Plus Points</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {review.pluspoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-yellow-300">Improvements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {review.improvements.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>

              {review.verdict && (
                <section>
                  <h3 className="text-lg font-bold text-red-300">Verdict</h3>
                  <p>{review.verdict}</p>
                </section>
              )}
            </div>
          )}

          {/* Placeholder Message */}
          {!isPending && !error && review.keypoints.length === 0 && review.pluspoints.length === 0 && review.improvements.length === 0 && !review.verdict && (
            <p className="mt-8 text-center text-gray-400 text-sm">
              Upload your resume and enter a job role to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
