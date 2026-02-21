import { motion } from 'framer-motion'
import InkBlot from '../ui/InkBlot'
import '../../assets/styles/About.css'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
}

export default function About() {
    return (
        <section id="about" className="section about-section">
            <div className="deckle-edge" />

            <div className="ornament">
                <span className="ornament-symbol">❦</span>
            </div>

            <motion.h2
                className="section-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={0}
                variants={fadeUp}
            >
                About the Author
            </motion.h2>

            <motion.p
                className="section-subtitle"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                variants={fadeUp}
            >
                A Chronicle of the Craft
            </motion.p>

            <div className="about-parchment rough-edge ink-filter">
                <InkBlot rotation={10} scale={1.5} position={{ top: '10%', left: '5%' }} opacity={0.15} />
                <InkBlot rotation={-15} scale={1} position={{ top: '80%', left: '90%' }} opacity={0.1} />
                <div className="about-page">
                    <motion.div
                        className="drop-cap-block"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        custom={2}
                        variants={fadeUp}
                    >
                        <div style={{ position: 'relative' }}>
                            <span className="drop-cap" style={{ filter: 'url(#inkBleed)' }}>F</span>
                            {/* Cute Scribble */}
                            <svg style={{ position: 'absolute', top: -10, left: -10, width: 80, height: 80, pointerEvents: 'none', color: 'var(--gold)', opacity: 0.4 }} viewBox="0 0 100 100">
                                <path d="M10 10 Q 50 10 90 90 M 90 10 Q 50 90 10 90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                            </svg>
                        </div>
                        <p>
                            idha Fathima M is a dedicated MERN Stack Developer with a passion for building
                            scalable, user-centric web applications. With hands-on experience in React.js,
                            Node.js, Express.js, and MongoDB, she crafts seamless digital experiences that
                            bridge design and functionality.
                        </p>
                    </motion.div>

                    <motion.p
                        className="about-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={3}
                        variants={fadeUp}
                    >
                        Holding a Bachelor of Computer Applications from Kannur University, she has honed
                        her skills through building full-stack platforms like <strong>LocalFix</strong>, a
                        service marketplace with real-time features, and <strong>Art Mart</strong>, an
                        e-commerce platform for art and craft supplies.
                    </motion.p>

                    <motion.p
                        className="about-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={4}
                        variants={fadeUp}
                    >
                        Her toolkit extends beyond the MERN stack — she works with TypeScript, Redux, Tailwind CSS,
                        PostgreSQL, Firebase, Redis, Socket.IO, Docker, and AWS, approaching each project with
                        clean architecture and a commitment to best practices.
                    </motion.p>

                    <motion.div
                        className="about-marginalia"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={5}
                        variants={fadeUp}
                    >
                        <div className="marginalia-item">
                            <span className="marginalia-icon">📧</span>
                            <span>fidhumusthafa3549@gmail.com</span>
                        </div>
                        <div className="marginalia-item">
                            <span className="marginalia-icon">📱</span>
                            <span>+91 9778728951</span>
                        </div>
                        <div className="marginalia-item">
                            <span className="marginalia-icon">📍</span>
                            <span>Kannur, Kerala, India</span>
                        </div>
                        {/* Cute sticky note feel */}
                        <motion.div
                            style={{
                                marginTop: '1.5rem',
                                padding: '0.5rem',
                                border: '1px dashed var(--gold)',
                                fontFamily: 'var(--font-hand)',
                                fontSize: '0.9rem',
                                color: 'var(--sepia)',
                                rotate: '-2deg',
                                opacity: 0.8
                            }}
                            whileHover={{ rotate: 0, scale: 1.05 }}
                        >
                            p.s. I love coding! 💻✨
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
