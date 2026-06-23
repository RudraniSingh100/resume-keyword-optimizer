type TextInputPanelProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextInputPanel({
  id,
  label,
  placeholder,
  value,
  onChange,
}: TextInputPanelProps) {
  return (
    <label htmlFor={id} className="flex min-h-[320px] flex-col gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-[280px] flex-1 resize-y rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-950"
      />
    </label>
  );
}
