import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
type ScribeState =
  | "sleeping"
  | "stirring"
  | "awake"
  | "annoyed"
  | "doodling"
  | "yawning"
  | "peeking"
  | "writing"
  | "grumpy";

type Doodle = {
  id: number;
  x: number;
  y: number;
  type: "star" | "spiral" | "heart" | "squiggle" | "moon" | "flower";
  rotation: number;
  scale: number;
};

type Bubble = {
  id: number;
  text: string;
  x: number;
  y: number;
};

// ── Constants ─────────────────────────────────────────────────────────────────
const SLEEP_TIMEOUT = 5000;
const DOODLE_SHAPES = ["star", "spiral", "heart", "squiggle", "moon", "flower"] as const;

const POKE_REACTIONS = [
  "Zzz...!",
  "Mmph!",
  "Five more minutes...",
  "Go away.",
  "*snort*",
  "Wha—?!",
  "Leave me be!",
  "I'm WORKING.",
  "...zz",
  "The deadline can wait.",
];

const AWAKE_MUTTERINGS = [
  "Fine. I'm up.",
  "This had better be important.",
  "You again.",
  "What do you want?",
  "I was having the best dream...",
];

const ZZZ_POSITIONS = [
  { x: 68, y: 20, size: 14, delay: 0 },
  { x: 76, y: 12, size: 18, delay: 0.4 },
  { x: 86, y: 5, size: 22, delay: 0.8 },
];

// ── SVG Doodle Shapes ─────────────────────────────────────────────────────────
function DoodleShape({ type }: { type: Doodle["type"] }) {
  const color = "#5a3a1a";
  const stroke = { stroke: color, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "star":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" {...stroke} />
        </svg>
      );
    case "spiral":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12,12 Q14,8 12,6 Q8,4 6,8 Q4,14 8,17 Q14,20 18,15 Q22,8 16,4" {...stroke} />
        </svg>
      );
    case "heart":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12,20 Q4,14 4,8 Q4,4 8,4 Q10,4 12,7 Q14,4 16,4 Q20,4 20,8 Q20,14 12,20Z" {...stroke} />
        </svg>
      );
    case "squiggle":
      return (
        <svg width="28" height="16" viewBox="0 0 28 16">
          <path d="M2,8 Q5,2 8,8 Q11,14 14,8 Q17,2 20,8 Q23,14 26,8" {...stroke} />
        </svg>
      );
    case "moon":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <path d="M16,11 Q16,18 9,19 Q4,19 2,14 Q0,9 4,5 Q7,2 11,3 Q7,6 7,11 Q7,17 12,18 Q16,17 16,11Z" {...stroke} />
        </svg>
      );
    case "flower":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" {...stroke} />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            const x = 12 + Math.cos(rad) * 6;
            const y = 12 + Math.sin(rad) * 6;
            return <circle key={a} cx={x} cy={y} r="2.5" {...stroke} />;
          })}
        </svg>
      );
  }
}

// ── Scribe SVG ────────────────────────────────────────────────────────────────
function ScribeFigure({ state }: { state: ScribeState }) {
  const isSleeping = state === "sleeping" || state === "stirring";
  const isHappy = state === "doodling" || state === "writing";
  const isGrouchy = state === "annoyed" || state === "grumpy";

  return (
    <svg width="120" height="130" viewBox="0 0 120 130" style={{ overflow: "visible" }}>
      {/* Robe / body */}
      <motion.ellipse
        cx="60" cy="105"
        rx="32" ry="22"
        fill="#8b6914"
        animate={{ scaleX: isSleeping ? 1.05 : 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.path
        d="M30,90 Q35,115 60,118 Q85,115 90,90 Q80,82 60,82 Q40,82 30,90Z"
        fill="#a07820"
        animate={{ scaleX: isSleeping ? [1, 1.03, 1] : 1 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Arms - slumped when sleeping, active when awake */}
      {isSleeping ? (
        <>
          {/* Left arm slumped on desk */}
          <motion.path
            d="M38,92 Q20,100 18,108"
            stroke="#8b6914" strokeWidth="10" fill="none" strokeLinecap="round"
            animate={{ rotate: [0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "38px 92px" }}
          />
          {/* Right arm slumped */}
          <motion.path
            d="M82,92 Q100,100 102,108"
            stroke="#8b6914" strokeWidth="10" fill="none" strokeLinecap="round"
            animate={{ rotate: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "82px 92px" }}
          />
          {/* Hands flat */}
          <ellipse cx="17" cy="110" rx="8" ry="5" fill="#c4956a" />
          <ellipse cx="103" cy="110" rx="8" ry="5" fill="#c4956a" />
        </>
      ) : (
        <>
          {/* Left arm up */}
          <motion.path
            d="M38,92 Q24,85 22,75"
            stroke="#8b6914" strokeWidth="10" fill="none" strokeLinecap="round"
            animate={isHappy ? { rotate: [-5, 5, -5] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ transformOrigin: "38px 92px" }}
          />
          {/* Right arm up / writing */}
          <motion.path
            d="M82,92 Q96,85 98,75"
            stroke="#8b6914" strokeWidth="10" fill="none" strokeLinecap="round"
            animate={state === "writing" || state === "doodling" ? { rotate: [-8, 8, -8] } : {}}
            transition={{ duration: 0.4, repeat: Infinity }}
            style={{ transformOrigin: "82px 92px" }}
          />
          <ellipse cx="22" cy="73" rx="7" ry="5" fill="#c4956a" />
          {/* Quill in right hand */}
          {(state === "writing" || state === "doodling") && (
            <motion.g
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              style={{ transformOrigin: "98px 73px" }}
            >
              <ellipse cx="98" cy="73" rx="7" ry="5" fill="#c4956a" />
              <path d="M100,68 Q108,55 114,45 Q110,50 105,62" fill="#f5e6c8" stroke="#8b6914" strokeWidth="0.5" />
            </motion.g>
          )}
          {!["writing", "doodling"].includes(state) && (
            <ellipse cx="98" cy="73" rx="7" ry="5" fill="#c4956a" />
          )}
        </>
      )}

      {/* Neck */}
      <rect x="52" y="68" width="16" height="16" rx="4" fill="#c4956a" />

      {/* Head */}
      <motion.ellipse
        cx="60" cy="52"
        rx="26" ry="28"
        fill="#d4a574"
        animate={isSleeping
          ? { rotate: [0, 8, 0] }
          : state === "yawning"
            ? { scaleY: [1, 1.05, 1] }
            : {}}
        transition={{ duration: isSleeping ? 3 : 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 52px" }}
      />

      {/* Hat */}
      <ellipse cx="60" cy="28" rx="30" ry="6" fill="#3d2006" />
      <rect x="44" y="4" width="32" height="26" rx="4" fill="#4a2808" />
      <rect x="48" y="8" width="24" height="4" rx="2" fill="#8b6914" opacity="0.5" />

      {/* Eyes */}
      {isSleeping ? (
        <>
          {/* Closed eyes - curved lines */}
          <path d="M48,50 Q52,47 56,50" stroke="#3d2006" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M64,50 Q68,47 72,50" stroke="#3d2006" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : state === "peeking" ? (
        <>
          {/* One eye open, one closed */}
          <circle cx="52" cy="50" r="5" fill="#fff" />
          <circle cx="52" cy="51" r="3" fill="#3d2006" />
          <circle cx="53" cy="50" r="1" fill="#fff" />
          <path d="M64,50 Q68,47 72,50" stroke="#3d2006" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : state === "yawning" ? (
        <>
          {/* Half-open sleepy eyes */}
          <ellipse cx="52" cy="50" rx="5" ry="3" fill="#fff" />
          <ellipse cx="52" cy="51" rx="3" ry="2" fill="#3d2006" />
          <ellipse cx="68" cy="50" rx="5" ry="3" fill="#fff" />
          <ellipse cx="68" cy="51" rx="3" ry="2" fill="#3d2006" />
        </>
      ) : (
        <>
          {/* Full open eyes */}
          <circle cx="52" cy="50" r="5" fill="#fff" />
          <circle cx="52" cy={isGrouchy ? "52" : "50"} r="3" fill="#3d2006" />
          <circle cx="53" cy="49" r="1" fill="#fff" />
          <circle cx="68" cy="50" r="5" fill="#fff" />
          <circle cx="68" cy={isGrouchy ? "52" : "50"} r="3" fill="#3d2006" />
          <circle cx="69" cy="49" r="1" fill="#fff" />
        </>
      )}

      {/* Eyebrows */}
      {isGrouchy ? (
        <>
          <path d="M46,44 Q52,40 57,43" stroke="#3d2006" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M63,43 Q68,40 74,44" stroke="#3d2006" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : isSleeping ? null : (
        <>
          <path d="M47,44 Q52,42 57,44" stroke="#3d2006" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M63,44 Q68,42 73,44" stroke="#3d2006" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Mouth */}
      {isSleeping ? (
        /* Slightly open sleeping mouth */
        <ellipse cx="60" cy="63" rx="5" ry="3" fill="#8b4513" opacity="0.6" />
      ) : state === "yawning" ? (
        /* Big yawn */
        <motion.ellipse
          cx="60" cy="64"
          animate={{ ry: [4, 10, 4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          rx="10" fill="#8b4513"
        />
      ) : state === "annoyed" || state === "grumpy" ? (
        /* Flat grumpy line */
        <path d="M52,64 Q60,61 68,64" stroke="#5a2d0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        /* Small smile */
        <path d="M52,62 Q60,68 68,62" stroke="#5a2d0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* Beard */}
      <path
        d="M42,68 Q44,80 60,82 Q76,80 78,68 Q70,72 60,73 Q50,72 42,68Z"
        fill="#c8a96e" opacity="0.7"
      />

      {/* Mustache */}
      <path d="M48,58 Q52,55 60,58 Q68,55 72,58" stroke="#8b6914" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── Speech Bubble ─────────────────────────────────────────────────────────────
function SpeechBubble({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        position: "absolute",
        left: x, top: y,
        background: "linear-gradient(135deg, #fdf6e3, #f5e6c8)",
        border: "1.5px solid #8b6914",
        borderRadius: "12px 12px 12px 2px",
        padding: "8px 14px",
        fontFamily: "EB Garamond, serif",
        fontSize: "0.82rem",
        color: "#2a1400",
        fontStyle: "italic",
        whiteSpace: "normal" as const,
        boxShadow: "2px 3px 12px rgba(0,0,0,0.25)",
        zIndex: 20,
        pointerEvents: "none",
        maxWidth: 200,
      }}
    >
      {text}
      {/* Tail */}
      <div style={{
        position: "absolute",
        bottom: -8, left: 12,
        width: 0, height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: "8px solid #8b6914",
      }} />
      <div style={{
        position: "absolute",
        bottom: -6, left: 13,
        width: 0, height: 0,
        borderLeft: "7px solid transparent",
        borderRight: "3px solid transparent",
        borderTop: "7px solid #fdf6e3",
      }} />
    </motion.div>
  );
}

// ── Zzz Float ─────────────────────────────────────────────────────────────────
function ZzzFloat() {
  return (
    <>
      {ZZZ_POSITIONS.map((z, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: -30, x: i * 4 }}
          transition={{
            duration: 2.5,
            delay: z.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            left: `${z.x}%`,
            top: `${z.y}%`,
            fontFamily: "Cinzel Decorative, serif",
            fontSize: z.size,
            color: "#8b6914",
            opacity: 0,
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: 700,
          }}
        >
          z
        </motion.div>
      ))}
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Game() {
  const [state, setState] = useState<ScribeState>("sleeping");
  const [doodles, setDoodles] = useState<Doodle[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [pokeCount, setPokeCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nextDoodleId, setNextDoodleId] = useState(0);
  const [hint, setHint] = useState(true);

  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef<ScribeState>("sleeping");
  const scribeControls = useAnimation();
  const pageRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/refs
  stateRef.current = state;

  const clearSleepTimer = () => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
  };

  const scheduleSleep = useCallback(() => {
    clearSleepTimer();
    sleepTimerRef.current = setTimeout(() => {
      setState("sleeping");
    }, SLEEP_TIMEOUT);
  }, []);

  // Add a speech bubble that auto-removes
  const addBubble = useCallback((text: string, x: number, y: number) => {
    const id = Date.now();
    setBubbles(prev => [...prev, { id, text, x, y }]);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 2800);
  }, []);

  // Add a doodle at position
  const addDoodle = useCallback((x: number, y: number) => {
    setNextDoodleId(id => {
      const newId = id + 1;
      const type = DOODLE_SHAPES[Math.floor(Math.random() * DOODLE_SHAPES.length)];
      setDoodles(prev => [
        ...prev.slice(-14), // keep max 15 doodles
        {
          id: newId,
          x: x - 12 + Math.random() * 20 - 10,
          y: y - 12 + Math.random() * 20 - 10,
          type,
          rotation: Math.random() * 60 - 30,
          scale: 0.7 + Math.random() * 0.6,
        }
      ]);
      return newId;
    });
  }, []);

  // Handle clicking/poking the scribe
  const handlePoke = useCallback(() => {
    setHint(false);
    clearSleepTimer();
    const currentState = stateRef.current;

    setPokeCount(c => c + 1);

    if (currentState === "sleeping" || currentState === "stirring") {
      // Wake up sequence
      scribeControls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.4 }
      });
      setState("stirring");
      setTimeout(() => {
        const reaction = POKE_REACTIONS[Math.floor(Math.random() * POKE_REACTIONS.length)];
        addBubble(reaction, 10, -60);
        setState("awake");
        scheduleSleep();
      }, 300);

    } else if (currentState === "awake" || currentState === "peeking") {
      scribeControls.start({
        rotate: [0, -5, 5, -3, 3, 0],
        transition: { duration: 0.3 }
      });
      const muttering = AWAKE_MUTTERINGS[Math.floor(Math.random() * AWAKE_MUTTERINGS.length)];
      addBubble(muttering, 10, -60);
      setState("annoyed");
      setTimeout(() => scheduleSleep(), 400);

    } else if (currentState === "annoyed" || currentState === "grumpy") {
      scribeControls.start({
        x: [0, -15, 15, -10, 10, 0],
        transition: { duration: 0.5 }
      });
      addBubble("I said GO AWAY!", 10, -70);
      setState("grumpy");
      scheduleSleep();

    } else {
      const reaction = POKE_REACTIONS[Math.floor(Math.random() * POKE_REACTIONS.length)];
      addBubble(reaction, 10, -60);
      setState("annoyed");
      scheduleSleep();
    }
  }, [addBubble, scheduleSleep, scribeControls]);

  // Handle clicking the page/desk area to make him doodle
  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!pageRef.current) return;
    const rect = pageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const currentState = stateRef.current;
    if (currentState === "sleeping") return;

    setHint(false);
    clearSleepTimer();

    setState("doodling");
    addDoodle(x, y);

    setTimeout(() => {
      setState("awake");
      scheduleSleep();
    }, 600);
  }, [addDoodle, scheduleSleep]);

  // Periodic idle behaviours when awake
  useEffect(() => {
    if (state !== "sleeping") return;
    // Occasionally peek while "sleeping"
    const peek = setInterval(() => {
      if (stateRef.current === "sleeping" && Math.random() < 0.3) {
        setState("peeking");
        setTimeout(() => {
          if (stateRef.current === "peeking") setState("sleeping");
        }, 1500);
      }
    }, 6000);
    return () => clearInterval(peek);
  }, [state]);

  // Yawn occasionally when awake
  useEffect(() => {
    if (state !== "awake") return;
    const yawn = setTimeout(() => {
      if (stateRef.current === "awake") {
        setState("yawning");
        addBubble("*yaaawn*", 10, -60);
        setTimeout(() => {
          if (stateRef.current === "yawning") setState("awake");
        }, 2000);
      }
    }, 3500);
    return () => clearTimeout(yawn);
  }, [state, addBubble]);

  // Writing state when awake for a while
  useEffect(() => {
    if (state !== "awake") return;
    const write = setTimeout(() => {
      if (stateRef.current === "awake") {
        setState("writing");
        setTimeout(() => {
          if (stateRef.current === "writing") setState("awake");
        }, 2500);
      }
    }, 2000);
    return () => clearTimeout(write);
  }, [state]);

  // Body breathing animation when sleeping
  const isSleeping = state === "sleeping" || state === "stirring" || state === "peeking";

  return (
    <section id="game" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      background: "linear-gradient(160deg, #1a0e06 0%, #0d0805 50%, #1a0e06 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "EB Garamond, serif",
      userSelect: "none",
    }}>

      {/* Warm candlelight glow */}
      <motion.div
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 600, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,160,40,0.12) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: 32, zIndex: 2 }}
      >
        <div style={{
          fontSize: "0.68rem", letterSpacing: "0.4em",
          color: "#c8a96e", textTransform: "uppercase", opacity: 0.65, marginBottom: 6,
        }}>
          An Interlude
        </div>
        <h2 style={{
          fontFamily: "Cinzel Decorative, serif",
          fontSize: "clamp(1rem, 2.8vw, 1.6rem)",
          color: "#f5e6c8", margin: 0,
          textShadow: "0 0 30px rgba(200,169,110,0.25)",
        }}>
          The Sleeping Scribe
        </h2>
        <p style={{
          color: "rgba(200,169,110,0.5)", fontSize: "0.85rem",
          fontStyle: "italic", marginTop: 8, marginBottom: 0,
        }}>
          Disturb him at your peril. Or click the page to let him doodle.
        </p>
      </motion.div>

      {/* Main desk / page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: "relative", zIndex: 2, width: "min(580px, 94vw)" }}
      >

        {/* Desk surface */}
        <div style={{
          background: "linear-gradient(180deg, #3d2006 0%, #2a1404 100%)",
          borderRadius: "4px 4px 8px 8px",
          padding: "14px 20px 18px",
          boxShadow: "0 16px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(200,169,110,0.15)",
        }}>

          {/* Parchment page */}
          <div
            ref={pageRef}
            onClick={handlePageClick}
            style={{
              position: "relative",
              background: "linear-gradient(145deg, #f7edd4 0%, #f0e0a8 40%, #ecdaa0 100%)",
              borderRadius: "2px 2px 0 0",
              minHeight: 320,
              cursor: state === "sleeping" ? "default" : "crosshair",
              boxShadow: "inset 0 0 30px rgba(139,105,20,0.1), 0 2px 8px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Page lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: 60, right: 16,
                top: 32 + i * 24,
                height: 1,
                background: "rgba(139,100,20,0.08)",
                pointerEvents: "none",
              }} />
            ))}
            {/* Margin */}
            <div style={{
              position: "absolute", left: 56, top: 0, bottom: 0,
              width: 1, background: "rgba(180,40,40,0.1)",
              pointerEvents: "none",
            }} />

            {/* Doodles on the page */}
            <AnimatePresence>
              {doodles.map(d => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, scale: 0.3, rotate: d.rotation - 20 }}
                  animate={{ opacity: 0.65, scale: d.scale, rotate: d.rotation }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  style={{
                    position: "absolute",
                    left: d.x, top: d.y,
                    pointerEvents: "none",
                    transformOrigin: "center",
                  }}
                >
                  <DoodleShape type={d.type} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Scribe character */}
            <div style={{
              position: "absolute",
              bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              zIndex: 5,
            }}>
              {/* Speech bubbles */}
              <AnimatePresence>
                {bubbles.map(b => (
                  <SpeechBubble key={b.id} text={b.text} x={b.x} y={b.y} />
                ))}
              </AnimatePresence>

              {/* Zzz floaties */}
              {isSleeping && <ZzzFloat />}

              {/* The scribe himself */}
              <motion.div
                animate={scribeControls}
                onClick={(e) => { e.stopPropagation(); handlePoke(); }}
                style={{ cursor: "pointer", display: "inline-block" }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  animate={isSleeping
                    ? { y: [0, -3, 0] }
                    : state === "yawning"
                      ? { y: [0, -2, 0] }
                      : {}}
                  transition={{
                    duration: isSleeping ? 3 : 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ScribeFigure state={state} />
                </motion.div>
              </motion.div>
            </div>

            {/* Hint text */}
            <AnimatePresence>
              {hint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "EB Garamond, serif",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    color: "rgba(100,60,10,0.5)",
                    pointerEvents: "none",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  ↓ poke the scribe ↓
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desk items row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            gap: 12,
          }}>
            {/* Inkwell */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="32" height="36" viewBox="0 0 32 36">
                <ellipse cx="16" cy="30" rx="12" ry="5" fill="#1a0e04" />
                <path d="M6,14 Q4,28 16,30 Q28,28 26,14 Q24,8 16,6 Q8,8 6,14Z" fill="#2a1a08" />
                <ellipse cx="16" cy="14" rx="10" ry="5" fill="#1a0a04" />
                <ellipse cx="16" cy="13" rx="7" ry="3" fill="#000" opacity="0.6" />
                <path d="M13,3 Q16,0 19,3" stroke="#8b6914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: "0.65rem", color: "rgba(200,169,110,0.4)", fontStyle: "italic" }}>inkwell</span>
            </div>

            {/* State label */}
            <div style={{
              flex: 1, textAlign: "center",
              fontFamily: "EB Garamond, serif",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "rgba(200,169,110,0.5)",
              letterSpacing: "0.05em",
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={state}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {state === "sleeping" ? "deeply asleep..."
                    : state === "stirring" ? "stirring..."
                    : state === "awake" ? "reluctantly awake"
                    : state === "annoyed" ? "quite annoyed"
                    : state === "grumpy" ? "very grumpy"
                    : state === "doodling" ? "doodling!"
                    : state === "yawning" ? "yawning..."
                    : state === "peeking" ? "peeking..."
                    : state === "writing" ? "pretending to work"
                    : ""}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Quill */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.65rem", color: "rgba(200,169,110,0.4)", fontStyle: "italic" }}>quill</span>
              <svg width="12" height="48" viewBox="0 0 12 48">
                <path d="M6,48 L6,12 Q10,4 12,0 Q8,6 4,12 L6,48Z" fill="#f5e6c8" stroke="#c8a96e" strokeWidth="0.5" />
                <path d="M6,48 L5,20 Q2,12 0,4 Q4,10 6,16 L6,48Z" fill="#e8d4a0" stroke="#c8a96e" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Poke counter */}
        {pokeCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: 14,
              textAlign: "center",
              fontFamily: "EB Garamond, serif",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "rgba(200,169,110,0.4)",
            }}
          >
            {pokeCount === 1 ? "You poked him once. Bold." :
             pokeCount < 4 ? `You have poked him ${pokeCount} times. He is displeased.` :
             pokeCount < 8 ? `${pokeCount} pokes. He's keeping count.` :
             `${pokeCount} pokes. You are a menace. He respects that.`}
          </motion.div>
        )}

        {/* Doodle count */}
        {doodles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: 6,
              textAlign: "center",
              fontFamily: "EB Garamond, serif",
              fontStyle: "italic",
              fontSize: "0.72rem",
              color: "rgba(200,169,110,0.35)",
            }}
          >
            {doodles.length} doodle{doodles.length > 1 ? "s" : ""} on the page · click the parchment to add more
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}