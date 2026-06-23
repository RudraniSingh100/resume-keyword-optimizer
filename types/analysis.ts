export type KeywordCount = {
  keyword: string;
  count: number;
};

export type AnalysisResult = {
  matchScore: number;
  missingKeywords: KeywordCount[];
  foundKeywords: KeywordCount[];
  suggestions: string[];
  resumeKeywordCount: number;
  jobKeywordCount: number;
};
