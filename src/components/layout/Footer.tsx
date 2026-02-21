import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import '../../assets/styles/Footer.css';

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <footer
            ref={ref}
            style={{
                position: 'relative',
                padding: '3rem clamp(1.5rem, 5vw, 4rem) 2rem',
                background: 'linear-gradient(180deg, var(--parchment) 0%, var(--umber-dark) 100%)',
                textAlign: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Burn effect gradient */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(0deg, rgba(26,16,8,0.9) 0%, transparent 100%)',
                pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* End ornament */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <svg width="120" height="40" viewBox="0 0 120 40" style={{ display: 'block', margin: '0 auto' }}>
                        <line x1="10" y1="20" x2="45" y2="20" stroke="#c9a94e" strokeWidth="1" opacity="0.5" />
                        <line x1="75" y1="20" x2="110" y2="20" stroke="#c9a94e" strokeWidth="1" opacity="0.5" />
                        <circle cx="60" cy="20" r="8" fill="none" stroke="#c9a94e" strokeWidth="1" opacity="0.6" />
                        <circle cx="60" cy="20" r="3" fill="#c9a94e" opacity="0.4" />
                        <circle cx="48" cy="20" r="2" fill="#c9a94e" opacity="0.3" />
                        <circle cx="72" cy="20" r="2" fill="#c9a94e" opacity="0.3" />
                    </svg>
                </motion.div>

                {/* Finis */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        color: 'var(--gold)',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}
                >
                    Finis
                </motion.p>

                {/* Colophon */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.5 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.9rem',
                        color: 'var(--gold-light)',
                        maxWidth: '400px',
                        margin: '0 auto 0.8rem',
                        lineHeight: 1.6,
                    }}
                >
                    This folio was crafted with passion and code in the year 2026
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.3 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'var(--parchment-deep)',
                        letterSpacing: '0.15em',
                    }}
                >
                    © Fidha Fathima M — All rights reserved
                </motion.p>
            </div>
        </footer>
    );
}
