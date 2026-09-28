export function AndyEbertLogo({ size = "card" }: { size?: "card" | "hero" | "title" }) {
  const frame =
    size === "title"
      ? "andy-logo andy-logo--title"
      : size === "hero"
        ? "andy-logo andy-logo--hero"
        : "andy-logo andy-logo--card";

  return (
    <div className="andy-logo-glow">
      <div className={frame}>
        <span className="andy-logo__shine" aria-hidden />
        <span className="andy-logo__name">
          <span className="text-white">ANDY</span> <span className="text-[#b8ff00]">EBERT</span>
        </span>
        <span className="andy-logo__sub">Sound Engineer</span>
      </div>
    </div>
  );
}
