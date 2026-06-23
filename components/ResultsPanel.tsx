import type { AnalysisResult, KeywordCount } from "@/types/analysis";

type ResultsPanelProps = {
  result: AnalysisResult | null;
  isLoading: boolean;
  onCopy: () => void;
  copied: boolean;
};

function KeywordList({ title, keywords }: { title: string; keywords: KeywordCount[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-semibold text-ink dark:text-white">{title}</h3>
      {keywords.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((item) => (
            <span
              key={item.keyword}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {item.keyword} <span className="text-slate-400 dark:text-slate-500">x{item.count}</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No keywords to show yet.</p>
      )}
    </section>
  );
}

export function ResultsPanel({ result, isLoading, onCopy, copied }: ResultsPanelProps) {
  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-6 h-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="h-28 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="h-28 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-6 text-center dark:border-slate-700 dark:bg-slate-900/80">
        <h2 className="text-lg font-semibold text-ink dark:text-white">Results will appear here</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Paste your resume and a job description, then run the analyzer to compare role keywords.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Match Score
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold text-ink dark:text-white">{result.matchScore}%</span>
              <span className="pb-2 text-sm text-slate-500 dark:text-slate-400">
                {result.foundKeywords.length} of {result.jobKeywordCount} role keywords found
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-700"
          >
            {copied ? "Copied" : "Copy Results"}
          </button>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${result.matchScore}%` }}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <KeywordList title="Missing Keywords" keywords={result.missingKeywords} />
        <KeywordList title="Found Keywords" keywords={result.foundKeywords} />
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-sm font-semibold text-ink dark:text-white">Top Improvement Suggestions</h3>
        <ol className="mt-4 space-y-3">
          {result.suggestions.map((suggestion) => (
            <li key={suggestion} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral dark:bg-teal-300" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
