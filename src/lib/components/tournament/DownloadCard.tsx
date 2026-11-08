type DownloadCardProps = {
  href: string;
  title: string;
  description: string;
  cta: string;
};

export default function DownloadCard({ href, title, description, cta }: DownloadCardProps) {
  return (
    <a
      href={href}
      download
      className="group flex h-full flex-col rounded-2xl border border-[#166081]/15 bg-white/70 p-6 shadow-lg backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6245f] text-white">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
        </svg>
      </span>
      <h3 className="text-xl font-bold text-[#0b3547]">{title}</h3>
      <p className="mt-2 flex-1 text-[#0b3547]/75">{description}</p>
      <span className="mt-4 font-semibold text-[#166081] transition group-hover:translate-x-1">
        {cta} →
      </span>
    </a>
  );
}