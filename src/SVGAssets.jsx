/**
 * SVGAssets.jsx — Botanical SVG asset library for The Digital Greenhouse
 * All components accept `size`, `style`, `className` props.
 */

import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ROSE — detailed red rose with petals and center
// ─────────────────────────────────────────────────────────────────────────────
export const RoseIcon = ({ size = 40, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Outer petals */}
    <ellipse cx="50" cy="34" rx="13" ry="20" fill="#e63946" transform="rotate(-30 50 55)" opacity="0.88"/>
    <ellipse cx="50" cy="34" rx="13" ry="20" fill="#c1121f" transform="rotate(0 50 55)"  opacity="0.9"/>
    <ellipse cx="50" cy="34" rx="13" ry="20" fill="#e63946" transform="rotate(30 50 55)" opacity="0.88"/>
    <ellipse cx="50" cy="34" rx="13" ry="20" fill="#c1121f" transform="rotate(60 50 55)" opacity="0.85"/>
    <ellipse cx="50" cy="34" rx="13" ry="20" fill="#e63946" transform="rotate(90 50 55)" opacity="0.88"/>
    <ellipse cx="50" cy="34" rx="13" ry="20" fill="#c1121f" transform="rotate(120 50 55)" opacity="0.87"/>
    {/* Inner petals */}
    <ellipse cx="50" cy="42" rx="10" ry="14" fill="#d62828" transform="rotate(-20 50 55)" opacity="0.95"/>
    <ellipse cx="50" cy="42" rx="10" ry="14" fill="#e63946" transform="rotate(20 50 55)"  opacity="0.95"/>
    <ellipse cx="50" cy="42" rx="10" ry="14" fill="#d62828" transform="rotate(70 50 55)"  opacity="0.92"/>
    <ellipse cx="50" cy="42" rx="10" ry="14" fill="#e63946" transform="rotate(110 50 55)" opacity="0.92"/>
    {/* Center */}
    <circle cx="50" cy="55" r="9" fill="#9d0208"/>
    <circle cx="50" cy="55" r="6" fill="#c1121f"/>
    <circle cx="50" cy="55" r="3.5" fill="#e63946"/>
    {/* Highlight */}
    <circle cx="47" cy="52" r="2" fill="rgba(255,255,255,0.25)"/>
    {/* Stem */}
    <path d="M50 64 Q52 75 50 88" stroke="#2d6a4f" strokeWidth="3" strokeLinecap="round" fill="none"/>
    {/* Leaf */}
    <path d="M51 74 Q62 66 65 72 Q58 78 51 74Z" fill="#52b788" opacity="0.9"/>
    <path d="M49 80 Q38 74 36 80 Q42 85 49 80Z" fill="#52b788" opacity="0.85"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// WHITE DAISY — like the daisies in the bouquet
// ─────────────────────────────────────────────────────────────────────────────
export const DaisyIcon = ({ size = 40, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Petals */}
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const cx = 50 + Math.cos(angle) * 26;
      const cy = 50 + Math.sin(angle) * 26;
      return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="14" fill="white" stroke="#e8e8e8" strokeWidth="0.5"
        transform={`rotate(${i * 30} ${cx} ${cy})`} opacity="0.96" />;
    })}
    {/* Yellow center */}
    <circle cx="50" cy="50" r="15" fill="#ffd166"/>
    <circle cx="50" cy="50" r="11" fill="#f4a261"/>
    <circle cx="50" cy="50" r="7"  fill="#ffd166"/>
    {/* Center dots */}
    {Array.from({ length: 6 }, (_, i) => {
      const a = (i * 60 * Math.PI) / 180;
      return <circle key={i} cx={50 + Math.cos(a) * 5} cy={50 + Math.sin(a) * 5} r="1.5" fill="#c77b00" opacity="0.7" />;
    })}
    <circle cx="50" cy="50" r="2" fill="#c77b00" opacity="0.8"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LEAF BRANCH — curved stem with leaves
// ─────────────────────────────────────────────────────────────────────────────
export const LeafBranchIcon = ({ size = 48, style = {}, color = '#2d6a4f' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Main stem */}
    <path d="M20 80 Q40 55 55 35 Q65 22 75 18" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    {/* Leaf 1 */}
    <path d="M38 61 Q28 42 38 35 Q52 42 38 61Z" fill={color} opacity="0.85"/>
    <path d="M38 61 Q38 48 38 35" stroke={color} strokeWidth="1" opacity="0.5" fill="none"/>
    {/* Leaf 2 */}
    <path d="M55 43 Q68 30 72 36 Q65 50 55 43Z" fill={color} opacity="0.8"/>
    <path d="M55 43 Q63 36 72 36" stroke={color} strokeWidth="1" opacity="0.45" fill="none"/>
    {/* Leaf 3 */}
    <path d="M46 55 Q36 46 42 40 Q52 46 46 55Z" fill={color} opacity="0.75"/>
    {/* Small berries */}
    <circle cx="75" cy="18" r="4" fill={color} opacity="0.7"/>
    <circle cx="80" cy="14" r="3" fill={color} opacity="0.6"/>
    <circle cx="71" cy="13" r="3" fill={color} opacity="0.65"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPARKLE STAR — 4-pointed sparkle
// ─────────────────────────────────────────────────────────────────────────────
export const SparkleIcon = ({ size = 28, style = {}, color = '#52b788' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M50 5 L54 42 L90 50 L54 58 L50 95 L46 58 L10 50 L46 42 Z" fill={color} opacity="0.9"/>
    <path d="M50 25 L52 44 L68 50 L52 56 L50 75 L48 56 L32 50 L48 44 Z" fill="white" opacity="0.5"/>
    <circle cx="50" cy="50" r="4" fill="white" opacity="0.7"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// HEART — smooth botanical heart with leaf accent
// ─────────────────────────────────────────────────────────────────────────────
export const HeartLeafIcon = ({ size = 36, style = {}, color = '#e63946' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Heart */}
    <path d="M50 82 C50 82 12 56 12 32 C12 18 22 10 34 10 C42 10 48 15 50 20 C52 15 58 10 66 10 C78 10 88 18 88 32 C88 56 50 82 50 82Z"
      fill={color} opacity="0.88"/>
    {/* Inner shine */}
    <path d="M32 20 Q28 30 32 40" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    {/* Small leaf bottom */}
    <path d="M50 80 Q56 88 52 94 Q46 88 50 80Z" fill="#52b788" opacity="0.8"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// GREENHOUSE / HOUSE icon
// ─────────────────────────────────────────────────────────────────────────────
export const GreenhouseIcon = ({ size = 36, style = {}, color = '#2d6a4f' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Roof */}
    <path d="M10 48 L50 12 L90 48Z" fill={color} opacity="0.3"/>
    <path d="M10 48 L50 12 L90 48" stroke={color} strokeWidth="3" strokeLinejoin="round" fill="none"/>
    {/* Body */}
    <rect x="18" y="48" width="64" height="42" rx="2" fill="rgba(255,255,255,0.2)" stroke={color} strokeWidth="2.5"/>
    {/* Door */}
    <rect x="40" y="68" width="20" height="22" rx="10" fill={color} opacity="0.25"/>
    <rect x="40" y="68" width="20" height="22" rx="10" stroke={color} strokeWidth="2"/>
    {/* Windows */}
    <rect x="22" y="55" width="16" height="14" rx="3" fill="rgba(82,183,136,0.2)" stroke={color} strokeWidth="1.5"/>
    <rect x="62" y="55" width="16" height="14" rx="3" fill="rgba(82,183,136,0.2)" stroke={color} strokeWidth="1.5"/>
    {/* Window cross */}
    <line x1="30" y1="55" x2="30" y2="69" stroke={color} strokeWidth="1" opacity="0.5"/>
    <line x1="22" y1="62" x2="38" y2="62" stroke={color} strokeWidth="1" opacity="0.5"/>
    <line x1="70" y1="55" x2="70" y2="69" stroke={color} strokeWidth="1" opacity="0.5"/>
    <line x1="62" y1="62" x2="78" y2="62" stroke={color} strokeWidth="1" opacity="0.5"/>
    {/* Chimney plant */}
    <path d="M50 12 Q50 4 50 2" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="50" cy="2" r="3" fill="#52b788"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// FLORAL DIVIDER — horizontal botanical row
// ─────────────────────────────────────────────────────────────────────────────
export const FloralDivider = ({ width = 240, color = '#2d6a4f', opacity = 0.3 }) => (
  <svg width={width} height="32" viewBox={`0 0 ${width} 32`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    {/* Left stem */}
    <path d={`M0 16 Q${width * 0.15} 16 ${width * 0.3} 16`} stroke={color} strokeWidth="1.5" strokeDasharray="4 3"/>
    {/* Right stem */}
    <path d={`M${width * 0.7} 16 Q${width * 0.85} 16 ${width} 16`} stroke={color} strokeWidth="1.5" strokeDasharray="4 3"/>
    {/* Left leaf */}
    <path d={`M${width * 0.18} 16 Q${width * 0.22} 8 ${width * 0.28} 12 Q${width * 0.24} 18 ${width * 0.18} 16Z`} fill={color}/>
    {/* Right leaf */}
    <path d={`M${width * 0.82} 16 Q${width * 0.78} 8 ${width * 0.72} 12 Q${width * 0.76} 18 ${width * 0.82} 16Z`} fill={color}/>
    {/* Center flower */}
    {[0, 60, 120, 180, 240, 300].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      const cx = width / 2 + Math.cos(rad) * 8;
      const cy = 16 + Math.sin(rad) * 8;
      return <circle key={i} cx={cx} cy={cy} r="3.5" fill={color} opacity="0.7"/>;
    })}
    <circle cx={width / 2} cy="16" r="5" fill={color}/>
    <circle cx={width / 2} cy="16" r="2.5" fill="rgba(255,255,255,0.5)"/>
    {/* Small dots on stems */}
    {[0.1, 0.25, 0.75, 0.9].map((x, i) => (
      <circle key={i} cx={width * x} cy="16" r="2" fill={color} opacity="0.55"/>
    ))}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR HEART — timeline icon
// ─────────────────────────────────────────────────────────────────────────────
export const CalendarHeartIcon = ({ size = 28, style = {}, color = '#2d6a4f' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="8" y="20" width="84" height="72" rx="8" fill="rgba(255,255,255,0.15)" stroke={color} strokeWidth="4"/>
    <rect x="8" y="20" width="84" height="26" rx="8" fill={color} opacity="0.2"/>
    <line x1="8" y1="46" x2="92" y2="46" stroke={color} strokeWidth="3" opacity="0.4"/>
    {/* Knobs */}
    <rect x="28" y="10" width="8" height="20" rx="4" fill={color}/>
    <rect x="64" y="10" width="8" height="20" rx="4" fill={color}/>
    {/* Heart inside */}
    <path d="M50 76 C50 76 34 64 34 55 C34 49 38 46 42 46 C45 46 48 48 50 51 C52 48 55 46 58 46 C62 46 66 49 66 55 C66 64 50 76 50 76Z"
      fill="#e63946" opacity="0.85"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// CLOCK LEAF — timeline icon
// ─────────────────────────────────────────────────────────────────────────────
export const ClockLeafIcon = ({ size = 28, style = {}, color = '#2d6a4f' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="4" fill="rgba(255,255,255,0.1)"/>
    <circle cx="50" cy="50" r="4" fill={color}/>
    {/* Hour hand */}
    <line x1="50" y1="50" x2="50" y2="22" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    {/* Minute hand */}
    <line x1="50" y1="50" x2="68" y2="58" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    {/* Tick marks */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
      const r = (a * Math.PI) / 180;
      const r1 = i % 3 === 0 ? 30 : 34;
      return <line key={i} x1={50 + Math.cos(r) * r1} y1={50 + Math.sin(r) * r1}
        x2={50 + Math.cos(r) * 38} y2={50 + Math.sin(r) * 38}
        stroke={color} strokeWidth={i % 3 === 0 ? 3 : 1.5} strokeLinecap="round" opacity="0.5"/>;
    })}
    {/* Leaf accent */}
    <path d="M72 28 Q82 18 86 24 Q80 34 72 28Z" fill={color} opacity="0.7"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// FOREVER / INFINITY STAR
// ─────────────────────────────────────────────────────────────────────────────
export const InfinityIcon = ({ size = 28, style = {}, color = '#52b788' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M20 50 C20 30 35 20 50 35 C65 50 80 20 80 50 C80 70 65 80 50 65 C35 50 20 70 20 50Z"
      stroke={color} strokeWidth="5" fill="none" strokeLinecap="round"/>
    {/* Sparkle accents */}
    {[[-8,0],[108,0],[50,-18],[50,18]].map(([x,y],i)=>(
      <path key={i} d={`M${x} ${y} L${x+3} ${y-3} L${x} ${y-7} L${x-3} ${y-3} Z`} fill={color} opacity="0.6"/>
    ))}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SMALL ROSE BUD — compact version for badges
// ─────────────────────────────────────────────────────────────────────────────
export const RoseBudIcon = ({ size = 32, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Sepal */}
    <path d="M50 70 Q40 62 38 55 Q45 58 50 60 Q55 58 62 55 Q60 62 50 70Z" fill="#52b788"/>
    {/* Petals */}
    <ellipse cx="50" cy="45" rx="12" ry="20" fill="#e63946" opacity="0.88"/>
    <ellipse cx="38" cy="48" rx="10" ry="16" fill="#c1121f" opacity="0.85"/>
    <ellipse cx="62" cy="48" rx="10" ry="16" fill="#e63946" opacity="0.82"/>
    <ellipse cx="44" cy="40" rx="9" ry="14" fill="#d62828" opacity="0.9"/>
    <ellipse cx="56" cy="40" rx="9" ry="14" fill="#e63946" opacity="0.88"/>
    {/* Inner */}
    <ellipse cx="50" cy="42" rx="7" ry="10" fill="#9d0208" opacity="0.95"/>
    <ellipse cx="50" cy="42" rx="4" ry="7"  fill="#c1121f"/>
    {/* Highlight */}
    <ellipse cx="47" cy="38" rx="2" ry="3.5" fill="rgba(255,255,255,0.22)"/>
    {/* Stem */}
    <path d="M50 70 L50 92" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M50 80 Q38 74 34 78 Q40 85 50 80Z" fill="#52b788"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// ENVELOPE — mail icon botanical style
// ─────────────────────────────────────────────────────────────────────────────
export const BotanicalEnvelopeIcon = ({ size = 36, style = {}, color = '#2d6a4f' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Envelope body */}
    <rect x="8" y="25" width="84" height="58" rx="6" fill="rgba(255,255,255,0.18)" stroke={color} strokeWidth="3"/>
    {/* Flap */}
    <path d="M8 25 L50 58 L92 25Z" fill={color} opacity="0.18"/>
    <path d="M8 25 L50 58 L92 25" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    {/* Bottom fold lines */}
    <line x1="8" y1="83" x2="38" y2="58" stroke={color} strokeWidth="2" opacity="0.3"/>
    <line x1="92" y1="83" x2="62" y2="58" stroke={color} strokeWidth="2" opacity="0.3"/>
    {/* Rose stamp */}
    <circle cx="75" cy="72" r="12" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5"/>
    <circle cx="75" cy="72" r="5" fill={color} opacity="0.5"/>
    <path d="M75 67 Q78 70 75 73 Q72 70 75 67Z" fill="rgba(255,255,255,0.4)"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// INDIVIDUAL ROSE PETAL SVG (for falling petals)
// ─────────────────────────────────────────────────────────────────────────────
export const RosePetalSVG = ({ size = 24, color = '#e63946', opacity = 0.85 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2 C32 10 38 28 28 44 C24 50 16 50 12 44 C2 28 8 10 20 2Z"
      fill={color}
      opacity={opacity}
    />
    <path
      d="M20 8 Q24 24 20 46"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// CORNER BOTANICAL VINE (Trailing foliage in screen corners)
// ─────────────────────────────────────────────────────────────────────────────
export const VineCornerSVG = ({ width = 160, height = 160, color = '#2d6a4f', style = {} }) => (
  <svg width={width} height={height} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* Main curving vine stems */}
    <path d="M0 0 C40 25 75 70 85 130 C90 160 85 190 70 200" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    <path d="M0 0 C25 45 60 80 135 90 C165 95 190 85 200 70" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
    <path d="M0 0 C15 30 35 55 55 75" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

    {/* Leaves along vine */}
    <path d="M35 22 Q50 15 52 28 Q40 35 35 22Z" fill="#52b788" opacity="0.8" />
    <path d="M22 36 Q15 50 28 53 Q36 42 22 36Z" fill="#2d6a4f" opacity="0.75" />
    <path d="M60 52 Q82 45 80 62 Q65 70 60 52Z" fill="#52b788" opacity="0.85" />
    <path d="M52 64 Q45 85 62 82 Q70 68 52 64Z" fill="#40916c" opacity="0.8" />
    <path d="M80 100 Q105 105 95 122 Q75 118 80 100Z" fill="#52b788" opacity="0.85" />
    <path d="M100 80 Q122 75 125 96 Q105 102 100 80Z" fill="#40916c" opacity="0.85" />
    <path d="M145 88 Q165 72 175 88 Q155 98 145 88Z" fill="#52b788" opacity="0.75" />
    <path d="M82 145 Q65 165 82 172 Q92 155 82 145Z" fill="#52b788" opacity="0.7" />

    {/* Small Wild Rose Buds */}
    <circle cx="58" cy="30" r="6" fill="#e63946" opacity="0.85" />
    <circle cx="58" cy="30" r="3" fill="#c1121f" />
    <circle cx="118" cy="85" r="7" fill="#e63946" opacity="0.85" />
    <circle cx="118" cy="85" r="3.5" fill="#c1121f" />
    <circle cx="78" cy="125" r="5" fill="#f4a261" opacity="0.9" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// GREENHOUSE WINDOW ARCH (Victorian Botanical Arch Backdrop)
// ─────────────────────────────────────────────────────────────────────────────
export const GreenhouseArchSVG = ({ width = "100%", height = 360, color = "#2d6a4f", opacity = 0.12 }) => (
  <svg width={width} height={height} viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    {/* Outer Cathedral Arch */}
    <path d="M50 360 L50 180 C50 60 220 20 400 20 C580 20 750 60 750 180 L750 360" stroke={color} strokeWidth="3" opacity={opacity} />
    {/* Inner Arch */}
    <path d="M70 360 L70 185 C70 80 230 40 400 40 C570 40 730 80 730 185 L730 360" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" opacity={opacity * 0.8} />

    {/* Geometric Greenhouse Glass Panes */}
    <line x1="400" y1="20" x2="400" y2="360" stroke={color} strokeWidth="2" opacity={opacity} />
    <line x1="225" y1="55" x2="225" y2="360" stroke={color} strokeWidth="1.5" opacity={opacity * 0.75} />
    <line x1="575" y1="55" x2="575" y2="360" stroke={color} strokeWidth="1.5" opacity={opacity * 0.75} />
    
    {/* Radial spokes in the arch crown */}
    <line x1="400" y1="180" x2="260" y2="60" stroke={color} strokeWidth="1.2" opacity={opacity * 0.7} />
    <line x1="400" y1="180" x2="540" y2="60" stroke={color} strokeWidth="1.2" opacity={opacity * 0.7} />
    <line x1="400" y1="180" x2="160" y2="120" stroke={color} strokeWidth="1.2" opacity={opacity * 0.7} />
    <line x1="400" y1="180" x2="640" y2="120" stroke={color} strokeWidth="1.2" opacity={opacity * 0.7} />

    {/* Horizontal Transom Bars */}
    <line x1="50" y1="180" x2="750" y2="180" stroke={color} strokeWidth="2" opacity={opacity} />
    <line x1="50" y1="270" x2="750" y2="270" stroke={color} strokeWidth="1.2" opacity={opacity * 0.6} />

    {/* Ornate Rosette Center */}
    <circle cx="400" cy="180" r="28" stroke={color} strokeWidth="1.8" opacity={opacity * 1.2} />
    <circle cx="400" cy="180" r="14" stroke={color} strokeWidth="1.2" opacity={opacity} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// PRESSED FLOWER BOTANICAL BOOKMARK (Detail for Love Letter)
// ─────────────────────────────────────────────────────────────────────────────
export const PressedFlowerSVG = ({ size = 64 }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 60 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Translucent cellophane ribbon tape */}
    <rect x="18" y="2" width="24" height="12" rx="1" fill="rgba(255,255,255,0.7)" stroke="rgba(212,234,220,0.8)" strokeWidth="0.8" />
    
    {/* Stem */}
    <path d="M30 10 Q28 50 30 90" stroke="#52b788" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
    <path d="M29 45 Q18 38 15 44 Q22 48 29 46" fill="#74c69d" opacity="0.75" />
    <path d="M30 60 Q42 54 44 60 Q36 64 30 62" fill="#74c69d" opacity="0.75" />

    {/* Pressed Daisy Blossom */}
    {Array.from({ length: 10 }).map((_, i) => {
      const angle = (i * 360) / 10;
      return (
        <ellipse
          key={i}
          cx="30"
          cy="26"
          rx="3.5"
          ry="9"
          fill="rgba(255,255,255,0.92)"
          stroke="rgba(45,106,79,0.2)"
          strokeWidth="0.5"
          transform={`rotate(${angle} 30 26)`}
        />
      );
    })}
    <circle cx="30" cy="26" r="4.5" fill="#f4a261" opacity="0.9" />
    <circle cx="30" cy="26" r="2.5" fill="#e76f51" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// WAX SEAL STAMP (Vintage Botanical Red Wax Seal)
// ─────────────────────────────────────────────────────────────────────────────
export const WaxSealSVG = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Irregular melted wax outer edge */}
    <path
      d="M50 8 C62 6 72 14 80 22 C90 32 94 45 91 58 C88 72 79 84 66 90 C52 96 38 93 26 86 C12 78 6 64 8 50 C10 35 18 22 30 14 C38 8 44 9 50 8Z"
      fill="#a4161a"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(164,22,26,0.45))' }}
    />
    <path
      d="M49 12 C60 10 68 18 76 25 C84 34 88 45 85 56 C82 68 74 78 63 83 C51 88 38 86 28 80 C16 73 11 61 13 49 C15 36 22 25 32 18 C39 13 44 13 49 12Z"
      fill="#ba181b"
    />
    {/* Inner ring */}
    <circle cx="50" cy="50" r="32" stroke="#e5383b" strokeWidth="2.5" opacity="0.75" />
    <circle cx="50" cy="50" r="28" stroke="#660708" strokeWidth="1.5" opacity="0.6" />

    {/* Embossed Rose Motif in center */}
    <path d="M50 36 C56 36 60 40 60 45 C60 52 54 56 50 62 C46 56 40 52 40 45 C40 40 44 36 50 36Z" fill="#e5383b" opacity="0.9" />
    <path d="M50 40 C53 40 56 42 56 45 C56 49 52 52 50 56 C48 52 44 49 44 45 C44 42 47 40 50 40Z" fill="#a4161a" />
    <path d="M50 62 L50 68" stroke="#e5383b" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 65 Q58 63 60 66" stroke="#e5383b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M50 66 Q42 64 40 67" stroke="#e5383b" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// FAIRY LIGHTS GARLAND (Twinkling amber bulbs across the ceiling)
// ─────────────────────────────────────────────────────────────────────────────
export const FairyLightsGarland = () => {
  const bulbs = [
    { x: '6%', y: 26, delay: '0s' },
    { x: '16%', y: 44, delay: '1.2s' },
    { x: '27%', y: 32, delay: '0.6s' },
    { x: '38%', y: 46, delay: '1.8s' },
    { x: '50%', y: 30, delay: '0.3s' },
    { x: '62%', y: 48, delay: '2.1s' },
    { x: '73%', y: 34, delay: '0.9s' },
    { x: '84%', y: 45, delay: '1.5s' },
    { x: '94%', y: 28, delay: '0.4s' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 75, pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
      {/* Drooping light wire */}
      <svg width="100%" height="75" viewBox="0 0 1000 75" preserveAspectRatio="none" fill="none">
        <path
          d="M0 20 Q125 55 250 25 Q375 60 500 22 Q625 62 750 25 Q875 58 1000 20"
          stroke="rgba(45, 106, 79, 0.35)"
          strokeWidth="1.2"
        />
      </svg>
      {/* Twinkling fairy light bulbs */}
      {bulbs.map((b, i) => (
        <div
          key={i}
          className="fairy-bulb"
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd166 50%, #f4a261 100%)',
            boxShadow: '0 0 10px 3px rgba(255, 209, 102, 0.75)',
            transform: 'translate(-50%, -50%)',
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VINE SPROUT (Little sprouting leaf on timeline connector)
// ─────────────────────────────────────────────────────────────────────────────
export const VineSproutSVG = ({ size = 20, isLeft = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    style={{ transform: isLeft ? 'scaleX(-1)' : 'none' }}
  >
    <path d="M4 26 C10 24 16 18 18 10" stroke="#52b788" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 10 Q28 8 26 18 Q18 20 18 10Z" fill="#52b788" opacity="0.9" />
    <circle cx="20" cy="8" r="2.5" fill="#f4a261" opacity="0.8" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SILK RIBBON BOW (Gift bow with streaming ribbons for Footer)
// ─────────────────────────────────────────────────────────────────────────────
export const RibbonBowSVG = ({ size = 64, color = '#2d6a4f' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Loop */}
    <path
      d="M40 25 C30 10 12 10 15 26 C18 36 32 30 40 26Z"
      fill="#52b788"
      opacity="0.85"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M22 18 Q30 20 36 25" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />

    {/* Right Loop */}
    <path
      d="M40 25 C50 10 68 10 65 26 C62 36 48 30 40 26Z"
      fill="#52b788"
      opacity="0.85"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M58 18 Q50 20 44 25" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />

    {/* Hanging Tails */}
    <path
      d="M37 28 C34 38 28 48 24 55 C27 52 32 53 35 55 C37 46 39 37 40 30Z"
      fill="#40916c"
      opacity="0.9"
    />
    <path
      d="M43 28 C46 38 52 48 56 55 C53 52 48 53 45 55 C43 46 41 37 40 30Z"
      fill="#40916c"
      opacity="0.9"
    />

    {/* Center Knot */}
    <circle cx="40" cy="26" r="6" fill="#1b4332" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <circle cx="40" cy="26" r="3" fill="#f4a261" opacity="0.85" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTANICAL POSTMARK (Vintage postal cachet stamp for Gallery)
// ─────────────────────────────────────────────────────────────────────────────
export const BotanicalPostmarkSVG = ({ size = 70, color = '#2d6a4f' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.65 }}>
    {/* Double wavy circular stamp ring */}
    <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.8" strokeDasharray="5 3" />
    <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="1" />

    {/* Center Rose Silhouette */}
    <path d="M50 36 C55 36 58 40 58 44 C58 50 53 54 50 58 C47 54 42 50 42 44 C42 40 45 36 50 36Z" fill={color} opacity="0.75" />
    <path d="M50 58 L50 64" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

    {/* Circular text simulation bars */}
    <path d="M26 50 L34 50" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M66 50 L74 50" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <text x="50" y="28" textAnchor="middle" fill={color} fontSize="6" fontFamily="sans-serif" letterSpacing="2" fontWeight="bold">GREENHOUSE</text>
    <text x="50" y="78" textAnchor="middle" fill={color} fontSize="5" fontFamily="sans-serif" letterSpacing="1.5">★ FOREVER IN BLOOM ★</text>
  </svg>
);



// ─────────────────────────────────────────────────────────────────────────────
// BUTTERFLY — Vector botanical butterfly (left wing & right wing separated for flap)
// ─────────────────────────────────────────────────────────────────────────────
export const ButterflyLeftWing = ({ size = 38, color = '#52b788' }) => (
  <svg width={size * 1.1} height={size} viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upper left wing */}
    <path d="M28 26 C26 12 10 4 3 10 C-2 15 4 32 18 30 C22 29 27 27 28 26Z"
      fill={color} opacity="0.82" />
    {/* Lower left wing */}
    <path d="M28 28 C22 36 8 44 4 40 C0 36 10 26 20 28 C24 28 27 28 28 28Z"
      fill={color} opacity="0.62" />
    {/* Wing veins */}
    <path d="M28 26 C22 18 12 10 6 12" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <path d="M28 28 C20 34 10 40 6 38" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    {/* Soft highlight */}
    <ellipse cx="16" cy="20" rx="6" ry="4" fill="rgba(255,255,255,0.2)" transform="rotate(-20 16 20)" />
  </svg>
);

export const ButterflyRightWing = ({ size = 38, color = '#52b788' }) => (
  <svg width={size * 1.1} height={size} viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upper right wing */}
    <path d="M27 26 C29 12 45 4 52 10 C57 15 51 32 37 30 C33 29 28 27 27 26Z"
      fill={color} opacity="0.82" />
    {/* Lower right wing */}
    <path d="M27 28 C33 36 47 44 51 40 C55 36 45 26 35 28 C31 28 28 28 27 28Z"
      fill={color} opacity="0.62" />
    {/* Wing veins */}
    <path d="M27 26 C33 18 43 10 49 12" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <path d="M27 28 C35 34 45 40 49 38" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    <ellipse cx="39" cy="20" rx="6" ry="4" fill="rgba(255,255,255,0.2)" transform="rotate(20 39 20)" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// WATERCOLOR WASH DIVIDER — botanical pastel watercolor wash SVG strip
// ─────────────────────────────────────────────────────────────────────────────
export const WatercolorDividerSVG = ({ flip = false }) => (
  <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
    style={{ width: '100%', height: 96, display: 'block', transform: flip ? 'scaleY(-1)' : 'none' }}
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="wcblur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <linearGradient id="wc1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#c8e6c9" stopOpacity="0.0" />
        <stop offset="15%"  stopColor="#a5d6a7" stopOpacity="0.55" />
        <stop offset="45%"  stopColor="#dcedc8" stopOpacity="0.72" />
        <stop offset="70%"  stopColor="#b2dfdb" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#c8e6c9" stopOpacity="0.0" />
      </linearGradient>
      <linearGradient id="wc2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#f8bbd0" stopOpacity="0.0" />
        <stop offset="25%"  stopColor="#f48fb1" stopOpacity="0.28" />
        <stop offset="55%"  stopColor="#fff9c4" stopOpacity="0.35" />
        <stop offset="80%"  stopColor="#f48fb1" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#f8bbd0" stopOpacity="0.0" />
      </linearGradient>
    </defs>
    {/* Main green botanical wash */}
    <path d="M0,55 C180,20 360,80 540,50 C720,22 900,70 1080,45 C1260,22 1380,58 1440,44 L1440,96 L0,96Z"
      fill="url(#wc1)" filter="url(#wcblur)" />
    {/* Rose blush accent wash */}
    <path d="M0,68 C220,40 440,85 660,62 C880,40 1100,72 1320,55 C1380,50 1420,60 1440,58 L1440,96 L0,96Z"
      fill="url(#wc2)" filter="url(#wcblur)" opacity="0.7" />
    {/* Scattered botanical specks */}
    {[80,230,410,590,740,900,1060,1220,1380].map((x, i) => (
      <ellipse key={i} cx={x} cy={60 + (i % 3) * 8} rx={3 + i % 4} ry={2}
        fill={i % 2 === 0 ? 'rgba(82,183,136,0.3)' : 'rgba(244,143,177,0.25)'}
        filter="url(#wcblur)" />
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// DANDELION SEED — single floating seed with wisp filaments
// ---------------------------------------------------------------------------
export const DandelionSeedSVG = ({ size = 28, opacity = 0.72 }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 28 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    <line x1="14" y1="44" x2="14" y2="24" stroke="#2d6a4f" strokeWidth="0.8" strokeLinecap="round"/>
    <ellipse cx="14" cy="24" rx="2" ry="3" fill="#52b788" opacity="0.85"/>
    {[[-6,-12],[-3,-14],[0,-15],[3,-14],[6,-12],[-4,-10],[4,-10],[-2,-9],[2,-9]].map(([dx,dy],i) => (
      <g key={i}>
        <line x1="14" y1="24" x2={14+dx} y2={24+dy} stroke="rgba(82,183,136,0.65)" strokeWidth="0.5" strokeLinecap="round"/>
        <circle cx={14+dx} cy={24+dy} r="1.2" fill="rgba(255,255,255,0.8)" stroke="rgba(82,183,136,0.5)" strokeWidth="0.4"/>
      </g>
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// SMALL LEAF — tiny fallen leaf for litter scatter
// ---------------------------------------------------------------------------
export const SmallLeafSVG = ({ size = 16, color = '#52b788', rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}>
    <path d="M12 22 C12 22 4 16 4 10 C4 6 7 3 12 3 C17 3 20 6 20 10 C20 16 12 22 12 22Z"
      fill={color} opacity="0.75"/>
    <path d="M12 22 L12 3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M12 12 L7 9" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" strokeLinecap="round"/>
    <path d="M12 12 L17 9" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" strokeLinecap="round"/>
    <path d="M12 16 L8 14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeLinecap="round"/>
    <path d="M12 16 L16 14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeLinecap="round"/>
  </svg>
);

// ---------------------------------------------------------------------------
// INK BRUSH STROKE — wide horizontal calligraphic brush sweep SVG
// ---------------------------------------------------------------------------
export const InkBrushStrokeSVG = ({ width = 340, color = '#2d6a4f' }) => (
  <svg width={width} height={40} viewBox="0 0 340 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,22 C50,8 100,28 160,20 C220,12 280,28 330,18"
      stroke={color} strokeWidth="14" strokeLinecap="round" opacity="0.18"
      strokeLinejoin="round" fill="none"/>
    <path d="M18,25 C60,14 110,30 170,22 C230,15 285,30 325,20"
      stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.12"
      strokeLinejoin="round" fill="none"/>
    <path d="M0,20 C40,6 120,32 200,18 C280,5 320,24 340,16"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.08"
      strokeLinejoin="round" fill="none" strokeDasharray="3 8"/>
  </svg>
);

// ---------------------------------------------------------------------------
// THORN VINE BORDER — decorative SVG rose thorn vine that grows around cards
// ---------------------------------------------------------------------------
export const ThornVineSVG = ({ width = 300, height = 200, animated = false }) => (
  <svg className="thorn-vine-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    {/* Main vine path */}
    <path className={`thorn-vine-path${animated ? ' animated' : ''}`}
      d={`M8,8 C${width*0.25},${height*0.05} ${width*0.5},${height*0.92} ${width*0.75},${height*0.08} C${width*0.88},${height*0.04} ${width-8},${height*0.12} ${width-8},${height*0.2}`}
    />
    {/* Thorn spikes — small lines branching off the vine */}
    {[0.18, 0.32, 0.48, 0.64, 0.78].map((t, i) => {
      const x = width * t;
      const y = i % 2 === 0 ? height * 0.3 : height * 0.7;
      const dir = i % 2 === 0 ? -1 : 1;
      return (
        <g key={i} opacity="0.35">
          <line x1={x} y1={y} x2={x + 6 * dir} y2={y - 8} stroke="#1a3a2c" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1={x} y1={y} x2={x - 4 * dir} y2={y - 6} stroke="#1a3a2c" strokeWidth="0.8" strokeLinecap="round"/>
          {/* Tiny leaf bud */}
          <ellipse cx={x + 7*dir} cy={y - 9} rx="2.5" ry="1.5" fill="#52b788" opacity="0.6"
            transform={`rotate(${i % 2 === 0 ? -35 : 35} ${x + 7*dir} ${y-9})`}/>
        </g>
      );
    })}
    {/* Small rose buds on vine */}
    {[0.28, 0.62].map((t, i) => {
      const x = width * t;
      const y = i === 0 ? height * 0.2 : height * 0.75;
      return (
        <g key={i} opacity="0.5">
          <circle cx={x} cy={y} r="5" fill="#e63946"/>
          <path d={`M${x-3},${y} Q${x},${y-5} ${x+3},${y} Q${x},${y-2} ${x-3},${y}Z`} fill="#c1121f"/>
          <circle cx={x} cy={y} r="2" fill="#9d0208"/>
        </g>
      );
    })}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// ENCHANTED ROSE IN GLASS DOME SVG
// ─────────────────────────────────────────────────────────────────────────────
export const EnchantedRoseDomeSVG = ({ width = 160, height = 220, petalsRemaining = 5 }) => {
  // Fallen petals increase as petalsRemaining decreases (5 - petalsRemaining)
  const fallenCount = 5 - petalsRemaining;

  return (
    <svg width={width} height={height} viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="enchanted-dome-glow">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)"/>
          <stop offset="25%" stopColor="rgba(255,255,255,0.15)"/>
          <stop offset="70%" stopColor="rgba(216,243,220,0.2)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.5)"/>
        </linearGradient>
        <radialGradient id="magicGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={petalsRemaining > 0 ? "rgba(255, 90, 130, 0.55)" : "rgba(255, 200, 100, 0.55)"}/>
          <stop offset="50%" stopColor={petalsRemaining > 0 ? "rgba(230, 57, 70, 0.25)" : "rgba(255, 150, 50, 0.2)"}/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="woodBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8d5b4c"/>
          <stop offset="50%" stopColor="#5c3a21"/>
          <stop offset="100%" stopColor="#3d2314"/>
        </linearGradient>
      </defs>

      {/* Magic Ambient Glow Behind Rose */}
      <circle cx="80" cy="110" r="50" fill="url(#magicGlow)"/>

      {/* Wooden Pedestal Base */}
      <rect x="20" y="195" width="120" height="14" rx="7" fill="url(#woodBase)" stroke="#2b180d" strokeWidth="1"/>
      <rect x="14" y="205" width="132" height="10" rx="5" fill="#2d180e"/>

      {/* Rose Stem inside Dome */}
      <path d="M80 188 C78 155 86 140 78 115" stroke="#2d6a4f" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      {/* Leaves */}
      <path d="M79 160 C90 152 94 158 87 165 C82 165 79 162 79 160Z" fill="#40916c"/>
      <path d="M78 140 C66 135 64 142 71 146 C76 146 78 143 78 140Z" fill="#52b788"/>

      {/* Rose Flower Center - dynamically scales/changes with petalsRemaining */}
      <g transform="translate(78, 108)" style={{ transition: 'all 0.5s ease' }}>
        {/* Core bud */}
        <circle cx="0" cy="0" r={8 + petalsRemaining * 1.2} fill="#c1121f"/>
        
        {/* Petal layers that disappear as petalsRemaining decreases */}
        {petalsRemaining >= 1 && (
          <ellipse cx="0" cy="-2" rx={5 + petalsRemaining} ry={7 + petalsRemaining} fill="#e63946" opacity="0.95"/>
        )}
        {petalsRemaining >= 2 && (
          <ellipse cx="-5" cy="-3" rx="8" ry="12" fill="#d62828" transform="rotate(-25)" opacity="0.92"/>
        )}
        {petalsRemaining >= 3 && (
          <ellipse cx="5" cy="-3" rx="8" ry="12" fill="#e63946" transform="rotate(25)" opacity="0.92"/>
        )}
        {petalsRemaining >= 4 && (
          <ellipse cx="-7" cy="2" rx="10" ry="7" fill="#a4161a" transform="rotate(-15)" opacity="0.88"/>
        )}
        {petalsRemaining >= 5 && (
          <ellipse cx="7" cy="2" rx="10" ry="7" fill="#a4161a" transform="rotate(15)" opacity="0.88"/>
        )}

        <circle cx="0" cy="-1" r="4" fill="#e63946"/>
        <circle cx="1" cy="-2" r="2" fill="#ff758f"/>
      </g>

      {/* Fallen Petals on the Base - dynamically accumulating */}
      {fallenCount >= 1 && (
        <ellipse cx="60" cy="193" rx="7" ry="3" fill="#e63946" opacity="0.92" transform="rotate(-15 60 193)"/>
      )}
      {fallenCount >= 2 && (
        <ellipse cx="98" cy="194" rx="8" ry="3.5" fill="#c1121f" opacity="0.9" transform="rotate(25 98 194)"/>
      )}
      {fallenCount >= 3 && (
        <ellipse cx="76" cy="195" rx="6.5" ry="3" fill="#d62828" opacity="0.88" transform="rotate(5 76 195)"/>
      )}
      {fallenCount >= 4 && (
        <ellipse cx="48" cy="192" rx="7.5" ry="3" fill="#a4161a" opacity="0.85" transform="rotate(-30 48 192)"/>
      )}
      {fallenCount >= 5 && (
        <ellipse cx="110" cy="193" rx="7" ry="3" fill="#e63946" opacity="0.9" transform="rotate(40 110 193)"/>
      )}

      {/* Floating Active Magic Petal */}
      <g className="floating-petal-slow" style={{ opacity: petalsRemaining > 0 ? 0.95 : 0.3 }}>
        <path d="M96 135 C101 131 106 134 103 140 C100 144 94 141 96 135Z" fill="#e63946"/>
        <circle cx="100" cy="136" r="1.5" fill="#fff" opacity="0.8"/>
      </g>

      {/* Floating Magic Sparkles inside Glass */}
      <circle cx="68" cy="120" r="1.5" fill="#fff" opacity="0.75" />
      <circle cx="92" cy="95" r="1.8" fill="#ffd166" opacity="0.8" />
      <circle cx="74" cy="80" r="1.2" fill="#ff758f" opacity="0.7" />

      {/* Glass Bell Dome Cover */}
      <path d="M28 195 L28 85 C28 40 50 18 80 18 C110 18 132 40 132 85 L132 195 Z" 
            fill="url(#glassGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />

      {/* Top Glass Finial Knob */}
      <circle cx="80" cy="14" r="7" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>

      {/* Glass Highlight Reflections */}
      <path d="M36 80 C36 50 50 32 72 26" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M38 95 L38 185" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M125 90 L125 180" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROSE VINYL RECORD SVG
// ─────────────────────────────────────────────────────────────────────────────
export const RoseVinylRecordSVG = ({ size = 110, isPlaying = false }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={`vinyl-spin${isPlaying ? '' : ' paused'}`}>
    {/* Vinyl Disc Body */}
    <circle cx="60" cy="60" r="56" fill="#141414" stroke="#2a2a2a" strokeWidth="2"/>
    
    {/* Vinyl Grooves */}
    <circle cx="60" cy="60" r="48" fill="none" stroke="#222" strokeWidth="1"/>
    <circle cx="60" cy="60" r="42" fill="none" stroke="#1c1c1c" strokeWidth="1.5"/>
    <circle cx="60" cy="60" r="36" fill="none" stroke="#262626" strokeWidth="1"/>
    <circle cx="60" cy="60" r="30" fill="none" stroke="#1f1f1f" strokeWidth="1.2"/>

    {/* Label Center (Rose Petal Red) */}
    <circle cx="60" cy="60" r="22" fill="#c1121f" stroke="#e63946" strokeWidth="1.5"/>
    
    {/* Rose Centerpiece on Label */}
    <circle cx="60" cy="60" r="10" fill="#780000"/>
    <path d="M60 52 C64 56 65 64 60 68 C55 64 56 56 60 52Z" fill="#e63946" opacity="0.9"/>
    <path d="M53 60 C57 56 63 56 67 60 C63 65 57 65 53 60Z" fill="#ff758f" opacity="0.8"/>
    
    {/* Spindle hole */}
    <circle cx="60" cy="60" r="4" fill="#ffffff"/>
    <circle cx="60" cy="60" r="2.5" fill="#000000"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROSE TIME CAPSULE / MESSAGE JAR SVG
// ─────────────────────────────────────────────────────────────────────────────
export const TimeCapsuleJarSVG = ({ width = 140, height = 180 }) => (
  <svg width={width} height={height} viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="jarGlass" x1="0" y1="0" x2="140" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.85)"/>
        <stop offset="30%" stopColor="rgba(255,255,255,0.2)"/>
        <stop offset="70%" stopColor="rgba(216,243,220,0.3)"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0.6)"/>
      </linearGradient>
      <linearGradient id="corkGrad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#b38758"/>
        <stop offset="50%" stopColor="#cf9d67"/>
        <stop offset="100%" stopColor="#9c6c37"/>
      </linearGradient>
    </defs>

    {/* Cork Stopper */}
    <polygon points="45,18 95,18 90,32 50,32" fill="url(#corkGrad)" stroke="#7a4e23" strokeWidth="1"/>
    
    {/* Twine Bow around neck */}
    <rect x="42" y="32" width="56" height="6" rx="3" fill="#8d5b4c"/>
    <circle cx="70" cy="38" r="4" fill="#e63946"/>

    {/* Glass Jar Body */}
    <path d="M46,38 C32,48 24,70 24,100 C24,150 36,170 70,170 C104,170 116,150 116,100 C116,70 108,48 94,38 Z"
          fill="url(#jarGlass)" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"/>

    {/* Floating Message Parchment Scrolls inside */}
    <g transform="translate(48, 110) rotate(-18)">
      <rect x="0" y="0" width="16" height="34" rx="4" fill="#fff8e7" stroke="#d4af37" strokeWidth="1"/>
      <line x1="3" y1="8" x2="13" y2="8" stroke="#b08d57" strokeWidth="1"/>
      <line x1="3" y1="16" x2="13" y2="16" stroke="#b08d57" strokeWidth="1"/>
      <line x1="3" y1="24" x2="10" y2="24" stroke="#b08d57" strokeWidth="1"/>
    </g>

    <g transform="translate(74, 98) rotate(14)">
      <rect x="0" y="0" width="16" height="38" rx="4" fill="#fdf2e9" stroke="#e63946" strokeWidth="1"/>
      <circle cx="8" cy="10" r="3" fill="#c1121f"/>
      <line x1="3" y1="20" x2="13" y2="20" stroke="#c1121f" strokeWidth="1" strokeDasharray="2 1"/>
      <line x1="3" y1="28" x2="11" y2="28" stroke="#c1121f" strokeWidth="1" strokeDasharray="2 1"/>
    </g>

    <g transform="translate(60, 130) rotate(70)">
      <rect x="0" y="0" width="14" height="32" rx="4" fill="#fffdfa" stroke="#52b788" strokeWidth="1"/>
      <line x1="3" y1="8" x2="11" y2="8" stroke="#2d6a4f" strokeWidth="1"/>
    </g>

    {/* Dried Rose Petals resting inside at bottom */}
    <ellipse cx="50" cy="158" rx="8" ry="4" fill="#e63946" opacity="0.9" transform="rotate(-12 50 158)"/>
    <ellipse cx="88" cy="160" rx="9" ry="4.5" fill="#c1121f" opacity="0.85" transform="rotate(20 88 160)"/>
    <ellipse cx="70" cy="163" rx="10" ry="4" fill="#9d0208" opacity="0.9"/>

    {/* Sparkle glints on glass */}
    <circle cx="40" cy="75" r="2" fill="#fff" opacity="0.9"/>
    <path d="M34,85 C32,110 34,140 44,155" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M106,75 C108,105 106,135 98,155" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);
