export function SiteFooter() {
  return (
    <footer
      className="border-t border-white/10 bg-[#050505] py-12 text-center"
      style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}
    >
      <p className="text-sm text-white/50">
        Built with code. Scaled in the cloud. Enhanced with AI.
      </p>
      <p className="mt-4 text-xs text-white/35">
        © {new Date().getFullYear()} Michael Brylinski
      </p>
    </footer>
  );
}
