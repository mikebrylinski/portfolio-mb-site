type Props = { variant?: number };

const rotations = ["0deg", "1.5deg", "-1deg", "0.5deg", "-0.5deg", "1deg", "-1.2deg", "0.8deg"];

export function TechOverlay({ variant = 0 }: Props) {
  const r = rotations[variant % rotations.length];
  const codeSnippet =
    "{ deploy } const stack = ['React','Node','AWS']; export async function scale() { await bedrock.invoke(); return true; } // systems";

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ transform: `rotate(${r}) scale(1.1)` }}
    >
      <svg
        className="absolute inset-0 h-full w-full text-white"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`grid-${variant}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.35"
            />
          </pattern>
          <linearGradient id={`fade-${variant}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#050505" stopOpacity="0" />
            <stop offset="50%" stopColor="#050505" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
        <rect
          width="100%"
          height="100%"
          fill={`url(#fade-${variant})`}
          className="mix-blend-multiply"
        />
        <line
          x1="0"
          y1="40%"
          x2="100%"
          y2="35%"
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.25"
        />
        <line
          x1="0"
          y1="70%"
          x2="100%"
          y2="75%"
          stroke="#3B8CFF"
          strokeWidth="0.4"
          opacity="0.2"
        />
      </svg>
      <div
        className="absolute inset-0 flex select-none items-center justify-center font-mono text-[8px] leading-relaxed text-[#3B8CFF] opacity-30 sm:text-[10px] md:text-xs"
        style={{
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)",
        }}
      >
        <p className="max-w-4xl whitespace-pre-wrap break-words px-4 text-center opacity-80">
          {codeSnippet.repeat(3)}
        </p>
      </div>
    </div>
  );
}
