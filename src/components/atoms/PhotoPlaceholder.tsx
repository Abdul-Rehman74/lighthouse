import { cn } from "@/lib/utils";

export type Scene =
  | "play"
  | "care"
  | "learn"
  | "nap"
  | "art"
  | "outdoor"
  | "food";

const scenes: Record<Scene, { bg: string; svg: React.ReactNode }> = {
  play: {
    bg: "linear-gradient(135deg, #FFE27A 0%, #FFC9B6 60%, #FF9E7B 100%)",
    svg: (
      <g>
        <circle cx="80" cy="60" r="22" fill="#FFD23F" />
        <g stroke="#FFD23F" strokeWidth="3" strokeLinecap="round">
          <line x1="80" y1="20" x2="80" y2="32" />
          <line x1="80" y1="88" x2="80" y2="100" />
          <line x1="40" y1="60" x2="52" y2="60" />
          <line x1="108" y1="60" x2="120" y2="60" />
        </g>
        <rect x="120" y="220" width="60" height="60" rx="6" fill="#5FB3F0" />
        <rect x="190" y="240" width="40" height="40" rx="6" fill="#FF9E7B" />
        <rect x="240" y="210" width="50" height="70" rx="6" fill="#8FD4AC" />
        <circle cx="220" cy="150" r="28" fill="#FBF4E3" />
        <path d="M180 280 Q180 200 220 200 Q260 200 260 280 Z" fill="#FBF4E3" />
      </g>
    ),
  },
  care: {
    bg: "linear-gradient(135deg, #C9E7FF 0%, #FFF0B8 100%)",
    svg: (
      <g>
        <path
          d="M200 130 C 170 90, 110 110, 140 170 L 200 230 L 260 170 C 290 110, 230 90, 200 130 Z"
          fill="#FF9E7B"
          opacity="0.85"
        />
        <circle cx="170" cy="155" r="8" fill="white" />
        <circle cx="225" cy="155" r="8" fill="white" />
      </g>
    ),
  },
  learn: {
    bg: "linear-gradient(135deg, #C8EBD7 0%, #C9E7FF 100%)",
    svg: (
      <g>
        <path
          d="M80 180 L200 160 L320 180 L320 280 L200 260 L80 280 Z"
          fill="#FBF4E3"
          stroke="#1F2A37"
          strokeWidth="3"
        />
        <line x1="200" y1="160" x2="200" y2="260" stroke="#1F2A37" strokeWidth="3" />
        <line x1="110" y1="200" x2="180" y2="195" stroke="#3A4756" strokeWidth="2" strokeLinecap="round" />
        <line x1="110" y1="220" x2="170" y2="215" stroke="#3A4756" strokeWidth="2" strokeLinecap="round" />
        <line x1="220" y1="195" x2="290" y2="200" stroke="#3A4756" strokeWidth="2" strokeLinecap="round" />
        <line x1="220" y1="215" x2="280" y2="220" stroke="#3A4756" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M200 80 L210 110 L240 110 L216 130 L226 160 L200 142 L174 160 L184 130 L160 110 L190 110 Z"
          fill="#FFD23F"
          stroke="#1F2A37"
          strokeWidth="2"
        />
      </g>
    ),
  },
  nap: {
    bg: "linear-gradient(135deg, #C9E7FF 0%, #EAF6FF 100%)",
    svg: (
      <g>
        <circle cx="320" cy="80" r="30" fill="#FFE27A" />
        <circle cx="328" cy="74" r="26" fill="#C9E7FF" />
        <ellipse cx="200" cy="220" rx="140" ry="40" fill="white" />
        <ellipse cx="160" cy="200" rx="50" ry="30" fill="white" />
        <ellipse cx="240" cy="200" rx="50" ry="30" fill="white" />
        <text x="80" y="100" fontFamily="Fraunces" fontSize="32" fill="#5FB3F0" fontWeight="700">z</text>
        <text x="105" y="80" fontFamily="Fraunces" fontSize="24" fill="#5FB3F0" fontWeight="700">z</text>
        <text x="120" y="60" fontFamily="Fraunces" fontSize="18" fill="#5FB3F0" fontWeight="700">z</text>
      </g>
    ),
  },
  art: {
    bg: "linear-gradient(135deg, #FFC9B6 0%, #FFE27A 100%)",
    svg: (
      <g>
        <ellipse cx="200" cy="180" rx="110" ry="80" fill="#FBF4E3" stroke="#1F2A37" strokeWidth="3" />
        <ellipse cx="280" cy="170" rx="20" ry="15" fill="white" />
        <circle cx="150" cy="150" r="14" fill="#FF9E7B" />
        <circle cx="190" cy="135" r="14" fill="#FFD23F" />
        <circle cx="240" cy="140" r="14" fill="#8FD4AC" />
        <circle cx="160" cy="200" r="14" fill="#5FB3F0" />
        <circle cx="220" cy="220" r="14" fill="#F47A4F" />
        <rect x="100" y="80" width="8" height="100" rx="2" fill="#3A4756" transform="rotate(-25 104 130)" />
        <path d="M70 60 L90 80 L80 90 L60 70 Z" fill="#FF9E7B" transform="rotate(-25 104 130)" />
      </g>
    ),
  },
  outdoor: {
    bg: "linear-gradient(135deg, #92CDF8 0%, #C8EBD7 60%, #FFE27A 100%)",
    svg: (
      <g>
        <rect x="280" y="180" width="20" height="100" fill="#8B5A3C" />
        <circle cx="290" cy="160" r="50" fill="#5BB484" />
        <circle cx="265" cy="170" r="38" fill="#8FD4AC" />
        <circle cx="315" cy="170" r="38" fill="#8FD4AC" />
        <circle cx="120" cy="240" r="30" fill="#FF9E7B" />
        <path d="M90 240 Q120 220 150 240" stroke="white" strokeWidth="3" fill="none" />
        <path d="M90 240 Q120 260 150 240" stroke="white" strokeWidth="3" fill="none" />
        <path d="M50 280 L55 265 L60 280 M65 280 L70 270 L75 280" stroke="#5BB484" strokeWidth="2" fill="none" />
        <path d="M180 280 L185 268 L190 280" stroke="#5BB484" strokeWidth="2" fill="none" />
      </g>
    ),
  },
  food: {
    bg: "linear-gradient(135deg, #FFE27A 0%, #C8EBD7 100%)",
    svg: (
      <g>
        <ellipse cx="200" cy="220" rx="130" ry="30" fill="#3A4756" opacity="0.15" />
        <circle cx="200" cy="200" r="100" fill="white" stroke="#1F2A37" strokeWidth="3" />
        <circle cx="200" cy="200" r="80" fill="#FBF4E3" />
        <circle cx="170" cy="180" r="18" fill="#FF9E7B" />
        <circle cx="220" cy="175" r="16" fill="#5BB484" />
        <circle cx="200" cy="220" r="20" fill="#FFD23F" />
        <ellipse cx="240" cy="210" rx="14" ry="10" fill="#F47A4F" />
      </g>
    ),
  },
};

export function PhotoPlaceholder({
  scene = "play",
  className,
  label,
}: {
  scene?: Scene;
  className?: string;
  label?: string;
}) {
  const s = scenes[scene] ?? scenes.play;
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: s.bg }}>
      <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
        {s.svg}
      </svg>
      {label && (
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/85 hand text-[16px] font-semibold text-ink-900">
          {label}
        </div>
      )}
    </div>
  );
}
