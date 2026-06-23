import type { AnalysisResult, KeywordCount } from "@/types/analysis";

const STOP_WORDS = new Set<string>([
  "a",
  "about",
  "above",
  "across",
  "after",
  "again",
  "against",
  "all",
  "almost",
  "also",
  "am",
  "among",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "during",
  "each",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "just",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);

const MIN_KEYWORD_LENGTH = 3;
const MAX_KEYWORDS = 18;

function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9+#.-]/g, "");
}

export function extractKeywords(text: string): KeywordCount[] {
  const counts = new Map<string, number>();
  const words = text
    .split(/\s+/)
    .map(normalizeWord)
    .filter((word) => {
      return (
        word.length >= MIN_KEYWORD_LENGTH &&
        !STOP_WORDS.has(word) &&
        !/^\d+$/.test(word)
      );
    });

  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count || a.keyword.localeCompare(b.keyword));
}

function takeTopKeywords(keywords: KeywordCount[]): KeywordCount[] {
  return keywords.slice(0, MAX_KEYWORDS);
}

function buildSuggestions(missingKeywords: KeywordCount[], matchScore: number): string[] {
  if (missingKeywords.length === 0) {
    return [
      "Your resume already reflects the primary job description keywords.",
      "Fine tune impact bullets with measurable results to strengthen recruiter review.",
      "Mirror the job title and core skills naturally in your summary section.",
    ];
  }

  const topMissing = missingKeywords.slice(0, 5).map((item) => item.keyword);
  const suggestions = [
    `Add relevant experience bullets that naturally include: ${topMissing.join(", ")}.`,
    "Update your summary to echo the job description's core role, tools, and responsibilities.",
    "Place important missing skills in a dedicated skills section when you can honestly support them.",
  ];

  if (matchScore < 50) {
    suggestions.push(
      "Rework two or three bullets so they connect your achievements directly to this role's priorities.",
    );
  }

  return suggestions;
}

export function analyzeResumeMatch(resumeText: string, jobDescriptionText: string): AnalysisResult {
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescriptionText);
  const resumeKeywordSet = new Set(resumeKeywords.map((item) => item.keyword));

  const foundKeywords = jobKeywords.filter((item) => resumeKeywordSet.has(item.keyword));
  const missingKeywords = jobKeywords.filter((item) => !resumeKeywordSet.has(item.keyword));
  const matchScore =
    jobKeywords.length === 0 ? 0 : Math.round((foundKeywords.length / jobKeywords.length) * 100);

  return {
    matchScore,
    missingKeywords: takeTopKeywords(missingKeywords),
    foundKeywords: takeTopKeywords(foundKeywords),
    suggestions: buildSuggestions(missingKeywords, matchScore),
    resumeKeywordCount: resumeKeywords.length,
    jobKeywordCount: jobKeywords.length,
  };
}
