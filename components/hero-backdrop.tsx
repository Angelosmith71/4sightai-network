import Image from "next/image"

const STARS = [
  [8, 12],
  [16, 28],
  [22, 8],
  [31, 18],
  [38, 6],
  [47, 22],
  [54, 10],
  [63, 16],
  [71, 7],
  [78, 20],
  [86, 12],
  [93, 24],
  [12, 42],
  [27, 36],
  [41, 44],
  [58, 38],
  [74, 42],
  [88, 36],
  [6, 58],
  [19, 64],
  [33, 56],
  [49, 62],
  [67, 54],
  [82, 60],
  [95, 52],
] as const

const NODES = [
  [12, 30],
  [22, 18],
  [34, 26],
  [18, 48],
  [30, 40],
  [42, 34],
  [28, 62],
  [44, 52],
  [56, 28],
  [68, 22],
  [62, 44],
  [76, 36],
  [84, 28],
  [72, 56],
  [88, 48],
  [50, 16],
] as const

const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 5],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 8],
  [6, 7],
  [7, 10],
  [8, 9],
  [8, 10],
  [9, 11],
  [11, 12],
  [10, 13],
  [11, 14],
  [9, 15],
  [2, 15],
  [12, 14],
]

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(720px,92vh)] overflow-hidden">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="hero-hex" width="8" height="7" patternUnits="userSpaceOnUse">
            <path
              d="M4 0.4 L7.4 2.2 V5.8 L4 7.6 L0.6 5.8 V2.2 Z"
              fill="none"
              stroke="rgba(90,180,255,0.11)"
              strokeWidth="0.12"
            />
          </pattern>
          <radialGradient id="hero-vignette" cx="70%" cy="35%" r="70%">
            <stop offset="0%" stopColor="rgba(20,70,160,0.28)" />
            <stop offset="55%" stopColor="rgba(8,16,36,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100" height="70" fill="url(#hero-hex)" />
        <rect width="100" height="70" fill="url(#hero-vignette)" />
        {LINKS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="rgba(90,190,255,0.28)"
            strokeWidth="0.12"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle key={`n-${i}`} cx={x} cy={y} r={i % 4 === 0 ? 0.55 : 0.32} fill="rgba(140,210,255,0.85)" />
        ))}
        {STARS.map(([x, y], i) => (
          <circle
            key={`s-${i}`}
            cx={x}
            cy={y}
            r={i % 5 === 0 ? 0.22 : 0.12}
            fill="rgba(255,255,255,0.7)"
          />
        ))}
      </svg>
      <Image
        src="/hero-earth.webp"
        alt=""
        width={680}
        height={1150}
        unoptimized
        priority
        className="absolute top-[-8%] right-[-4%] h-[115%] w-auto max-w-[46%] object-contain opacity-90 sm:max-w-[40%] lg:right-[-2%]"
      />
    </div>
  )
}
