type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
};

/** Left-aligned section header: mono eyebrow, display title, optional subtitle on the right at lg. */
export default function SectionHeader({ eyebrow, title, subtitle, id }: Props) {
  return (
    <div className="mb-12 lg:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
      <div className="lg:col-span-7">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-blue mb-4 flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-brand-blue" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight text-balance"
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="lg:col-span-5 text-white/65 text-base lg:text-lg leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
