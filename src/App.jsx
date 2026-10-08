import React, {
  useEffect, useState, useRef, useMemo, useCallback, memo
} from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform,
  useMotionValue, useSpring, useReducedMotion
} from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, Music, Play, Pause, Volume2, Sparkles, Feather } from 'lucide-react';
import {
  RoseIcon, RoseBudIcon, DaisyIcon, LeafBranchIcon, SparkleIcon,
  HeartLeafIcon, GreenhouseIcon, FloralDivider, CalendarHeartIcon,
  ClockLeafIcon, InfinityIcon, BotanicalEnvelopeIcon, RosePetalSVG,
  VineCornerSVG, GreenhouseArchSVG, PressedFlowerSVG,
  WaxSealSVG, FairyLightsGarland, VineSproutSVG, RibbonBowSVG,
  BotanicalPostmarkSVG, ButterflyLeftWing, ButterflyRightWing, WatercolorDividerSVG,
  DandelionSeedSVG, SmallLeafSVG, InkBrushStrokeSVG, ThornVineSVG,
  EnchantedRoseDomeSVG, RoseVinylRecordSVG
} from './SVGAssets';

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = { deep: '#1a3a2c', mid: '#2d6a4f', light: '#52b788', pale: '#d8f3dc' };
const glass = {
  background: 'rgba(255,255,255,0.38)', backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.62)',
  boxShadow: '0 8px 32px rgba(45,106,79,0.1), inset 0 1px 0 rgba(255,255,255,0.7)',
};
const glassStrong = {
  background: 'rgba(255,255,255,0.52)', backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 12px 48px rgba(45,106,79,0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
};

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
const ScrollProgressBar = () => {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (barRef.current) barRef.current.style.width = `${progress * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div id="scroll-bar" ref={barRef} style={{ width: '0%' }}>
      <div id="scroll-bar-tip" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────────────────────────
const LoadingScreen = memo(({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => { setOut(true); setTimeout(onDone, 700); }, 250);
          return 100;
        }
        return Math.min(p + 3, 100);
      });
    }, 30);
    return () => clearInterval(t);
  }, [onDone]);

  const petals = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    angle: i * 45,
    color: `rgba(255,${80 + i * 14},${100 + i * 6},0.88)`,
    delay: i * 0.06,
  })), []);

  return (
    <AnimatePresence>
      {!out && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'linear-gradient(135deg,#eef7f1,#c8e6d4 50%,#e0f0e5)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
          {/* Blooming rose */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'relative', width: 110, height: 110, marginBottom: 32 }}>
            {petals.map((p, i) => (
              <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: p.delay }}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 32, height: 52, background: p.color,
                  borderRadius: '50% 50% 40% 40%', transformOrigin: '50% 100%',
                  transform: `translateX(-50%) translateY(-100%) rotate(${p.angle}deg)`,
                  willChange: 'transform',
                }} />
            ))}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', width: 24, height: 24,
              borderRadius: '50%', background: 'radial-gradient(circle,#ffd166,#f4a261)',
              transform: 'translate(-50%,-50%)',
              boxShadow: '0 0 12px rgba(244,162,97,0.7)',
            }} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Great Vibes',cursive", fontSize: '2.4rem', color: C.mid, marginBottom: 28 }}>
            The Digital Greenhouse
          </motion.p>

          <div style={{ width: 180, height: 3, background: 'rgba(45,106,79,0.15)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: `linear-gradient(90deg,${C.light},${C.mid})`,
              borderRadius: 999, transition: 'width 0.04s linear',
            }} />
          </div>
          <p style={{ marginTop: 10, fontSize: '0.68rem', color: C.mid, opacity: 0.5, letterSpacing: '0.18em' }}>
            PLANTING YOUR MEMORIES…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR SPARKLE — optimized (fewer particles, RAF-throttled)
// ─────────────────────────────────────────────────────────────────────────────
const CursorSparkle = memo(() => {
  const shouldReduce = useReducedMotion();
  const [sparks, setSparks] = useState([]);
  const [bursts, setBursts] = useState([]);
  const pending = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduce) return;
    const onMove = (e) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      if (pending.current) return;
      pending.current = true;
      requestAnimationFrame(() => {
        pending.current = false;
        const id = Math.random();
        setSparks(s => [...s.slice(-12), {
          id, x: lastPos.current.x, y: lastPos.current.y,
          size: 4 + Math.random() * 6,
          hue: 100 + Math.random() * 80,
          vx: (Math.random() - 0.5) * 40,
          vy: -15 - Math.random() * 30,
        }]);
        setTimeout(() => setSparks(s => s.filter(sp => sp.id !== id)), 700);
      });
    };

    const onClick = (e) => {
      const clickId = Math.random();
      const count = 7;
      const newBurst = Array.from({ length: count }, (_, i) => ({
        id: `${clickId}-${i}`,
        x: e.clientX,
        y: e.clientY,
        size: 14 + Math.random() * 8,
        vx: (Math.cos((i * 2 * Math.PI) / count) * 45) + (Math.random() - 0.5) * 20,
        vy: (Math.sin((i * 2 * Math.PI) / count) * 45) - 30 - Math.random() * 30,
        rot: (Math.random() - 0.5) * 120,
        isHeart: i % 2 === 0,
      }));
      setBursts(b => [...b.slice(-20), ...newBurst]);
      setTimeout(() => {
        setBursts(b => b.filter(item => !item.id.startsWith(`${clickId}-`)));
      }, 950);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9000 }}>
      {/* Gentle trail */}
      {sparks.map(sp => (
        <motion.div key={sp.id}
          initial={{ x: sp.x, y: sp.y, scale: 1, opacity: 0.85 }}
          animate={{ x: sp.x + sp.vx, y: sp.y + sp.vy, scale: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            position: 'fixed', width: sp.size, height: sp.size, borderRadius: '50%',
            background: `radial-gradient(circle,hsla(${sp.hue},65%,68%,1) 0%,transparent 70%)`,
            marginLeft: -sp.size / 2, marginTop: -sp.size / 2, pointerEvents: 'none',
            willChange: 'transform, opacity',
          }} />
      ))}

      {/* Click burst: floating heart & petal icons */}
      {bursts.map(b => (
        <motion.div key={b.id}
          initial={{ x: b.x, y: b.y, scale: 0.3, opacity: 1, rotate: 0 }}
          animate={{ x: b.x + b.vx, y: b.y + b.vy, scale: 1.1, opacity: 0, rotate: b.rot }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'fixed', marginLeft: -b.size / 2, marginTop: -b.size / 2,
            pointerEvents: 'none', willChange: 'transform, opacity',
          }}>
          {b.isHeart ? (
            <HeartLeafIcon size={b.size} color="#e63946" style={{ filter: 'drop-shadow(0 2px 6px rgba(230,57,70,0.4))' }} />
          ) : (
            <RosePetalSVG size={b.size * 0.9} color="#c1121f" opacity={0.9} />
          )}
        </motion.div>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// FIREFLIES — pure CSS, fewer, no JS re-renders
// ─────────────────────────────────────────────────────────────────────────────
const Fireflies = memo(() => {
  const shouldReduce = useReducedMotion();
  const flies = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 3 + Math.random() * 4,
    dur: 5 + Math.random() * 7,
    delay: Math.random() * 8,
    hue: 90 + Math.random() * 60,
    dx: (Math.random() - 0.5) * 100,
    dy: (Math.random() - 0.5) * 100,
  })), []);

  if (shouldReduce) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      {flies.map(f => (
        <motion.div key={f.id}
          animate={{ x: [0, f.dx, -f.dy * 0.4, 0], y: [0, f.dy, f.dx * 0.3, 0], opacity: [0, 0.85, 0.5, 0] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          style={{
            position: 'fixed', left: `${f.x}vw`, top: `${f.y}vh`,
            width: f.size, height: f.size, borderRadius: '50%',
            background: `hsla(${f.hue},78%,70%,0.95)`,
            boxShadow: `0 0 ${f.size * 3}px ${f.size}px hsla(${f.hue},78%,70%,0.35)`,
            willChange: 'transform, opacity',
          }} />
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// POLLEN — pure CSS, minimal count
// ─────────────────────────────────────────────────────────────────────────────
const PollenParticles = memo(() => {
  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 7 + 3) % 95}vw`,
    size: 4 + (i % 5),
    duration: `${12 + (i % 5) * 4}s`,
    delay: `${-(i * 1.3)}s`,
    hue: 110 + (i % 5) * 12,
  })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} className="pollen" style={{
          left: p.left, width: p.size, height: p.size,
          background: `radial-gradient(circle,hsla(${p.hue},50%,76%,0.85) 0%,transparent 70%)`,
          animationDuration: p.duration, animationDelay: p.delay,
        }} />
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// FALLING ROSE PETALS — GPU CSS animated, lightweight
// ─────────────────────────────────────────────────────────────────────────────
const FallingPetals = memo(() => {
  const petals = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${(i * 10 + 4) % 92}vw`,
    size: 16 + (i % 4) * 4,
    duration: `${8 + (i % 5) * 2.2}s`,
    delay: `${-(i * 1.4)}s`,
    sway: `${(i % 2 === 0 ? 1 : -1) * (40 + (i % 4) * 18)}px`,
    rot: `${180 + (i % 4) * 90}deg`,
    opacity: 0.72 + (i % 3) * 0.1,
  })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {petals.map(p => (
        <div
          key={p.id}
          className="falling-petal"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--sway-x': p.sway,
            '--rot': p.rot,
          }}
        >
          <RosePetalSVG size={p.size} opacity={p.opacity} color={p.id % 2 === 0 ? '#e63946' : '#c1121f'} />
        </div>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// VELLUM PAPER OVERLAY — aged paper texture fixed over entire page
// ─────────────────────────────────────────────────────────────────────────────
const VellumOverlay = memo(() => (
  <div className="vellum-overlay" aria-hidden="true" />
));

// ─────────────────────────────────────────────────────────────────────────────
// INK BLOBS — morphing organic background blobs in Hero
// ─────────────────────────────────────────────────────────────────────────────
const InkBlobs = memo(() => (
  <>
    <div className="ink-blob ink-blob-1" style={{ top: '8%', left: '-8%' }} />
    <div className="ink-blob ink-blob-2" style={{ top: '18%', right: '-6%' }} />
  </>
));

// ─────────────────────────────────────────────────────────────────────────────
// STARFIELD BOKEH — parallax bokeh stars
// ─────────────────────────────────────────────────────────────────────────────
const StarfieldBokeh = memo(() => {
  const stars = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: `${(i * 4.7 + 2) % 96}vw`,
    y: `${(i * 6.1 + 5) % 88}vh`,
    size: 2 + (i % 4),
    dur: `${3 + (i % 5) * 1.2}s`,
    delay: `${-(i * 0.8)}s`,
    baseOp: 0.15 + (i % 4) * 0.08,
    peakOp: 0.55 + (i % 3) * 0.2,
    hue: 130 + (i % 6) * 15,
  })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {stars.map(s => (
        <div key={s.id} className="star-bokeh" style={{
          left: s.x, top: s.y,
          width: s.size, height: s.size,
          background: `radial-gradient(circle, hsla(${s.hue},80%,85%,0.95) 0%, transparent 70%)`,
          '--star-dur': s.dur,
          '--star-delay': s.delay,
          '--star-base-op': s.baseOp,
          '--star-peak-op': s.peakOp,
          boxShadow: `0 0 ${s.size * 3}px hsla(${s.hue},80%,80%,0.5)`,
        }} />
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// DRIFTING BUTTERFLIES — 3 independent SVG butterflies gliding across screen
// ─────────────────────────────────────────────────────────────────────────────
const DriftingButterflies = memo(() => {
  const butterflies = useMemo(() => [
    { id: 0, top: '22vh', dur: 38, delay: 0,    color: '#52b788', flapDur: '0.55s', size: 32 },
    { id: 1, top: '55vh', dur: 52, delay: -18,  color: '#c1121f', flapDur: '0.42s', size: 26 },
    { id: 2, top: '38vh', dur: 44, delay: -8,   color: '#f4a261', flapDur: '0.65s', size: 22 },
  ], []);

  return (
    <>
      {butterflies.map(b => (
        <div key={b.id} className="butterfly-wrap" style={{
          top: b.top, left: '-120px',
          animation: `butterflyDrift ${b.dur}s linear ${b.delay}s infinite`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="butterfly-wing-left" style={{ '--flap-dur': b.flapDur }}>
              <ButterflyLeftWing size={b.size} color={b.color} />
            </div>
            {/* Tiny body */}
            <div style={{
              width: 3, height: b.size * 0.55, borderRadius: 4,
              background: b.color, opacity: 0.7, flexShrink: 0,
            }} />
            <div className="butterfly-wing-right" style={{ '--flap-dur': b.flapDur }}>
              <ButterflyRightWing size={b.size} color={b.color} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CANDLE FLICKERING AMBIANCE — pair of candles on hero section
// ─────────────────────────────────────────────────────────────────────────────
const CandlePair = memo(({ style = {} }) => (
  <div style={{ display: 'flex', gap: 20, ...style }}>
    {[{ h: 40, delay: '0s' }, { h: 30, delay: '-0.9s' }].map((c, i) => (
      <div key={i} className="candle-wrap" style={{ position: 'relative' }}>
        <div className="candle-glow" />
        <div className="candle-flame" style={{ animationDelay: c.delay }} />
        <div className="candle-body" style={{ height: c.h }} />
      </div>
    ))}
  </div>
));

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING DANDELION SEEDS — wispy seeds drifting upward across page
// ─────────────────────────────────────────────────────────────────────────────
const FloatingDandelionSeeds = memo(() => {
  const seeds = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${(i * 12 + 5) % 90}vw`,
    size: 22 + (i % 3) * 6,
    dur: `${13 + (i % 5) * 3}s`,
    delay: `${-(i * 2.1)}s`,
    swayX: `${(i % 2 === 0 ? 1 : -1) * (25 + (i % 4) * 12)}px`,
    rot: `${120 + i * 40}deg`,
    opacity: 0.55 + (i % 3) * 0.12,
  })), []);

  return (
    <>
      {seeds.map(s => (
        <div key={s.id} className="dandelion-seed" style={{
          left: s.left,
          '--dur': s.dur,
          '--delay': s.delay,
          '--sway-x': s.swayX,
          '--rot': s.rot,
        }}>
          <DandelionSeedSVG size={s.size} opacity={s.opacity} />
        </div>
      ))}
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CONSTELLATION SVG — bokeh star connector lines forming flower silhouettes
// ─────────────────────────────────────────────────────────────────────────────
const ConstellationLines = memo(() => {
  // Two flower-shaped constellations connected by dotted lines
  const flowers = useMemo(() => [
    { cx: 18, cy: 22, r: 8, petals: 6, delay: '0s' },
    { cx: 78, cy: 62, r: 6, petals: 5, delay: '-3s' },
  ], []);

  return (
    <svg className="constellation-svg" aria-hidden="true">
      {flowers.map((f, fi) => {
        const pts = Array.from({ length: f.petals }, (_, i) => {
          const a = (i * 2 * Math.PI) / f.petals;
          return {
            x: (f.cx + Math.cos(a) * f.r) + 'vw',
            y: (f.cy + Math.sin(a) * f.r) + 'vh',
            cx: f.cx + 'vw',
            cy: f.cy + 'vh',
          };
        });
        return pts.map((p, i) => (
          <line key={`${fi}-${i}`}
            x1={p.cx} y1={p.cy}
            x2={p.x} y2={p.y}
            className="constellation-line"
            style={{ animationDelay: `${fi * 1.2 + i * 0.4}s` }}
          />
        ));
      })}
    </svg>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// LEAF LITTER FLOOR — scattered fallen leaves at bottom of Gallery section
// ─────────────────────────────────────────────────────────────────────────────
const LeafLitterFloor = memo(() => {
  const leaves = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${(i * 10 + 2) % 94}%`,
    size: 10 + (i % 4) * 4,
    color: ['#52b788','#2d6a4f','#74c69d','#40916c','#95d5b2'][i % 5],
    rot: -25 + (i * 11) % 55,
    delay: `${i * 0.15}s`,
  })), []);

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, pointerEvents: 'none', overflow: 'hidden' }}>
      {leaves.map(l => (
        <div key={l.id} className="leaf-litter" style={{
          left: l.left,
          animationDelay: l.delay,
          '--leaf-rot-start': `${l.rot - 8}deg`,
          '--leaf-rot-end': `${l.rot}deg`,
        }}>
          <SmallLeafSVG size={l.size} color={l.color} rotate={l.rot} />
        </div>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// ROSE PETAL CLICK BURST — burst of petals from click position
// ─────────────────────────────────────────────────────────────────────────────
const usePetalBurst = () => {
  const [bursts, setBursts] = useState([]);
  const triggerBurst = useCallback((x, y) => {
    const id = Date.now();
    const petals = Array.from({ length: 8 }, (_, i) => ({
      id: `${id}-${i}`,
      x, y,
      bx: `${(Math.cos((i / 8) * Math.PI * 2) * (40 + Math.random() * 55)).toFixed(0)}px`,
      by: `${(-50 - Math.random() * 60).toFixed(0)}px`,
      br: `${Math.random() * 360}deg`,
      bdur: `${0.7 + Math.random() * 0.5}s`,
      color: i % 3 === 0 ? '#e63946' : i % 3 === 1 ? '#c1121f' : '#f4a261',
      size: 10 + Math.random() * 8,
    }));
    setBursts(b => [...b, ...petals]);
    setTimeout(() => setBursts(b => b.filter(p => !p.id.startsWith(id))), 1600);
  }, []);
  return { bursts, triggerBurst };
};

const PetalBurstLayer = memo(({ bursts }) => (
  <>
    {bursts.map(p => (
      <div key={p.id} className="burst-petal" style={{
        left: p.x, top: p.y,
        '--bx': p.bx, '--by': p.by, '--br': p.br, '--bdur': p.bdur,
      }}>
        <RosePetalSVG size={p.size} color={p.color} opacity={0.88} />
      </div>
    ))}
  </>
));

// ─────────────────────────────────────────────────────────────────────────────
// ROSE DEW DROPS — glistening water drops rolling on glass surface
// ─────────────────────────────────────────────────────────────────────────────
const RoseDewDrops = memo(() => (
  <>
    {[
      { top: 22, left: 18, w: 5, h: 7, dur: '5s', delay: '0s', roll: '32px' },
      { top: 35, left: 68, w: 4, h: 6, dur: '6.5s', delay: '-2s', roll: '28px' },
      { top: 14, left: 42, w: 3, h: 5, dur: '4.2s', delay: '-1s', roll: '24px' },
      { top: 52, left: 82, w: 6, h: 8, dur: '7s', delay: '-3.5s', roll: '36px' },
    ].map((d, i) => (
      <div key={i} className="rose-dew" style={{
        top: `${d.top}%`, left: `${d.left}%`,
        width: d.w, height: d.h,
        '--ddur': d.dur, '--ddelay': d.delay, '--droll': d.roll,
      }} />
    ))}
  </>
));

// ─────────────────────────────────────────────────────────────────────────────
// MICRO ROSE HEADING — rose buds that bloom beside section headings
// ─────────────────────────────────────────────────────────────────────────────
const BloomRoseBud = memo(({ size = 22, delay = 0 }) => {
  const [bloomed, setBloomed] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setBloomed(true), delay); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <span ref={ref} className={bloomed ? 'micro-rose-bloom' : ''}
      style={{ display: 'inline-block', opacity: bloomed ? 1 : 0, verticalAlign: 'middle' }}>
      <RoseBudIcon size={size} />
    </span>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// WAVE DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
const WaveDivider = memo(({ flip = false, color = 'rgba(200,232,215,0.7)' }) => (
  <div style={{ position: 'relative', height: 80, overflow: 'hidden', transform: flip ? 'scaleY(-1)' : 'none', margin: '-1px 0' }}>
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'flex', width: '200%', height: '100%', willChange: 'transform' }}>
      {[0, 1].map(k => (
        <svg key={k} viewBox="0 0 1440 80" preserveAspectRatio="none"
          style={{ width: '50%', height: '100%', flexShrink: 0 }}>
          <path d="M0,35 C200,75 400,5 600,35 C800,65 1000,5 1200,35 C1350,55 1440,20 1440,35 L1440,80 L0,80 Z"
            fill={color} />
        </svg>
      ))}
    </motion.div>
  </div>
));

// ─────────────────────────────────────────────────────────────────────────────
// SVG ROSE — blooms on scroll
// ─────────────────────────────────────────────────────────────────────────────
const RosePetal = memo(({ progress, d, start, index }) => {
  const op = useTransform(progress, [start, start + 0.32], [0, 1]);
  const sc = useTransform(progress, [start, start + 0.32], [0.1, 1]);
  return (
    <motion.path
      d={d}
      fill={`hsla(${344 + index * 3},72%,${52 + index * 2}%,0.87)`}
      stroke="rgba(180,40,70,0.2)"
      strokeWidth="0.5"
      style={{ opacity: op, scale: sc, transformOrigin: '100px 100px' }}
    />
  );
});

const RoseCenter = memo(({ progress }) => {
  const opOuter = useTransform(progress, [0.65, 1], [0, 1]);
  const opInner = useTransform(progress, [0.75, 1], [0, 1]);
  return (
    <>
      <motion.circle cx="100" cy="100" r="11" fill="#f4a261" style={{ opacity: opOuter }} />
      <motion.circle cx="100" cy="100" r="6" fill="#ffd166" style={{ opacity: opInner }} />
    </>
  );
});

const SvgRose = memo(() => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });

  // Pre-compute transforms
  const stemPath = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const leaf1Opacity = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);
  const leaf2Opacity = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);

  const petalConfigs = useMemo(() => [
    { d: 'M100,100 Q82,60 100,28 Q118,60 100,100', start: 0.0 },
    { d: 'M100,100 Q132,78 155,55 Q130,88 100,100', start: 0.1 },
    { d: 'M100,100 Q142,108 158,140 Q122,118 100,100', start: 0.2 },
    { d: 'M100,100 Q112,142 100,168 Q88,142 100,100',  start: 0.3 },
    { d: 'M100,100 Q58,118 42,148 Q68,118 100,100',    start: 0.4 },
    { d: 'M100,100 Q52,88 38,58 Q68,78 100,100',       start: 0.5 },
    { d: 'M100,100 Q75,52 100,18 Q125,52 100,100',     start: 0.6 },
  ], []);

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 32px', position: 'relative' }}>
      {/* Ethereal glowing halo behind the blooming rose */}
      <div className="rose-halo" />

      <svg width="200" height="200" viewBox="0 0 200 200" style={{ overflow: 'visible', position: 'relative', zIndex: 1 }}>
        <motion.line x1="100" y1="100" x2="100" y2="182" stroke="#2d6a4f" strokeWidth="3"
          strokeLinecap="round" style={{ pathLength: stemPath }} />
        <motion.path d="M102,140 Q122,126 138,135" stroke="#52b788" strokeWidth="2"
          fill="rgba(82,183,136,0.35)" strokeLinecap="round" style={{ opacity: leaf1Opacity }} />
        <motion.path d="M98,158 Q78,144 62,152" stroke="#52b788" strokeWidth="2"
          fill="rgba(82,183,136,0.35)" strokeLinecap="round" style={{ opacity: leaf2Opacity }} />
        {petalConfigs.map((p, i) => (
          <RosePetal key={i} progress={scrollYProgress} d={p.d} start={p.start} index={i} />
        ))}
        <RoseCenter progress={scrollYProgress} />
      </svg>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. ENCHANTED ROSE IN GLASS DOME (Beauty & the Beast tribute)
// ─────────────────────────────────────────────────────────────────────────────
const EnchantedRoseDomeSection = memo(() => {
  const [petalsRemaining, setPetalsRemaining] = useState(5);
  const [wishes, setWishes] = useState([
    "Cinta yang tak pernah pudar oleh waktu",
    "Setiap senyummu adalah musim semi bagiku",
    "Terima kasih telah hadir dan memberi warna",
    "Selamanya berdampingan dalam setiap langkah",
    "Mawar ini milikmu, hatiku pun seutuhnya milikmu"
  ]);
  const [lastWish, setLastWish] = useState(null);

  const pluckPetal = () => {
    if (petalsRemaining > 0) {
      setLastWish(wishes[5 - petalsRemaining]);
      setPetalsRemaining(p => p - 1);
    } else {
      setPetalsRemaining(5);
      setLastWish("Mawar telah mekar kembali secara abadi!");
    }
  };

  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 640, margin: '0 auto', padding: '48px 24px 60px', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <SparkleIcon size={32} color="#e63946" />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.7rem,4vw,2.7rem)', color: C.deep, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <BloomRoseBud size={20} />
          The Enchanted Rose Dome
          <BloomRoseBud size={20} delay={300} />
        </h2>
        <p style={{ fontSize: '0.86rem', color: C.deep, opacity: 0.6, maxWidth: 440, margin: '0 auto 28px' }}>
          Tersimpan abadi di bawah kubah kaca ajaib.
        </p>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={pluckPetal}
        style={{
          ...glassStrong,
          borderRadius: 36,
          padding: '36px 24px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 50px rgba(193, 18, 31, 0.12), inset 0 1px 1px rgba(255,255,255,0.8)'
        }}>
        {/* Enchanted glass dome illustration with dynamic petal state */}
        <EnchantedRoseDomeSVG width={170} height={230} petalsRemaining={petalsRemaining} />

        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.25)', borderRadius: 20, padding: '6px 18px', color: '#c1121f', fontSize: '0.82rem', fontWeight: 600 }}>
            <RoseBudIcon size={16} />
            {petalsRemaining > 0 ? `${petalsRemaining} Kelopak Tersisa` : 'Mekar Abadi'}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {lastWish && (
            <motion.div
              key={lastWish}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: 18,
                padding: '12px 24px',
                borderRadius: 16,
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(230,57,70,0.2)',
                boxShadow: '0 4px 20px rgba(230,57,70,0.08)',
                maxWidth: 420
              }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: '#9d0208', fontSize: '0.98rem', margin: 0, lineHeight: 1.5 }}>
                "{lastWish}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. ROSE VINYL PLAYER / MUSIC SOUNDSCAPE (Synthesized Lofi Piano / Garden Ambience)
// ─────────────────────────────────────────────────────────────────────────────
const RoseVinylPlayer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  // Play romantic chime progression using Web Audio API (100% reliable, no external file 404s)
  const playRomanticChime = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const chords = [
        [261.63, 329.63, 392.00, 523.25], // C maj
        [220.00, 261.63, 329.63, 440.00], // A min
        [174.61, 220.00, 261.63, 349.23], // F maj
        [196.00, 246.94, 293.66, 392.00]  // G maj
      ];
      
      let step = 0;
      intervalRef.current = setInterval(() => {
        const chord = chords[step % chords.length];
        step++;
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
          
          gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + i * 0.15 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.15 + 1.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.15);
          osc.stop(ctx.currentTime + i * 0.15 + 2.0);
        });
      }, 2400);
    } catch (e) {
      console.warn("Audio unavailable", e);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      playRomanticChime();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      ...glassStrong,
      padding: '8px 16px 8px 10px',
      borderRadius: 40,
      boxShadow: '0 10px 30px rgba(45,106,79,0.18)',
      border: '1px solid rgba(255,255,255,0.85)'
    }}>
      <div 
        onClick={toggleMusic}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RoseVinylRecordSVG size={46} isPlaying={isPlaying} />
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '0.82rem', color: C.deep, margin: 0 }}>
            {isPlaying ? "Serenade in Bloom" : "Rose Melody"}
          </p>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: isPlaying ? '#52b788' : '#bbb' }} />
        </div>
        <p style={{ fontSize: '0.68rem', color: C.mid, opacity: 0.65, margin: 0 }}>
          {isPlaying ? "Harmoni Lembut" : "Melodi Mawar"}
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: 'none',
          background: isPlaying ? '#c1121f' : C.mid,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
        {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
      </motion.button>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. VIRTUAL ROSE GARDEN (Interactive Garden with Secret Messages)
// ─────────────────────────────────────────────────────────────────────────────
const VirtualRoseGarden = memo(() => {
  const initialRoses = [
    { id: 1, name: "Scarlet Crimson", meaning: "Cinta Sejati & Keberanian", note: "Saat manis ketika melihatmu tersenyum hangat dan bahagia", bloomed: true },
    { id: 2, name: "Ivory Snow Rose", meaning: "Kemurnian & Ketulusan", note: "Hati yang tulus untuk selalu mendampingimu", bloomed: false },
    { id: 3, name: "Blush Pink Rose", meaning: "Kekaguman & Rasa Manis", note: "Selalu terpikat oleh tawamu yang renyah", bloomed: true },
    { id: 4, name: "Golden Sunset Rose", meaning: "Keceriaan & Kehangatan", note: "Setiap sore terasa indah saat berbincang denganmu", bloomed: false },
    { id: 5, name: "Ruby Vintage Rose", meaning: "Kasih Sayang yang Abadi", note: "Janji untuk merawat greenhouse cinta kita selamanya", bloomed: true },
    { id: 6, name: "Lavender Dream Rose", meaning: "Pesona Pandangan Pertama", note: "Bahkan saat awal menyapa, selalu terasa istimewa", bloomed: false },
  ];

  const [garden, setGarden] = useState(initialRoses);
  const [selectedRose, setSelectedRose] = useState(initialRoses[0]);

  const toggleBloom = (id) => {
    setGarden(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.bloomed;
        const updated = { ...r, bloomed: nextState };
        setSelectedRose(updated);
        return updated;
      }
      return r;
    }));
  };

  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '44px 24px 68px' }}>
      {/* Ambient soft glow & botanical backdrop */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1,
        background: 'radial-gradient(circle at 50% 25%, rgba(255, 230, 235, 0.5) 0%, rgba(216, 243, 220, 0.3) 50%, transparent 75%)',
        borderRadius: 36,
      }} />

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <RoseBudIcon size={26} />
          <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg, transparent, #c1121f, transparent)' }} />
          <DaisyIcon size={26} />
          <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg, transparent, #c1121f, transparent)' }} />
          <RoseBudIcon size={26} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4.2vw,2.9rem)', color: C.deep, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <BloomRoseBud size={22} />
          The Secret Rose Garden
          <BloomRoseBud size={22} delay={300} />
        </h2>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '0.96rem', color: C.deep, opacity: 0.65, maxWidth: 520, margin: '0 auto' }}>
          Setiap kuncup mawar menyimpan bisikan kasih dan rahasia ketulusan di balik kelopaknya
        </p>
      </motion.div>

      {/* Grid of roses */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))', gap: 16, marginBottom: 32 }}>
        {garden.map((rose) => {
          const isSelected = selectedRose?.id === rose.id;
          return (
            <motion.div
              key={rose.id}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toggleBloom(rose.id);
              }}
              className={rose.bloomed ? 'garden-card-bloomed' : ''}
              style={{
                ...glass,
                borderRadius: 22,
                padding: '20px 12px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: isSelected
                  ? '2px solid rgba(230,57,70,0.7)'
                  : rose.bloomed
                  ? '1px solid rgba(230,57,70,0.3)'
                  : '1px solid rgba(255,255,255,0.75)',
                background: rose.bloomed
                  ? 'linear-gradient(165deg, rgba(255,255,255,0.85) 0%, rgba(255,240,243,0.7) 100%)'
                  : 'linear-gradient(165deg, rgba(255,255,255,0.45) 0%, rgba(240,248,244,0.35) 100%)',
                transition: 'all 0.35s ease',
              }}>
              {/* Inner ambient light halo when bloomed */}
              {rose.bloomed && (
                <div style={{
                  position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
                  width: 50, height: 50, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)',
                  pointerEvents: 'none', zIndex: 0,
                }} />
              )}

              <div style={{
                position: 'relative', zIndex: 1,
                transform: rose.bloomed ? 'scale(1.15) translateY(-2px)' : 'scale(0.88)',
                filter: rose.bloomed ? 'drop-shadow(0 4px 8px rgba(230,57,70,0.25))' : 'grayscale(35%) opacity(0.72)',
                transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                {rose.bloomed ? <RoseIcon size={46} /> : <RoseBudIcon size={46} />}
              </div>

              <p style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: '0.82rem',
                fontWeight: 600,
                color: C.deep,
                marginTop: 12,
                marginBottom: 4,
                position: 'relative', zIndex: 1,
              }}>
                {rose.name}
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '2px 8px',
                borderRadius: 10,
                background: rose.bloomed ? 'rgba(230,57,70,0.1)' : 'rgba(45,106,79,0.08)',
                position: 'relative', zIndex: 1,
              }}>
                <span style={{ fontSize: '0.66rem', color: rose.bloomed ? '#c1121f' : C.mid, fontWeight: 600 }}>
                  {rose.bloomed ? 'Mekar Sempurna' : 'Kuncup Anggun'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Rose Detail Note */}
      {selectedRose && (
        <motion.div
          key={selectedRose.id + (selectedRose.bloomed ? '-b' : '-u')}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            ...glassStrong,
            borderRadius: 26,
            padding: '28px 32px',
            textAlign: 'center',
            maxWidth: 580,
            margin: '0 auto',
            border: '1px solid rgba(230,57,70,0.3)',
            boxShadow: '0 16px 42px rgba(45,106,79,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
            position: 'relative',
          }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#c1121f', marginBottom: 8 }}>
            <RoseIcon size={20} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.2rem', color: C.deep, letterSpacing: '-0.01em' }}>
              {selectedRose.name}
            </span>
            <RoseIcon size={20} />
          </div>
          <p style={{ fontSize: '0.75rem', color: C.mid, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            Makna Mawar: {selectedRose.meaning}
          </p>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(230,57,70,0.3), transparent)', margin: '12px auto', maxWidth: 320 }} />
          <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.02rem', color: C.deep, opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
            "{selectedRose.note}"
          </p>
        </motion.div>
      )}
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// TYPEWRITER HOOK
// ─────────────────────────────────────────────────────────────────────────────
const useTypewriter = (text, speed = 42, startDelay = 500) => {
  const [shown, setShown] = useState('');
  useEffect(() => {
    let i = 0; setShown('');
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return shown;
};

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
const Lightbox = memo(({ photos, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [prev, next, onClose]);

  const btnBase = {
    border: 'none', cursor: 'pointer', width: 48, height: 48, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', background: 'rgba(255,255,255,0.16)',
    backdropFilter: 'blur(8px)', zIndex: 10,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }} onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 8000,
        background: 'rgba(6,18,12,0.9)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}>
      <button onClick={onClose} style={{ ...btnBase, position: 'absolute', top: 24, right: 24 }}><X size={20} /></button>
      <button onClick={e => { e.stopPropagation(); prev(); }} style={{ ...btnBase, position: 'absolute', left: 20 }}><ChevronLeft size={22} /></button>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          style={{ ...glassStrong, borderRadius: 24, padding: 12, maxWidth: 500, width: '100%' }}>
          <img src={photos[idx].src} alt={photos[idx].caption}
            style={{ width: '100%', borderRadius: 16, display: 'block', maxHeight: '75vh', objectFit: 'contain' }} />
          <p style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 4, fontFamily: "'Great Vibes',cursive", fontSize: '2rem', color: C.mid }}>
            {photos[idx].caption}
          </p>
        </motion.div>
      </AnimatePresence>
      <button onClick={e => { e.stopPropagation(); next(); }} style={{ ...btnBase, position: 'absolute', right: 20 }}><ChevronRight size={22} /></button>
      <div style={{ position: 'absolute', bottom: 24, display: 'flex', gap: 8 }}>
        {photos.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
            style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, padding: 0, border: 'none', cursor: 'pointer', background: i === idx ? C.light : 'rgba(255,255,255,0.35)', transition: 'all 0.3s' }} />
        ))}
      </div>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY AMBIENT FLOATING PETALS — gentle micro petals drifting in gallery
// ─────────────────────────────────────────────────────────────────────────────
const GalleryFloatingPetals = memo(() => {
  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8.5 + 3) % 96}%`,
    size: 8 + (i % 3) * 5,
    dur: `${5 + (i % 4) * 2.5}s`,
    delay: `-${(i * 1.3) % 8}s`,
    swayX: `${(i % 2 === 0 ? 1 : -1) * (18 + (i % 3) * 10)}px`,
    rot: `${90 + i * 55}deg`,
    opacity: 0.28 + (i % 3) * 0.12,
    color: i % 4 === 0 ? '#e63946' : i % 4 === 1 ? '#f4a261' : i % 4 === 2 ? '#fbc4ab' : '#c1121f',
  })), []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {petals.map(p => (
        <div key={p.id} className="gallery-petal" style={{
          left: p.left, '--gdur': p.dur, '--gdelay': p.delay,
          '--gsway': p.swayX, '--grot': p.rot,
        }}>
          <RosePetalSVG size={p.size} color={p.color} opacity={p.opacity} />
        </div>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 3-D TILT CARD WITH FLIP DIARY, GOLD CORNERS & ROSE LIKE REACTION
// ─────────────────────────────────────────────────────────────────────────────
const TiltCard = memo(({ src, alt, caption, date, note, index, onClick }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 30 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 30 });
  const [flipped, setFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1);
  const [filterMode, setFilterMode] = useState(0); // 0: natural, 1: warm rose, 2: vintage sepia, 3: dreamy glow
  const filterClasses = ['photo-filter-natural', 'photo-filter-warm-rose', 'photo-filter-vintage-sepia', 'photo-filter-dreamy-glow'];

  const onMove = useCallback((e) => {
    if (flipped) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my, flipped]);
  
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const toggleFlip = (e) => {
    e.stopPropagation();
    setFlipped(f => !f);
  };

  const cycleFilter = (e) => {
    e.stopPropagation();
    setFilterMode(m => (m + 1) % filterClasses.length);
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }} style={{ perspective: 1000, height: '100%', display: 'flex', position: 'relative' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      
      {/* Real Wooden Clothespin clipping the card to the wire */}
      <div className="wooden-clothespin" />

      <motion.div
        className="polaroid-card"
        style={{
          rotateX: flipped ? 0 : rx,
          rotateY: flipped ? 0 : ry,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: `rotate(${index % 2 === 0 ? '-1.2deg' : '1.2deg'})`,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        whileHover={{ scale: 1.03, rotate: '0deg' }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        {/* Holographic Rose Foil Sheen on hover */}
        <div className="polaroid-foil-sheen" />

        {/* Vintage Golden Corner Brackets on Polaroid */}
        <div className="photo-gold-corner tl" />
        <div className="photo-gold-corner tr" />
        <div className="photo-gold-corner bl" />
        <div className="photo-gold-corner br" />

        {/* Decorative Washi Tape */}
        <div className="washi-tape" />

        {/* Tiny dewdrop on polaroid corner */}
        <div className="dewdrop" style={{ top: 12, right: 12, animationDelay: `-${index * 1.5}s` }} />

        {/* Flip Container */}
        <div className={`flip-card-inner${flipped ? ' flipped' : ''}`}>
          
          {/* FRONT: Polaroid Photo */}
          <div className="flip-card-front">
            <div 
              className="photo-inner-matte"
              onClick={onClick}>
              <motion.img 
                src={src} 
                alt={alt} 
                loading="lazy"
                className={filterClasses[filterMode]}
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'filter 0.4s ease' }} 
              />

              {/* Hover caption overlay — dreamy rose gradient */}
              <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.35 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(26,18,28,0.75) 0%, rgba(120,30,50,0.35) 45%, transparent 72%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 16, gap: 4,
                }}>
                <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '1.5rem', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.6)', lineHeight: 1 }}>{caption}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: 0.75 }}>
                  <div style={{ width: 18, height: 1, background: 'rgba(255,200,200,0.7)' }} />
                  <RoseBudIcon size={9} color="#ffb3c1" />
                  <div style={{ width: 18, height: 1, background: 'rgba(255,200,200,0.7)' }} />
                </div>
              </motion.div>
            </div>

            {/* Polaroid Bottom Label Area with Controls */}
            <div style={{ paddingTop: 12, paddingBottom: 6, paddingLeft: 4, paddingRight: 4, minHeight: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              {/* Caption */}
              <div>
                <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '1.85rem', color: C.deep, lineHeight: 1.1, marginBottom: 0 }}>{caption}</p>
              </div>

              {/* Controls row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* Vintage Tone Filter Switch */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={cycleFilter}
                    title="Ganti filter warna vintage"
                    style={{
                      background: filterMode > 0 ? 'rgba(230,57,70,0.15)' : 'rgba(0,0,0,0.04)',
                      border: filterMode > 0 ? '1px solid rgba(230,57,70,0.3)' : '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '50%', width: 28, height: 28,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: filterMode > 0 ? '#c1121f' : C.mid,
                      transition: 'all 0.25s ease',
                    }}>
                    <Sparkles size={13} />
                  </motion.button>

                  {/* Flip Diary Button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFlip}
                    title="Buka diary di belakang"
                    style={{
                      background: 'rgba(82,183,136,0.15)',
                      border: '1px solid rgba(82,183,136,0.3)',
                      borderRadius: '50%', width: 28, height: 28,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: C.mid,
                      transition: 'all 0.25s ease',
                    }}>
                    <Feather size={13} />
                  </motion.button>

                  {/* Rose Heart Like Button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handleLike}
                    style={{
                      background: liked ? 'rgba(230,57,70,0.18)' : 'rgba(0,0,0,0.04)',
                      border: liked ? '1px solid rgba(230,57,70,0.4)' : '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 20, padding: '4px 9px',
                      display: 'flex', alignItems: 'center', gap: 4,
                      cursor: 'pointer', color: liked ? '#c1121f' : C.deep,
                      transition: 'all 0.25s ease',
                    }}>
                    <HeartLeafIcon size={14} color={liked ? '#e63946' : C.mid} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>{likeCount}</span>
                  </motion.button>
              </div>
            </div>
          </div>

          {/* BACK: Artsy Watercolor Diary Love Note */}
          <div className="flip-card-back" onClick={toggleFlip} style={{ cursor: 'pointer' }}>
            {/* Watercolor wash overlay on back */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none', zIndex: 0,
              background: 'radial-gradient(ellipse at 30% 20%, rgba(244,162,97,0.12) 0%, transparent 60%), radial-gradient(ellipse at 75% 80%, rgba(82,183,136,0.1) 0%, transparent 55%)',
            }} />
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '0.75rem', color: '#8d5b4c', fontWeight: 700, letterSpacing: '0.04em' }}>Love Diary</span>
                    <span style={{ fontSize: '0.6rem', color: C.mid, opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Volume {index + 1}</span>
                  </div>
                  <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <RoseBudIcon size={22} />
                  </motion.div>
                </div>
                {/* Divider line with tiny roses */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(210,140,100,0.4), transparent)' }} />
                  <DaisyIcon size={10} />
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(210,140,100,0.4), transparent)' }} />
                </div>
                <p style={{
                  fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                  fontSize: '0.9rem', lineHeight: 1.75, color: '#3d2314',
                  textAlign: 'center',
                  textShadow: '0 1px 2px rgba(180,120,80,0.08)',
                }}>
                  &ldquo;{note}&rdquo;
                </p>
              </div>

              {/* Footer signature */}
              <div style={{ textAlign: 'center', paddingTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 22, height: 1, background: 'rgba(180,130,90,0.4)' }} />
                  <RoseBudIcon size={10} color="#c59b27" />
                  <div style={{ width: 22, height: 1, background: 'rgba(180,130,90,0.4)' }} />
                </div>
                <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: '1.55rem', color: C.mid, lineHeight: 1 }}>
                  Forever in Memory
                </span>
              </div>
            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// VIRTUAL HUG
// ─────────────────────────────────────────────────────────────────────────────

// Animated embrace illustration SVG
const EmbraceIllustrationSVG = ({ hugged }) => (
  <svg width="220" height="200" viewBox="0 0 220 200" fill="none" style={{ overflow: 'visible' }}>
    {/* Soft glow backdrop */}
    <motion.ellipse cx="110" cy="110" rx="90" ry="80"
      fill="url(#hugGlow)"
      animate={{ rx: hugged ? 100 : 90, opacity: hugged ? 1 : 0.6 }}
      transition={{ duration: 0.8 }}
    />
    <defs>
      <radialGradient id="hugGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(230,57,70,0.18)" />
        <stop offset="60%" stopColor="rgba(82,183,136,0.1)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="heartFill" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ff6b8a" />
        <stop offset="100%" stopColor="#c1121f" />
      </radialGradient>
      <radialGradient id="heartFillIdle" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f4a261" />
        <stop offset="100%" stopColor="#e76f51" />
      </radialGradient>
    </defs>

    {/* ── Left arm (botanical vine style) ── */}
    <motion.path
      animate={{ d: hugged
        ? 'M18,145 C22,115 32,88 52,70 C66,57 84,52 100,54'
        : 'M5,165 C12,135 26,108 48,88 C65,73 85,65 100,67'
      }}
      stroke="#2d6a4f" strokeWidth="6" strokeLinecap="round" fill="none"
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
    />
    {/* Left sleeve cuff detail */}
    <motion.path
      animate={{ d: hugged
        ? 'M18,145 Q14,138 22,132'
        : 'M5,165 Q1,158 9,152'
      }}
      stroke="#52b788" strokeWidth="3" strokeLinecap="round" fill="none"
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
    />
    {/* Left arm rose decoration */}
    <motion.circle
      animate={{ cx: hugged ? 52 : 48, cy: hugged ? 70 : 88, r: 6 }}
      fill="#e63946" opacity={0.85}
      transition={{ duration: 0.8 }}
    />
    <motion.circle
      animate={{ cx: hugged ? 52 : 48, cy: hugged ? 70 : 88 }}
      r={3} fill="#ff9fb2"
      transition={{ duration: 0.8 }}
    />
    {/* Left arm leaf */}
    <motion.ellipse
      animate={{ cx: hugged ? 44 : 40, cy: hugged ? 76 : 94, rx: 8, ry: 4 }}
      fill="#52b788" opacity={0.6}
      style={{ transformOrigin: 'center' }}
      transition={{ duration: 0.8 }}
    />

    {/* ── Right arm ── */}
    <motion.path
      animate={{ d: hugged
        ? 'M202,145 C198,115 188,88 168,70 C154,57 136,52 120,54'
        : 'M215,165 C208,135 194,108 172,88 C155,73 135,65 120,67'
      }}
      stroke="#2d6a4f" strokeWidth="6" strokeLinecap="round" fill="none"
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
    />
    {/* Right sleeve cuff detail */}
    <motion.path
      animate={{ d: hugged
        ? 'M202,145 Q206,138 198,132'
        : 'M215,165 Q219,158 211,152'
      }}
      stroke="#52b788" strokeWidth="3" strokeLinecap="round" fill="none"
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
    />
    {/* Right arm rose decoration */}
    <motion.circle
      animate={{ cx: hugged ? 168 : 172, cy: hugged ? 70 : 88, r: 6 }}
      fill="#e63946" opacity={0.85}
      transition={{ duration: 0.8 }}
    />
    <motion.circle
      animate={{ cx: hugged ? 168 : 172, cy: hugged ? 70 : 88 }}
      r={3} fill="#ff9fb2"
      transition={{ duration: 0.8 }}
    />
    {/* Right arm leaf */}
    <motion.ellipse
      animate={{ cx: hugged ? 176 : 180, cy: hugged ? 76 : 94, rx: 8, ry: 4 }}
      fill="#52b788" opacity={0.6}
      transition={{ duration: 0.8 }}
    />

    {/* ── Central heart ── */}
    <motion.path
      d="M110,128 C110,128 82,110 82,92 C82,78 94,70 110,82 C126,70 138,78 138,92 C138,110 110,128 110,128Z"
      fill={hugged ? 'url(#heartFill)' : 'url(#heartFillIdle)'}
      animate={{
        scale: hugged ? [1, 1.22, 0.95, 1.1, 1] : [1, 1.05, 1],
        filter: hugged ? 'drop-shadow(0 0 12px rgba(230,57,70,0.7))' : 'drop-shadow(0 0 4px rgba(244,162,97,0.4))',
      }}
      style={{ transformOrigin: '110px 100px' }}
      transition={{ duration: hugged ? 0.7 : 2.2, repeat: hugged ? 0 : Infinity, ease: 'easeInOut' }}
    />
    {/* Heart highlight shine */}
    <motion.ellipse cx="100" cy="88" rx="6" ry="4" fill="rgba(255,255,255,0.4)"
      animate={{ opacity: hugged ? 0.6 : 0.3 }}
      transition={{ duration: 0.5 }}
    />

    {/* ── Small floating sparkles around heart ── */}
    {[
      { cx: 85, cy: 75, delay: 0 }, { cx: 135, cy: 75, delay: 0.3 },
      { cx: 72, cy: 100, delay: 0.6 }, { cx: 148, cy: 100, delay: 0.9 },
    ].map((s, i) => (
      <motion.circle key={i} cx={s.cx} cy={s.cy} r="2.5"
        fill="#f4a261"
        animate={{ opacity: hugged ? [0, 1, 0] : [0.2, 0.5, 0.2], scale: hugged ? [0, 1.4, 0] : 1 }}
        transition={{ duration: 0.8, delay: s.delay, repeat: hugged ? 0 : Infinity, repeatDelay: 1.5 }}
      />
    ))}

    {/* ── Tiny daisy flowers scattered ── */}
    {[{ x: 58, y: 50 }, { x: 158, y: 50 }, { x: 40, y: 118 }, { x: 178, y: 118 }].map((pos, i) => (
      <motion.g key={i}
        animate={{ rotate: hugged ? 360 : 0, scale: hugged ? 1.2 : 1 }}
        style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
        transition={{ duration: 1.2, delay: i * 0.1 }}
      >
        <circle cx={pos.x} cy={pos.y} r="5" fill="rgba(255,255,255,0.75)" />
        <circle cx={pos.x} cy={pos.y} r="2.5" fill="#f4d03f" />
        {[0,60,120,180,240,300].map(deg => (
          <ellipse key={deg}
            cx={pos.x + Math.cos(deg * Math.PI / 180) * 4}
            cy={pos.y + Math.sin(deg * Math.PI / 180) * 4}
            rx="2" ry="1.2"
            fill="rgba(255,255,255,0.8)"
            style={{ transform: `rotate(${deg}deg)`, transformOrigin: `${pos.x}px ${pos.y}px` }}
          />
        ))}
      </motion.g>
    ))}
  </svg>
);

// Pulsing ring component
const HugRing = ({ size, delay, hugged, color }) => (
  <motion.div
    animate={hugged
      ? { scale: [1, 2.2], opacity: [0.7, 0] }
      : { scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }
    }
    transition={{
      duration: hugged ? 1.0 : 3,
      delay,
      repeat: Infinity,
      ease: hugged ? 'easeOut' : 'easeInOut',
    }}
    style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: size, height: size, borderRadius: '50%',
      border: `1.5px solid ${color}`,
      pointerEvents: 'none',
    }}
  />
);

const VirtualHug = memo(() => {
  const [hugged, setHugged] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const hugMessages = useMemo(() => [
    { text: 'Pelukan hangat ini selalu untukmu, setiap saat, tanpa syarat.', icon: '🌹' },
    { text: 'Di mana pun kamu berada, pelukan ini menjangkaumu dengan cinta.', icon: '🌸' },
    { text: 'Setiap hari kutitipkan pelukan baru di sini, hanya untukmu.', icon: '💚' },
    { text: 'Semoga pelukan ini terasa sehangat perasaanku padamu.', icon: '🌷' },
    { text: 'Kamu tidak pernah sendiri, pelukan ini selalu siap hadir.', icon: '🌿' },
    { text: 'Tidak ada jarak yang cukup jauh untuk memisahkan pelukan ini.', icon: '✨' },
  ], []);

  const currentMsg = hugMessages[hugCount % hugMessages.length];

  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    angle: (i / 18) * 360 + (Math.random() - 0.5) * 15,
    distance: 100 + Math.random() * 80,
    size: 14 + Math.random() * 12,
    symbol: ['🌹','🌸','💕','✨','🌿','🌷','💚','🌺','💖'][i % 9],
    delay: Math.random() * 0.3,
  })), []);

  const handleHug = useCallback(() => {
    if (hugged) return;
    setHugged(true);
    setShowParticles(true);
    setShowMessage(true);
    setHugCount(c => c + 1);
    setAnimKey(k => k + 1);
    setTimeout(() => setShowParticles(false), 2000);
    setTimeout(() => setHugged(false), 2800);
  }, [hugged]);

  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 600, margin: '0 auto', padding: '60px 24px 70px', textAlign: 'center' }}>
      {/* Layered botanical background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 48, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(244,194,194,0.28) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(82,183,136,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }} />
        {/* Shimmer waves */}
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear', delay: i * 2.5 }}
            style={{
              position: 'absolute', top: `${20 + i * 25}%`, left: 0,
              width: '60%', height: '1px',
              background: `linear-gradient(to right, transparent, rgba(${i % 2 === 0 ? '230,57,70' : '82,183,136'},0.25), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Floating petals in background */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [-20, -60, -20], x: [0, (i % 2 === 0 ? 18 : -18), 0], opacity: [0.25, 0.55, 0.25], rotate: [0, i % 2 === 0 ? 180 : -180, 360] }}
          transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.9 }}
          style={{
            position: 'absolute',
            left: `${12 + i * 14}%`, top: `${35 + (i % 3) * 15}%`,
            fontSize: 16 + (i % 3) * 4, pointerEvents: 'none', opacity: 0.3,
          }}
        >
          {['🌸', '🌹', '🌷', '🌺', '💕', '🌿'][i]}
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>

        {/* Section header */}
        <motion.div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <RoseBudIcon size={26} />
            </motion.div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 700,
              fontSize: 'clamp(1.9rem,5vw,3rem)', color: C.deep,
              letterSpacing: '-0.01em',
            }}>
              A Warm Embrace
            </h2>
            <motion.div animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}>
              <RoseBudIcon size={26} />
            </motion.div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <FloralDivider width={160} color={C.mid} opacity={0.3} />
          </div>
          <p style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: C.mid, opacity: 0.8,
            marginBottom: 36,
          }}>
            kirim pelukan virtual, kapan pun kamu merindukan
          </p>
        </motion.div>

        {/* Main interactive card */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>

          {/* Particle burst */}
          <AnimatePresence>
            {showParticles && particles.map(p => (
              <motion.div key={`${animKey}-${p.id}`}
                initial={{ opacity: 1, scale: 0.3, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0.3, 1.2, 0.8],
                  x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                  y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, delay: p.delay, ease: [0.22,1,0.36,1] }}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  fontSize: p.size, pointerEvents: 'none', zIndex: 30,
                  transform: 'translate(-50%,-50%)',
                  userSelect: 'none',
                }}
              >
                {p.symbol}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Pulsing rings */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 0 }}>
            <HugRing size={260} delay={0} hugged={hugged} color="rgba(230,57,70,0.2)" />
            <HugRing size={320} delay={0.4} hugged={hugged} color="rgba(82,183,136,0.18)" />
            <HugRing size={390} delay={0.8} hugged={hugged} color="rgba(230,57,70,0.1)" />
          </div>

          {/* Card */}
          <motion.div
            whileHover={!hugged ? { scale: 1.03, y: -6 } : {}}
            whileTap={{ scale: 0.97 }}
            onClick={handleHug}
            style={{
              position: 'relative', zIndex: 5,
              ...glassStrong,
              borderRadius: 36, padding: '44px 56px 32px',
              cursor: hugged ? 'default' : 'pointer',
              boxShadow: hugged
                ? '0 0 0 2px rgba(230,57,70,0.4), 0 24px 80px rgba(230,57,70,0.22), 0 8px 40px rgba(45,106,79,0.12), inset 0 1px 0 rgba(255,255,255,0.8)'
                : '0 24px 80px rgba(45,106,79,0.14), 0 0 0 1px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.8)',
              transition: 'box-shadow 0.6s ease',
              minWidth: 280,
            }}
          >
            {/* Botanical corners */}
            <div style={{ position: 'absolute', top: -4, left: -4, opacity: hugged ? 0.7 : 0.45, pointerEvents: 'none', transition: 'opacity 0.5s' }}>
              <PressedFlowerSVG size={52} />
            </div>
            <div style={{ position: 'absolute', top: -4, right: -4, opacity: hugged ? 0.7 : 0.45, pointerEvents: 'none', transform: 'scaleX(-1)', transition: 'opacity 0.5s' }}>
              <PressedFlowerSVG size={52} />
            </div>
            <div style={{ position: 'absolute', bottom: -4, left: -4, opacity: hugged ? 0.5 : 0.3, pointerEvents: 'none', transform: 'scaleY(-1)', transition: 'opacity 0.5s' }}>
              <PressedFlowerSVG size={36} />
            </div>
            <div style={{ position: 'absolute', bottom: -4, right: -4, opacity: hugged ? 0.5 : 0.3, pointerEvents: 'none', transform: 'scale(-1)', transition: 'opacity 0.5s' }}>
              <PressedFlowerSVG size={36} />
            </div>

            {/* Inner warm glow when hugged */}
            <AnimatePresence>
              {hugged && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 36, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 50% 60%, rgba(230,57,70,0.1) 0%, transparent 70%)',
                  }}
                />
              )}
            </AnimatePresence>

            {/* SVG illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <EmbraceIllustrationSVG hugged={hugged} />
            </div>

            {/* Label */}
            <AnimatePresence mode="wait">
              <motion.p
                key={hugged ? 'hugging' : 'idle'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                style={{
                  fontFamily: "'Great Vibes',cursive",
                  fontSize: '2.4rem',
                  color: hugged ? '#c1121f' : C.mid,
                  lineHeight: 1.1,
                  marginBottom: 6,
                  textShadow: hugged ? '0 2px 16px rgba(230,57,70,0.35)' : 'none',
                  transition: 'color 0.5s, text-shadow 0.5s',
                }}
              >
                {hugged ? '💕 Sending Hugs…' : 'Send a Hug'}
              </motion.p>
            </AnimatePresence>

            <p style={{
              fontSize: '0.7rem', color: C.mid, opacity: 0.45,
              letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600,
            }}>
              {hugged ? '— memelukmu dengan sepenuh hati —' : '✦ klik untuk mengirim pelukan ✦'}
            </p>
          </motion.div>
        </div>

        {/* Hug counter badge */}
        <AnimatePresence>
          {hugCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                ...glass, borderRadius: 40, padding: '8px 22px',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: '0 4px 20px rgba(45,106,79,0.1)',
              }}>
                <DaisyIcon size={16} />
                <span style={{
                  fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                  fontSize: '0.88rem', color: C.mid,
                }}>
                  <strong style={{ fontStyle: 'normal', color: C.deep }}>{hugCount}</strong> pelukan telah dikirim
                </span>
                <DaisyIcon size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message card */}
        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.div
              key={hugCount}
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
              style={{
                marginTop: 28, maxWidth: 400, margin: '28px auto 0',
                position: 'relative',
              }}
            >
              {/* Ribbon on message card */}
              <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                <RibbonBowSVG size={40} color={C.mid} />
              </div>
              <div style={{
                ...glassStrong, borderRadius: 24, padding: '28px 28px 20px',
                background: 'linear-gradient(135deg, rgba(255,245,248,0.85) 0%, rgba(240,253,244,0.85) 100%)',
                border: '1px solid rgba(230,57,70,0.2)',
                boxShadow: '0 12px 48px rgba(230,57,70,0.1), 0 2px 12px rgba(45,106,79,0.08)',
              }}>
                {/* Quote mark */}
                <div style={{
                  fontFamily: "'Playfair Display',serif", fontSize: '3.5rem',
                  color: C.light, opacity: 0.4, lineHeight: 0.5, marginBottom: 14,
                  userSelect: 'none',
                }}>"</div>
                <p style={{
                  fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                  fontSize: '1rem', color: C.deep, lineHeight: 1.8,
                  marginBottom: 12,
                }}>
                  {currentMsg.text}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, opacity: 0.6 }}>
                  <div style={{ width: 30, height: 1, background: `linear-gradient(to right, transparent, ${C.light})` }} />
                  <span style={{ fontSize: '1.1rem' }}>{currentMsg.icon}</span>
                  <div style={{ width: 30, height: 1, background: `linear-gradient(to left, transparent, ${C.light})` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// LOVE LETTER
// ─────────────────────────────────────────────────────────────────────────────
const LoveLetter = memo(() => {
  const [open, setOpen] = useState(false);

  const lines = useMemo(() => [
    ["My dearest,", true],
    ["", false],
    ["These flowers were more than just petals and stems,", false],
    ["they were the words I couldn't say out loud.", false],
    ["", false],
    ["In every red rose I placed into your hands,", false],
    ["there was a whisper: you are extraordinary.", false],
    ["", false],
    ["In every white daisy that surrounded them,", false],
    ["there was a promise: I will always be here.", false],
    ["", false],
    ["Real flowers fade. But what I feel for you", false],
    ["only grows, deeper, warmer, and truer", false],
    ["with every passing day.", false],
    ["", false],
    ["This greenhouse is my gift to you:", false],
    ["a place where our first flower never wilts,", false],
    ["and the love behind it never ends.", false],
    ["", false],
    ["With all my heart, always yours", true, true],
  ], []);

  return (
    <section style={{ position: 'relative', zIndex: 10, maxWidth: 580, margin: '0 auto', padding: '40px 24px 60px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, color: C.mid, opacity: 0.75 }}>
          <BotanicalEnvelopeIcon size={26} color={C.mid} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.7rem,4vw,2.6rem)', color: C.deep, marginBottom: 8 }}>
          A Letter for You
        </h2>
        <p style={{ fontSize: '0.85rem', color: C.deep, opacity: 0.42 }}>Written with every feeling I couldn't say aloud</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.85 }}
        style={{ ...glassStrong, borderRadius: 24, overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg,rgba(82,183,136,0.22),rgba(45,106,79,0.12))',
          padding: '20px 26px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(82,183,136,0.25)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: C.mid,
              position: 'relative',
            }}>
              <BotanicalEnvelopeIcon size={22} color={C.mid} />
              {/* Wax Seal Stamp on Envelope Corner */}
              <div style={{ position: 'absolute', bottom: -6, right: -8 }}>
                <WaxSealSVG size={24} />
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, color: C.deep, fontSize: '0.95rem' }}>
                A Sealed Letter
              </p>
              <p style={{ fontSize: '0.72rem', color: C.mid, opacity: 0.55 }}>
                Sealed with wax · A message from my heart
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {!open && (
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <WaxSealSVG size={30} />
              </motion.div>
            )}
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.38 }}
              style={{ color: C.mid, opacity: 0.55 }}><ChevronDown size={20} /></motion.div>
          </div>
        </div>

        {/* Body */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}>
              <div className="parchment-sheet" style={{ padding: '28px 32px 36px', margin: '8px 12px 14px', position: 'relative' }}>
                {/* Vintage pressed flower bookmark detail */}
                <div style={{ position: 'absolute', top: 16, right: 20, opacity: 0.88, pointerEvents: 'none' }}>
                  <PressedFlowerSVG size={50} />
                </div>

                <div style={{ textAlign: 'center', marginBottom: 20, color: C.mid, opacity: 0.35, letterSpacing: '0.6em' }}>✿ ✦ ✿</div>
                {lines.map(([line, italic, isSignature], i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className={isSignature ? 'gold-ink-signature' : ''}
                    style={{
                      fontFamily: italic ? "'Playfair Display',serif" : "'Poppins',sans-serif",
                      fontStyle: italic ? 'italic' : 'normal',
                      fontWeight: italic ? 600 : 400,
                      fontSize: isSignature ? '1.15rem' : (italic ? '1rem' : '0.88rem'),
                      color: isSignature ? '#856404' : C.deep,
                      opacity: line === '' ? 1 : 0.88,
                      lineHeight: 1.85, marginBottom: line === '' ? 6 : 1, minHeight: line === '' ? 8 : 'auto',
                      display: isSignature ? 'inline-flex' : 'block',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    {line}
                    {isSignature && <RoseBudIcon size={20} color="#c59b27" />}
                  </motion.p>
                ))}
                <div style={{ textAlign: 'center', marginTop: 22, color: C.mid, opacity: 0.35, letterSpacing: '0.6em' }}>✿ ✦ ✿</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE ITEM
// ─────────────────────────────────────────────────────────────────────────────
const TimelineItem = memo(({ date, title, description, secretMemory, icon: Icon, isLast, delay, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }} viewport={{ once: true, margin: '-60px' }}
      style={{ display: 'flex', gap: 16, position: 'relative', marginBottom: 28 }}>
      {!isLast && (
        <>
          <div style={{ position: 'absolute', left: 19, top: 44, bottom: -28, width: 2, background: 'linear-gradient(to bottom, #52b788, rgba(45,106,79,0.3) 85%, transparent)', borderRadius: 2 }} />
          {/* Organic sprouting leaf on the vine connector */}
          <div style={{ position: 'absolute', left: index % 2 === 0 ? 12 : 16, top: 62, pointerEvents: 'none', zIndex: 2 }}>
            <VineSproutSVG size={18} isLeft={index % 2 !== 0} />
          </div>
        </>
      )}
      <div 
        onClick={() => setExpanded(e => !e)}
        style={{ position: 'relative', zIndex: 2, flexShrink: 0, width: 38, height: 38, borderRadius: '50%', ...glass, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.mid, marginTop: 5, boxShadow: '0 0 12px rgba(82,183,136,0.3)', cursor: 'pointer' }}>
        <Icon size={16} />
      </div>
      <div 
        onClick={() => setExpanded(e => !e)}
        style={{ ...glass, borderRadius: 16, padding: '18px 22px', flex: 1, position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease' }}>
        {/* Tiny dewdrop glint on timeline cards */}
        <div className="dewdrop" style={{ top: 10, right: 14 }} />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.mid, opacity: 0.5, display: 'block' }}>{date}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: C.mid, opacity: 0.7 }}>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={15} />
            </motion.div>
          </div>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.05rem', fontWeight: 600, color: C.deep, marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: C.deep, opacity: 0.68, margin: 0 }}>{description}</p>

        {/* Expandable secret heartfelt memory */}
        <AnimatePresence>
          {expanded && secretMemory && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.38 }}
              style={{
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 12,
                padding: '12px 16px',
                border: '1px dashed rgba(82,183,136,0.4)',
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.02)'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, color: '#c1121f' }}>
                <RoseBudIcon size={14} />
                <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '0.82rem', fontWeight: 600 }}>
                  Catatan Hati Rahasia
                </span>
              </div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '0.88rem', color: '#2b180d', lineHeight: 1.6, margin: 0 }}>
                "{secretMemory}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX HERO WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
const ParallaxHero = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ y, opacity, willChange: 'transform, opacity' }}>{children}</motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const onClose = useCallback(() => setLightbox(null), []);
  const { bursts, triggerBurst } = usePetalBurst();

  const heroPhoto = useMemo(() => ({
    src: '/images/hero_bouquet.jpg',
    caption: 'The Bouquet',
    date: 'Mawar & Daisy',
    note: 'Kombinasi mawar merah dan daisy putih. Bukti nyata awal dari kisah indah yang tak lekang oleh waktu.'
  }), []);

  const photos = useMemo(() => [
    { 
      src: '/images/photo1.jpg', 
      caption: 'Behind the Roses',
      date: '14 Februari',
      note: 'Wajahmu yang tersipu malu di balik buket mawar merah pertama. Detik di mana dunia seakan berhenti sejenak.'
    },
    { 
      src: '/images/photo2.jpg', 
      caption: 'Her Smile',
      date: 'Sore yang Cerah',
      note: 'Senyum paling tulus yang pernah kulihat. Lebih berseri daripada ratusan bunga yang mekar bersamaan.'
    },
    { 
      src: '/images/photo4.jpg', 
      caption: 'Reading the Card',
      date: 'Kata Demi Kata',
      note: 'Melihatmu membaca setiap bait kalimat dengan penuh kehangatan. Semua doa baik terpatri di sana.'
    },
    { 
      src: '/images/photo3.jpg', 
      caption: 'The Bouquet',
      date: 'Mawar & Daisy',
      note: 'Kombinasi mawar merah dan daisy putih. Bukti nyata awal dari kisah indah yang tak lekang oleh waktu.'
    },
  ], []);

  const timeline = useMemo(() => [
    { 
      date: 'The Beginning', 
      title: 'The Day It Was Given', 
      description: 'A bouquet of red roses and white daisies, the very first flower I ever gave her. Simple, yet the most meaningful gesture I have ever made.', 
      secretMemory: 'Jantungku berdegup kencang saat menyerahkan buket itu. Tapi melihat binar matamu, semua rasa gugup seketika sirna menjadi bahagia.',
      icon: CalendarHeartIcon 
    },
    { 
      date: 'Preserved Here', 
      title: 'Planted in the Digital Greenhouse', 
      description: 'Real petals may wilt, but inside this greenhouse they bloom forever. Each pixel holds the warmth of that unforgettable afternoon.', 
      secretMemory: 'Aku ingin kenangan kita memiliki rumah abadi. Tempat di mana kita bisa selalu kembali menatap kelopak pertama ini.',
      icon: GreenhouseIcon 
    },
    { 
      date: 'Every Day Since', 
      title: 'Still Growing', 
      description: 'Just as the flower never fades here, so too does my love grow a little more each day, brighter, fuller, more alive.', 
      secretMemory: 'Melewati berbagai hari bersamamu membuat rasa ini terus bertunas dan mengakar semakin dalam.',
      icon: HeartLeafIcon 
    },
    { 
      date: 'Today · Forever', 
      title: 'Timeless', 
      description: 'This greenhouse is open every hour of every day, our flower will always be waiting, always in full bloom.', 
      secretMemory: 'Masa depan masih membentang luas, dan aku ingin terus merawat taman cinta ini bersamamu tanpa akhir.',
      icon: InfinityIcon, 
      isLast: true 
    },
  ], []);

  const [cols, setCols] = useState(4);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const check = () => setCols(window.innerWidth < 640 ? 2 : 4);
    const onScroll = () => setShowTop(window.scrollY > 400);
    check();
    window.addEventListener('resize', check, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const subtitle = useTypewriter('Preserving Our First Flower, forever in bloom', 44, 400);
  const showCursor = subtitle.length < 45;

  const lightboxPhotos = useMemo(() => {
    if (lightbox === 'hero') return [heroPhoto];
    return photos;
  }, [lightbox, heroPhoto, photos]);

  return (
    <>
      <ScrollProgressBar />
      <CursorSparkle />

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox 
            photos={lightboxPhotos} 
            startIndex={lightbox === 'hero' ? 0 : lightbox} 
            onClose={onClose} 
          />
        )}
      </AnimatePresence>

      <PetalBurstLayer bursts={bursts} />

      <div
        style={{ position: 'relative', minHeight: '100vh', paddingBottom: 60, opacity: 1, overflow: 'hidden' }}
        onClick={e => triggerBurst(e.clientX, e.clientY)}>
        {/* ── Sunbeams Shimmer (Diagonal Light Rays) ── */}
        <div className="sunbeam-ray" />
        <div className="sunbeam-ray" style={{ left: '25vw', animationDelay: '-7s', opacity: 0.2 }} />

        {/* ── Botanical Corner Foliage (Vines & Wild Rose Buds) ── */}
        <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 3 }}>
          <VineCornerSVG width={135} height={135} />
        </div>
        <div style={{ position: 'fixed', top: 0, right: 0, pointerEvents: 'none', zIndex: 3, transform: 'scaleX(-1)' }}>
          <VineCornerSVG width={135} height={135} />
        </div>

        {/* ── Fairy Lights Garland across ceiling ── */}
        <FairyLightsGarland />

        {/* ── Vellum aged paper texture overlay ── */}
        <VellumOverlay />

        {/* ── Starfield bokeh parallax layer ── */}
        <StarfieldBokeh />

        {/* ── Morphing ink blobs behind hero ── */}
        <InkBlobs />

        <PollenParticles />
        <Fireflies />
        <FallingPetals />

        {/* ── Drifting botanical butterflies ── */}
        <DriftingButterflies />

        {/* ── Floating dandelion seeds drifting upward ── */}
        <FloatingDandelionSeeds />

        {/* ── Constellation dotted lines forming flower shapes ── */}
        <ConstellationLines />

        {/* ══ HERO ══ */}
        <section style={{
            position: 'relative', zIndex: 10, minHeight: '100vh',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center', padding: '40px 24px', overflow: 'hidden',
          }}>
            {/* decorative rings */}
            {[520, 400].map((sz, i) => (
              <div key={i} style={{
                position: 'absolute', width: sz, height: sz, borderRadius: '50%', pointerEvents: 'none',
                border: `${i === 0 ? 2 : 1}px ${i === 0 ? 'dashed' : 'solid'} rgba(45,106,79,0.16)`,
                animation: `${i === 0 ? 'spinSlow' : 'spinSlowRev'} 32s linear infinite`,
                willChange: 'transform',
              }} />
            ))}

            {/* label with conservatory pill badge */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                marginBottom: 20, padding: '6px 18px', borderRadius: 30,
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(45,106,79,0.22)',
                boxShadow: '0 4px 18px rgba(45,106,79,0.08)',
                backdropFilter: 'blur(8px)',
              }}>
              <DaisyIcon size={24} style={{ animation: 'floatUp 4s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.34em', textTransform: 'uppercase', color: C.mid }}>
                Digital Greenhouse
              </span>
              <DaisyIcon size={24} style={{ animation: 'floatUp 4s ease-in-out infinite', animationDelay: '1.2s', flexShrink: 0 }} />
            </motion.div>

            {/* title */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.38 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h1 style={{
                  fontFamily: "'Playfair Display',serif", fontWeight: 700, lineHeight: 1.12,
                  color: C.deep, fontSize: 'clamp(2.3rem,6.2vw,5.2rem)', marginBottom: 6,
                  textShadow: '0 2px 14px rgba(45,106,79,0.12)',
                }}>
                  The Digital
                </h1>
              </div>
              <p style={{
                fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(3.2rem,9.5vw,7.4rem)',
                color: C.mid, lineHeight: 1.05, marginBottom: 16,
                textShadow: '0 4px 20px rgba(82,183,136,0.25)',
              }}>
                Greenhouse
              </p>
              {/* typewriter */}
              <p style={{
                fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                fontSize: '1.06rem', color: C.deep, opacity: 0.7,
                marginBottom: 44, minHeight: '1.6em', letterSpacing: '0.02em',
              }}>
                {subtitle}
                {showCursor && <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 2, color: C.mid }}>|</span>}
              </p>
            </motion.div>

            {/* hero card */}
            <motion.div initial={{ opacity: 0, scale: 0.84, y: 28 }} animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -12, scale: 1.025 }} onClick={() => setLightbox('hero')}
              style={{
                ...glass, borderRadius: 28, padding: 14, width: '100%', maxWidth: 340,
                cursor: 'zoom-in', position: 'relative',
                boxShadow: '0 20px 70px rgba(45,106,79,0.17), 0 0 0 1px rgba(255,255,255,0.5)',
              }}>

              <div style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '3/4' }}>
                <motion.img src="/images/hero_bouquet.jpg" alt="Buket mawar merah dan daisy putih"
                  loading="eager"
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.8 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>

              {/* Floating rose badge */}
              <motion.div animate={{ y: [0, -7, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: -20, right: -20,
                  ...glass, width: 58, height: 58, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(230,57,70,0.3)',
                  zIndex: 10,
                }}>
                <RoseIcon size={38} />
              </motion.div>

              <div style={{ paddingTop: 12, paddingBottom: 5, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <SparkleIcon size={16} color={C.light} />
                <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '2rem', color: C.mid }}>Never Fades</p>
                <SparkleIcon size={16} color={C.light} />
              </div>
            </motion.div>

            {/* scroll cue */}
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: 30, color: C.mid, opacity: 0.4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <LeafBranchIcon size={22} color={C.mid} style={{ opacity: 0.5, transform: 'rotate(180deg)' }} />
              <ChevronDown size={24} />
            </motion.div>

            {/* Candle pair — left */}
            <CandlePair style={{ position: 'absolute', left: '6%', bottom: '12%' }} />
            {/* Candle pair — right */}
            <CandlePair style={{ position: 'absolute', right: '6%', bottom: '12%' }} />
          </section>

        {/* ══ WATERCOLOR WASH DIVIDER ══ */}
        <div className="watercolor-divider"><WatercolorDividerSVG /></div>

        {/* ══ SVG ROSE ══ */}
        <section style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '56px 24px 16px' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.5rem,3.5vw,2.3rem)', color: C.deep }}>
              Blooming Just for You
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 10, opacity: 0.5 }}>
              <LeafBranchIcon size={24} color={C.mid} />
              <p style={{ fontSize: '0.8rem', color: C.mid }}>Forever preserved in love</p>
              <LeafBranchIcon size={24} color={C.mid} style={{ transform: 'scaleX(-1)' }} />
            </div>
          </motion.div>
          <SvgRose />
        </section>

        {/* ══ GALLERY ══ */}
        <section style={{ position: 'relative', zIndex: 10, maxWidth: 1080, margin: '0 auto', padding: '32px 24px 80px', borderRadius: 32, overflow: 'hidden' }}>
          {/* Soft watercolor wash background for entire gallery */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(216,243,220,0.55) 0%, transparent 70%), radial-gradient(ellipse at 100% 100%, rgba(244,194,194,0.25) 0%, transparent 60%), radial-gradient(ellipse at 0% 80%, rgba(180,220,210,0.3) 0%, transparent 55%)',
          }} />

          {/* Greenhouse Cathedral Glass Arch in background */}
          <div style={{ position: 'absolute', top: -35, left: 0, right: 0, height: 380, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
            <GreenhouseArchSVG width="100%" height={380} opacity={0.12} />
          </div>

          {/* Pressed botanical flourishes — larger and more prominent */}
          <div className="gallery-dried-botanical" style={{ top: 8, left: -14, transform: 'rotate(-28deg)' }}>
            <PressedFlowerSVG size={88} opacity={0.55} />
          </div>
          <div className="gallery-dried-botanical" style={{ top: 8, right: -14, transform: 'scaleX(-1) rotate(-28deg)' }}>
            <PressedFlowerSVG size={88} opacity={0.55} />
          </div>
          {/* Additional smaller pressed botanicals at bottom corners */}
          <div className="gallery-dried-botanical" style={{ bottom: 18, left: 8, transform: 'rotate(155deg)', opacity: 0.35 }}>
            <PressedFlowerSVG size={52} opacity={0.9} />
          </div>
          <div className="gallery-dried-botanical" style={{ bottom: 18, right: 8, transform: 'scaleX(-1) rotate(155deg)', opacity: 0.35 }}>
            <PressedFlowerSVG size={52} opacity={0.9} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 32, position: 'relative' }}>
            {/* Vintage botanical postmark stamp */}
            <div style={{ position: 'absolute', top: -10, right: '8%', pointerEvents: 'none', display: 'inline-block' }}>
              <BotanicalPostmarkSVG size={78} />
            </div>
            {/* Mirrored postmark on left */}
            <div style={{ position: 'absolute', top: -10, left: '8%', pointerEvents: 'none', display: 'inline-block', transform: 'scaleX(-1)', opacity: 0.5 }}>
              <BotanicalPostmarkSVG size={62} />
            </div>

            {/* Ink brush stroke behind gallery title */}
            <div className="brush-stroke-wrap" style={{ top: 52, width: '70%' }}>
              <InkBrushStrokeSVG width="100%" color={C.deep} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
                <RoseBudIcon size={38} />
              </motion.div>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                <DaisyIcon size={38} />
              </motion.div>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                <RoseBudIcon size={38} />
              </motion.div>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,3rem)', color: C.deep, marginBottom: 8, letterSpacing: '-0.01em' }}>
              A Memory in Four Frames
            </h2>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(0.85rem,2vw,1.05rem)', color: C.mid, opacity: 0.72, marginBottom: 0, letterSpacing: '0.04em' }}>
              preserved in light, carried in heart
            </p>
          </motion.div>

          {/* Fairy light clothesline — twin-wire with wooden pole brackets */}
          <div style={{ position: 'relative', height: 38, marginBottom: 10, pointerEvents: 'none' }}>
            <svg width="100%" height="38" viewBox="0 0 1000 38" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              {/* Left pole bracket */}
              <rect x="0" y="0" width="6" height="38" rx="2" fill="#7a5c38" opacity="0.55" />
              {/* Right pole bracket */}
              <rect x="994" y="0" width="6" height="38" rx="2" fill="#7a5c38" opacity="0.55" />
              {/* Main hanging string wire (lower) */}
              <path d="M6,12 Q250,30 500,18 Q750,32 994,12" fill="none" stroke="#5c4a30" strokeWidth="1.4" opacity="0.5" />
              {/* Secondary thin wire (upper) */}
              <path d="M6,8 Q250,20 500,13 Q750,22 994,8" fill="none" stroke="#8a7060" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.3" />
              {/* Hanging mini fairy light bulbs */}
              {[55, 155, 265, 380, 495, 615, 730, 845, 945].map((cx, idx) => {
                const cy = 22 + (idx % 3 === 0 ? 4 : idx % 3 === 1 ? 0 : 2);
                const warm = idx % 2 === 0;
                return (
                  <g key={idx}>
                    {/* Drop wire */}
                    <line x1={cx} y1={cy - 9} x2={cx} y2={cy - 3} stroke="#4a3e2d" strokeWidth="0.9" />
                    {/* Bulb body */}
                    <ellipse cx={cx} cy={cy + 2} rx="4" ry="5" fill={warm ? '#fff9e6' : '#fff0f3'} />
                    {/* Glow corona */}
                    <ellipse cx={cx} cy={cy + 2} rx="8" ry="9"
                      fill={warm ? 'rgba(255,210,100,0.45)' : 'rgba(255,160,190,0.4)'}
                      style={{ animation: `pulseGlow 2.8s ease-in-out ${idx * 0.28}s infinite` }}
                    />
                    {/* Tiny bright highlight on bulb */}
                    <ellipse cx={cx - 1.5} cy={cy - 0.5} rx="1.2" ry="1.5" fill="rgba(255,255,255,0.85)" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Ambient aurora shimmer layer behind the grid */}
          <div style={{
            position: 'absolute', top: 120, left: 0, right: 0, bottom: 0,
            pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.05) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(82,183,136,0.06) 0%, transparent 50%), radial-gradient(ellipse at 55% 85%, rgba(244,162,97,0.04) 0%, transparent 50%)',
          }} />

          {/* Ambient floating rose petals drifting through gallery space */}
          <GalleryFloatingPetals />

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: 22, position: 'relative', zIndex: 2 }}>
            {photos.map((p, i) => (
              <TiltCard 
                key={p.src} 
                index={i} 
                src={p.src} 
                alt={p.caption} 
                caption={p.caption} 
                date={p.date} 
                note={p.note} 
                onClick={() => setLightbox(i)} 
              />
            ))}
          </div>

          {/* Leaf litter scattered at the greenhouse floor */}
          <LeafLitterFloor />
        </section>

        {/* ══ WATERCOLOR WASH DIVIDER (flipped) ══ */}
        <div className="watercolor-divider"><WatercolorDividerSVG flip /></div>

        {/* ══ LOVE LETTER ══ */}
        <div style={{ background: 'rgba(212,234,220,0.3)', paddingTop: 52, paddingBottom: 10 }}>
          <LoveLetter />
        </div>

        <WaveDivider color="rgba(196,228,210,0.5)" />

        {/* ══ VIRTUAL HUG ══ */}
        <div style={{ background: 'rgba(255,240,245,0.25)', paddingTop: 10, paddingBottom: 10 }}>
          <VirtualHug />
        </div>

        <WaveDivider flip color="rgba(196,228,210,0.4)" />

        {/* ══ ENCHANTED ROSE DOME ══ */}
        <EnchantedRoseDomeSection />


        <WaveDivider flip color="rgba(196,228,210,0.4)" />

        {/* ══ VIRTUAL ROSE GARDEN ══ */}
        <VirtualRoseGarden />

        <WaveDivider color="rgba(196,228,210,0.5)" />

        {/* ══ TIMELINE ══ */}
        <section style={{ position: 'relative', zIndex: 10, maxWidth: 660, margin: '0 auto', padding: '52px 24px 72px' }}>
          {/* Rosewood grain texture panel */}
          <div className="rosewood-panel" style={{ borderRadius: 32, opacity: 0.7 }} />

          {/* Thorn vine border decoration */}
          <div style={{ position: 'absolute', top: 0, right: 0, pointerEvents: 'none', opacity: 0.6 }}>
            <ThornVineSVG width={160} height={120} animated />
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75 }} style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <ClockLeafIcon size={36} color={C.mid} style={{ opacity: 0.7 }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.7rem,4vw,2.8rem)', color: C.deep, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <BloomRoseBud size={20} delay={200} />
              The Journey
              <BloomRoseBud size={20} delay={400} />
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <FloralDivider width={200} color={C.mid} opacity={0.28} />
            </div>
            <p style={{ fontSize: '0.85rem', color: C.deep, opacity: 0.42, marginTop: 10 }}>From a single bouquet to a timeless memory</p>
          </motion.div>
          <div style={{ paddingLeft: 4 }}>
            {timeline.map((item, i) => (
              <TimelineItem 
                key={i} 
                index={i} 
                date={item.date} 
                title={item.title} 
                description={item.description}
                secretMemory={item.secretMemory}
                icon={item.icon} 
                isLast={item.isLast} 
                delay={i * 0.12} 
              />
            ))}
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px 56px' }}>
          <div style={{ ...glass, borderRadius: 24, maxWidth: 420, margin: '0 auto', padding: '36px 32px', position: 'relative' }}>
            {/* Silk Ribbon Bow as a gift ornament on footer */}
            <div style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <RibbonBowSVG size={60} color="#1b4332" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, marginTop: 10 }}>
              <FloralDivider width={180} color={C.mid} opacity={0.35} />
            </div>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '2.8rem', color: C.mid, margin: '8px 0' }}>
              With all my love
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <FloralDivider width={180} color={C.mid} opacity={0.35} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <LeafBranchIcon size={28} color={C.mid} style={{ opacity: 0.6 }} />
              <RoseBudIcon size={32} />
              <LeafBranchIcon size={28} color={C.mid} style={{ opacity: 0.6, transform: 'scaleX(-1)' }} />
            </div>
            <p style={{ fontSize: '0.77rem', color: C.deep, opacity: 0.4, letterSpacing: '0.05em' }}>
              This greenhouse never closes · {new Date().getFullYear()}
            </p>
          </div>
        </motion.footer>

        {/* ══ FLOATING ROSE MUSIC PLAYER ══ */}
        <RoseVinylPlayer />

        {/* ══ FLOATING BACK TO TOP BUTTON ══ */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.35 }}
              onClick={scrollToTop}
              className="back-to-top-btn"
              title="Kembali ke atas"
            >
              <RoseBudIcon size={28} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
