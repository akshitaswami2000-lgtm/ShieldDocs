export function SectionHeader({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-normal text-lagoon">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink sm:text-5xl">{title}</h1>
      {children ? <div className="mt-4 text-base leading-7 text-slate-600">{children}</div> : null}
    </div>
  );
}
