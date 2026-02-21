import { motion } from 'framer-motion';
// import InkBlot from '../ui/InkBlot';
import './../../assets/styles/Hero.css';
import profileImg from '../../assets/images/profile.jpg';
const cornerFlourish = (rotation: number, top?: string, bottom?: string, left?: string, right?: string) => (
    <svg
        width="80" height="80"
        viewBox="0 0 100 100"
        style={{
            position: 'absolute',
            top, bottom, left, right,
            transform: `rotate(${rotation}deg)`,
            opacity: 0.7,
        }}
    >
        <path
            d="M10 90 Q10 10 90 10"
            fill="none"
            stroke="#c9a94e"
            strokeWidth="2"
        />
        <path
            d="M15 85 Q15 20 80 15"
            fill="none"
            stroke="#c9a94e"
            strokeWidth="1"
            opacity="0.5"
        />
        <circle cx="90" cy="10" r="3" fill="#c9a94e" />
        <circle cx="10" cy="90" r="3" fill="#c9a94e" />
        <path
            d="M25 75 C25 40 40 25 75 25"
            fill="none"
            stroke="#c9a94e"
            strokeWidth="1"
            opacity="0.3"
        />
    </svg>
);

const easeSticky = [0.7, 0, 0.3, 1] as const;

export default function Hero() {
    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, var(--umber-dark) 0%, var(--leather) 30%, var(--umber-dark) 100%)',
            }}
        >
            {/* Leather texture */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                opacity: 0.12,
            }} />

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(26,16,8,0.8) 100%)',
            }} />

            {/* Gold border frame */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 3.2 }}
                style={{
                    position: 'absolute',
                    inset: 'clamp(20px, 4vw, 50px)',
                    border: '2px solid rgba(201,169,78,0.4)',
                    pointerEvents: 'none',
                }}
            >
                <div style={{
                    position: 'absolute', inset: '8px',
                    border: '1px solid rgba(201,169,78,0.2)',
                }} />
                {cornerFlourish(0, '-10px', undefined, '-10px', undefined)}
                {cornerFlourish(90, '-10px', undefined, undefined, '-10px')}
                {cornerFlourish(270, undefined, '-10px', '-10px', undefined)}
                {cornerFlourish(180, undefined, '-10px', undefined, '-10px')}
            </motion.div>

            {/* Center content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem',
            }}>
                {/* Medallion portrait: Stamped Seal style */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1.5, delay: 3.4, ease: easeSticky }}
                    style={{
                        position: 'relative',
                        marginBottom: '2.5rem',
                        filter: 'url(#inkBleed)',
                    }}
                >
                    <div style={{
                        width: 'clamp(140px, 25vw, 200px)',
                        height: 'clamp(140px, 25vw, 200px)',
                        padding: '10px',
                        background: 'var(--parchment-deep)',
                        border: '4px double var(--umber-dark)',
                        borderRadius: '12% 8% 15% 10% / 10% 15% 8% 12%', // Irregular border
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2), 5px 5px 15px rgba(0,0,0,0.3)',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 'inherit',
                            overflow: 'hidden',
                            border: '1px solid var(--umber)',
                        }}>
                            <img
                                src={profileImg}
                                alt="Fidha Fathima M"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    filter: 'sepia(40%) contrast(0.9) grayscale(20%)',
                                }}
                            />
                        </div>
                    </div>

                    {/* <InkBlot rotation={45} scale={1.2} position={{ top: '80%', left: '80%' }} opacity={0.3} /> */}

                    {/* Cute annotation */}
                    {/* <motion.div
                        style={{
                            position: 'absolute',
                            right: '-100px',
                            top: '20px',
                            fontFamily: 'var(--font-hand)',
                            fontSize: '1.2rem',
                            color: 'var(--gold)',
                            rotate: '15deg',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 4.5 }}
                    >
                        this is me! ✨
                    </motion.div> */}
                </motion.div>

                {/* Name: Inky Bleeding Effect */}
                <div style={{ position: 'relative' }}>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 3.8 }}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            letterSpacing: '0.08em',
                            marginBottom: '0.5rem',
                            color: 'var(--ink)',
                            filter: 'url(#inkBleed)',
                        }}
                    >
                        Fidha Fathima M
                    </motion.h1>
                    {/* <InkBlot rotation={-20} scale={0.8} position={{ top: '50%', left: '-10%' }} opacity={0.3} /> */}
                </div>

                {/* Ribbon subtitle */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 4.2 }}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        margin: '1rem 0 2.5rem',
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(90deg, transparent, var(--crimson) 15%, var(--crimson) 85%, transparent)',
                        padding: '0.5rem 3rem',
                        position: 'relative',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
                            color: 'var(--gold-light)',
                            letterSpacing: '0.35em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                        }}>
                            MERN Stack Developer
                        </p>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5, duration: 1 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '1rem',
                        color: 'var(--gold)',
                        opacity: 0.7,
                    }}>Open the Book</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a94e" strokeWidth="1.5">
                            <path d="M7 10l5 5 5-5" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
