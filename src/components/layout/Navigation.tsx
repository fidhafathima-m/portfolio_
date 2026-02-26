import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../assets/styles/Navigation.css';

const chapters = [
    { id: 'hero', label: 'Cover', numeral: 'I' },
    { id: 'about', label: 'About', numeral: 'II' },
    { id: 'skills', label: 'Skills', numeral: 'III' },
    { id: 'projects', label: 'Works', numeral: 'IV' },
    { id: 'education', label: 'Study', numeral: 'V' },
    { id: 'game', label: 'Game', numeral: 'VI' },
    { id: 'contact', label: 'Letter', numeral: 'VII' },
];

export default function Navigation() {
    const [active, setActive] = useState('hero');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = chapters.map(c => document.getElementById(c.id));
            let current = 'hero';
            for (const sec of sections) {
                if (sec) {
                    const rect = sec.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3) {
                        current = sec.id;
                    }
                }
            }
            setActive(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile toggle */}
            <motion.button
                className="nav-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '1.5rem',
                    zIndex: 10002,
                    width: 48,
                    height: 48,
                    border: '2px solid var(--gold)',
                    borderRadius: '50%',
                    background: 'var(--umber-dark)',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'none',
                }}
            >
                {isOpen ? '✕' : '☰'}
            </motion.button>

            <nav
                style={{
                    position: 'fixed',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10001,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                }}
                className={`bookmark-nav ${isOpen ? 'nav-open' : ''}`}
            >
                {chapters.map((ch, i) => (
                    <motion.a
                        key={ch.id}
                        href={`#${ch.id}`}
                        className="nav-ribbon rough-edge ink-filter"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 3.5 + i * 0.1, duration: 0.8, ease: [0.7, 0, 0.3, 1] as const }}
                        whileHover={{ x: -10, transition: { duration: 0.2 } }}
                        onClick={() => scrollTo(ch.id)}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '0.6rem',
                            padding: '0.6rem 1rem 0.6rem 1.5rem',
                            border: 'none',
                            borderLeft: `3px solid ${active === ch.id ? 'var(--gold)' : 'var(--umber)'}`,
                            borderRadius: '4px 0 0 4px',
                            background: active === ch.id
                                ? 'linear-gradient(90deg, var(--umber-dark), var(--leather))'
                                : 'linear-gradient(90deg, rgba(58,34,24,0.7), rgba(74,44,26,0.9))',
                            color: active === ch.id ? 'var(--gold-bright)' : 'var(--parchment-deep)',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.4s var(--ease-quill)',
                            whiteSpace: 'nowrap',
                            boxShadow: active === ch.id
                                ? '-4px 0 15px rgba(201,169,78,0.3)'
                                : '-2px 0 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.6rem',
                            opacity: 0.6,
                        }}>{ch.numeral}</span>
                        <span>{ch.label}</span>
                    </motion.a>
                ))}
            </nav>

            <style>{`
        @media (max-width: 768px) {
          .nav-toggle { display: flex !important; align-items: center; justify-content: center; }
          .bookmark-nav {
            top: 0 !important;
            transform: none !important;
            right: ${isOpen ? '0' : '-100%'} !important;
            width: 200px;
            height: 100vh;
            padding-top: 5rem;
            background: var(--umber-dark);
            transition: right 0.4s var(--ease-quill);
            box-shadow: -5px 0 20px rgba(0,0,0,0.5);
          }
          .bookmark-nav button {
            border-left: none !important;
            border-bottom: 1px solid rgba(201,169,78,0.1) !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
        </>
    );
}
