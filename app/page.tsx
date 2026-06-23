"use client";

import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TextInputPanel } from "@/components/TextInputPanel";
import { analyzeResumeMatch } from "@/lib/keywordAnalysis";
import type { AnalysisResult } from "@/types/analysis";

const SAMPLE_RESUME_PLACEHOLDER =
  "Paste your resume text here. Include your summary, skills, experience, projects, certifications, and measurable achievements.";

const SAMPLE_JOB_PLACEHOLDER =
  "Paste the job description here. Include responsibilities, required qualifications, preferred skills, and tools mentioned by the employer.";

const THEME_STORAGE_KEY = "resume-keyword-optimizer-theme";

function formatResults(result: AnalysisResult): string {
  const missing = result.missingKeywords.map((item) => `${item.keyword} (${item.count})`).join(", ");
  const found = result.foundKeywords.map((item) => `${item.keyword} (${item.count})`).join(", ");
  const suggestions = result.suggestions.map((item, index) => `${index + 1}. ${item}`).join("\n");

  return [
    `Resume Keyword Optimizer Results`,
    `Match Score: ${result.matchScore}%`,
    `Missing Keywords: ${missing || "None"}`,
    `Found Keywords: ${found || "None"}`,
    `Top Improvement Suggestions:`,
    suggestions,
  ].join("\n");
}

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasLoadedTheme, setHasLoadedTheme] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : prefersDarkMode);
    setHasLoadedTheme(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedTheme) {
      return;
    }

    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [hasLoadedTheme, isDarkMode]);

  const canAnalyze = useMemo(() => {
    return resumeText.trim().length > 0 && jobDescriptionText.trim().length > 0;
  }, [resumeText, jobDescriptionText]);

  function handleAnalyze() {
    if (!canAnalyze) {
      return;
    }

    setIsLoading(true);
    setCopied(false);

    window.setTimeout(() => {
      setResult(analyzeResumeMatch(resumeText, jobDescriptionText));
      setIsLoading(false);
    }, 450);
  }

  async function handleCopyResults() {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(formatResults(result));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-paper transition-colors dark:bg-slate-950">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-end">
          <ThemeToggle
            isDarkMode={isDarkMode}
            onToggle={() => setIsDarkMode((currentTheme) => !currentTheme)}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand dark:text-teal-300">
              Resume Keyword Optimizer
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl dark:text-white">
              Tune your resume to the role before you apply.
            </h1>
          </div>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
            Compare your resume with a job description, find keyword gaps, and get practical edits
            you can make without paid APIs or external services.
          </p>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <TextInputPanel
            id="resume"
            label="Resume"
            value={resumeText}
            onChange={setResumeText}
            placeholder={SAMPLE_RESUME_PLACEHOLDER}
          />
          <TextInputPanel
            id="job-description"
            label="Job Description"
            value={jobDescriptionText}
            onChange={setJobDescriptionText}
            placeholder={SAMPLE_JOB_PLACEHOLDER}
          />
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {canAnalyze
              ? "Ready to analyze."
              : "Add both resume and job description text to enable analysis."}
          </p>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!canAnalyze || isLoading}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-coral px-6 text-sm font-bold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-300 dark:focus:ring-teal-900 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        <div className="mt-8">
          <ResultsPanel
            result={result}
            isLoading={isLoading}
            onCopy={handleCopyResults}
            copied={copied}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
