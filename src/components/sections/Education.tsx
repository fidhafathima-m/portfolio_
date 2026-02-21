import { motion } from 'framer-motion'
import InkBlot from '../ui/InkBlot'
import '../../assets/styles/Education.css'

export default function Education() {
    return (
        <section id="education" className="section education-section">
            <div className="deckle-edge" />

            <div className="ornament">
                <span className="ornament-symbol">🎓</span>
            </div>

            <motion.h2
                className="section-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                style={{ filter: 'url(#inkBleed)' }}
            >
                Letters of Learning
            </motion.h2>

            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                Academic Pedigree
            </motion.p>

            <motion.div
                className="diploma-scroll"
                initial={{ scaleY: 0, transformOrigin: 'top' }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] as const }}
            >
                <div className="scroll-top-rod">
                    <div className="rod-knob left" />
                    <div className="rod-bar" />
                    <div className="rod-knob right" />
                </div>

                <div className="scroll-paper rough-edge ink-filter">
                    <InkBlot rotation={-45} scale={1} position={{ top: '20%', left: '80%' }} opacity={0.15} />
                    <div className="scroll-content">
                        <motion.div
                            className="diploma-body"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="diploma-seal-container">
                                <motion.div
                                    className="diploma-seal"
                                    initial={{ scale: 3, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', damping: 12, delay: 1.2 }}
                                >
                                    🏛
                                    <motion.div
                                        className="seal-sparkle"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        ✨
                                    </motion.div>
                                </motion.div>
                            </div>
                            <h3 className="diploma-degree" style={{ filter: 'url(#inkBleed)' }}>Bachelor of Computer Applications</h3>
                            <p className="diploma-details">
                                <strong>University of Calicut</strong> | 2021 — 2024
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="scroll-bottom-rod">
                    <div className="rod-knob left" />
                    <div className="rod-bar" />
                    <div className="rod-knob right" />
                </div>
            </motion.div>

            <motion.div
                className="certification-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <h4 className="cert-title" style={{ filter: 'url(#inkBleed)' }}>Certifications & Training</h4>
                <div className="cert-item ink-filter">
                    <span className="cert-seal">📜</span>
                    <div className="cert-info">
                        <strong>MERN Stack Development</strong>
                        <p>Brototype — Intensive Training</p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
