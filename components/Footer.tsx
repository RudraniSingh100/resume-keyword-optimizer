export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          <p>
            <span className="font-semibold text-ink dark:text-white">Name:</span> Rudrani
          </p>
          <p>
            <span className="font-semibold text-ink dark:text-white">Email:</span>{" "}
            <a
              className="text-brand underline-offset-4 hover:underline dark:text-teal-300"
              href="mailto:rudrani.r24@gmail.com"
            >
              rudrani.r24@gmail.com
            </a>
          </p>
        </div>
        <a
          href="https://digitalheroesco.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-300 dark:focus:ring-teal-900"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  );
}
