type ThemeToggleProps = {
  isDarkMode: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDarkMode}
      aria-label="Toggle dark mode"
      className="inline-flex h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-ink shadow-sm transition hover:border-brand hover:text-brand focus:outline-none focus:ring-4 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-300 dark:focus:ring-teal-900"
    >
      <span className="text-base" aria-hidden="true">
        {isDarkMode ? "☾" : "☀"}
      </span>
      <span>{isDarkMode ? "Dark" : "Light"} Mode</span>
    </button>
  );
}
