export default function GrainOverlay({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`grain-overlay pointer-events-none fixed inset-0 z-[60] ${className}`}
    />
  );
}
