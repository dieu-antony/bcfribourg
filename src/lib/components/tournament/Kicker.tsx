export default function Kicker({
  children,
  onDark = false,
  className = "",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-sm font-bold uppercase tracking-[0.25em] ${
        onDark ? "text-[#ffd1e1]" : "text-[#d6245f]"
      } ${className}`}
    >
      {children}
    </p>
  );
}