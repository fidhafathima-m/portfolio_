import { motion } from 'framer-motion'
import InkBlot from '../ui/InkBlot'
import '../../assets/styles/Contact.css'

const socialLinks = [
    {
        label: 'LinkedIn',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
        url: 'https://www.linkedin.com/in/fidha-fathima-m/'
    },
    {
        label: 'GitHub',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
        url: 'https://github.com/fidhafathima-m'
    },
    {
        label: 'Instagram',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
        url: 'https://www.instagram.com/_fidha.m/'
    },
    {
        label: 'Pinterest',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
        ),
        url: 'https://in.pinterest.com/fidhumusthafa/'
    },
]

export default function Contact() {
    return (
        <section id="contact" className="section contact-section">
            <div className="deckle-edge" />

            <div className="ornament">
                <span className="ornament-symbol">✉</span>
            </div>

            <motion.h2
                className="section-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                style={{ filter: 'url(#inkBleed)' }}
            >
                A Sealed Letter
            </motion.h2>

            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Correspondence Welcome
            </motion.p>

            <motion.div
                className="envelope ink-filter"
                initial={{ rotateX: -90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] as const }}
            >
                <InkBlot rotation={180} scale={1.5} position={{ top: '-10%', left: '50%' }} opacity={0.2} />
                <div className="envelope-flap" />
                <div className="envelope-body rough-edge">
                    <div className="letter-content">
                        <p className="letter-greeting">Dear Visitor,</p>
                        <p className="letter-text">
                            I would be delighted to hear from you regarding any opportunity,
                            collaboration, or simply a conversation about the craft of web development.
                            Please do not hesitate to reach out through any of the channels below.
                        </p>

                        <div className="letter-details">
                            <div className="letter-detail-item">
                                <span className="detail-icon">📧</span>
                                <a href="mailto:fidhumusthafa3549@gmail.com">fidhumusthafa3549@gmail.com</a>
                            </div>
                            <div className="letter-detail-item">
                                <span className="detail-icon">📱</span>
                                <a href="tel:+919778728951">+91 9778728951</a>
                            </div>
                            <div className="letter-detail-item">
                                <span className="detail-icon">📍</span>
                                <span>Kannur, Kerala, India</span>
                            </div>
                        </div>

                        <p className="letter-closing">Yours sincerely,</p>
                        <div style={{ position: 'relative', display: 'inline-block', float: 'right' }}>
                            <p className="letter-signature" style={{ filter: 'url(#inkBleed)' }}>Fidha Fathima M</p>
                            <motion.span
                                style={{ position: 'absolute', bottom: -15, left: -20, fontSize: '1.5rem', color: 'var(--crimson)' }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 0.6, scale: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                ♥
                            </motion.span>
                        </div>
                    </div>

                    <div className="social-seals">
                        {socialLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-seal"
                                initial={{ scale: 0, rotate: -30 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.6 + i * 0.15,
                                    duration: 0.5,
                                    ease: [0.34, 1.56, 0.64, 1],
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <span className="seal-icon">{link.icon}</span>
                                <span className="seal-label">{link.label}</span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="finis-flourish">
                        <span>— ❦ Finis ❦ —</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
