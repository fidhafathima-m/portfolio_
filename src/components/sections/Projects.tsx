import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import InkBlot from '../ui/InkBlot'
import '../../assets/styles/Projects.css'

// Repos to exclude (forks, config files, old duplicates)
const EXCLUDED_REPOS = [
    'freeCodeCamp',
    'first-contributions',
    'fidhafathima-m',
    'portfolio_',
    'localfix_service_icons',
    'Art-Mart',         // older duplicate of Art__Mart
    'my_portfolio',
    'portfolio_new',
    'nextjs-portfolio',
    "portfolio-claud",
    'monthly-challenges'
]

// Your two main featured projects (excluded from archive)
const FEATURED_TITLES = ['LocalFix', 'Art__Mart']

const projects = [
    {
        title: 'LocalFix',
        subtitle: 'Service Providing SaaS Application',
        description: 'A multi-tenant SaaS platform connecting users with local home services through an intuitive, scalable interface.',
        tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Inversify'],
        highlights: [
            'Architected multi-tenant SaaS platform for home services',
            'Integrated Razorpay for subscription tier management',
            'Implemented Repository pattern & Dependency Injection (SOLID)',
            'Optimized auth with Redis caching, cutting latency by 30%',
            'Achieved 95% error capture via centralized handling',
        ],
        github: 'https://github.com/fidhafathima-m/LocalFix',
        live: 'https://localfix-services.vercel.app/',
    },
    {
        title: 'Art Mart',
        subtitle: 'Ecommerce Application',
        description: 'Full-stack platform for art supplies, featuring a modular architecture and heavy focus on UX performance.',
        tech: ['Node.js', 'Express', 'MongoDB', 'MVC', 'EJS', 'Cloudinary', 'AWS EC2'],
        highlights: [
            'Developed full-stack MVC platform with role-based auth',
            'Reduced page reloads by 40% via Fetch API integration',
            'Built admin dashboard with specialized data processing',
            'Deployed on AWS EC2 using Nginx & PM2 persistence',
            'Optimized 2,000+ images via Cloudinary for 30% faster loads',
        ],
        github: 'https://github.com/fidhafathima-m/Art__Mart',
        live: 'https://art-mart.onrender.com/',
    },
]

// Language to seal color mapping — manuscript ink tones
const LANG_COLORS = {
    TypeScript: '#2d4a6e',
    JavaScript: '#6e5a2d',
    React: '#288994',
    HTML: '#6e2d2d',
    CSS: '#2d5e4a',
    EJS: '#4a2d6e',
    Handlebars: '#5e4a2d',
    Python: '#2d5e5e',
    default: '#3d3d3d',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArchiveCard({ repo, index }: { repo: any; index: number }) {
    const langColor = LANG_COLORS[repo.language as keyof typeof LANG_COLORS] || LANG_COLORS.default

    return (
        <motion.div
            className="archive-scroll"
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            <div className="scroll-wax-seal" style={{ background: langColor }}>
                {repo.language ? repo.language.slice(0, 2) : '??'}
            </div>

            <div className="scroll-body">
                <span className="scroll-folio-num">#{String(index + 1).padStart(2, '0')}</span>
                <h4 className="scroll-title">{repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h4>
                {repo.description && (
                    <p className="scroll-desc">{repo.description}</p>
                )}
                <div className="scroll-meta">
                    {repo.language && (
                        <span className="scroll-lang" style={{ borderColor: langColor, color: langColor }}>
                            {repo.language}
                        </span>
                    )}
                    {repo.stargazers_count > 0 && (
                        <span className="scroll-stars">✦ {repo.stargazers_count}</span>
                    )}
                </div>
            </div>

            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="scroll-link"
                aria-label={`View ${repo.name} on GitHub`}
            >
                <span className="scroll-link-icon">⚙</span>
                <span>View Codex</span>
            </a>

            <div className="scroll-ribbon" />
        </motion.div>
    )
}

export default function Projects() {
    const ref = useRef(null)
    const [archiveOpen, setArchiveOpen] = useState(false)
    const [miniProjects, setMiniProjects] = useState<Array<{ id: string; name: string; language: string | null; description: string | null; stargazers_count: number; html_url: string }>>([])
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchArchive = async () => {
        if (fetched) return
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(
                'https://api.github.com/users/fidhafathima-m/repos?sort=updated&per_page=100'
            )
            if (!res.ok) throw new Error('Failed to fetch repositories')
            const data = await res.json()

            const filtered = data.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (repo: { fork: any; name: string }) =>
                    !repo.fork &&
                    !EXCLUDED_REPOS.includes(repo.name) &&
                    !FEATURED_TITLES.includes(repo.name)
            )
            setMiniProjects(filtered)
            setFetched(true)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('The archive could not be retrieved. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleToggle = () => {
        if (!archiveOpen && !fetched) {
            fetchArchive()
        }
        setArchiveOpen((prev) => !prev)
    }

    return (
        <section id="projects" className="section projects-section" ref={ref}>
            <div className="deckle-edge" />

            <div className="ornament">
                <span className="ornament-symbol">✠</span>
            </div>

            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                A Folio of Works
            </motion.h2>

            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Notable Achievements & Commissions
            </motion.p>

            <div className="projects-container">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        className="project-folio"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, delay: index * 0.2, ease: [0.7, 0, 0.3, 1] }}
                    >
                        <div className="folio-spread rough-edge ink-filter">
                            <InkBlot rotation={45} scale={1.2} position={{ top: '10%', left: '5%' }} opacity={0.1} />
                            <div className="folio-left">
                                <span className="folio-number">Folio {index + 1}</span>
                                <h3 className="folio-title" style={{ filter: 'url(#inkBleed)' }}>{project.title}</h3>
                                <p className="folio-tagline">{project.subtitle}</p>
                                <p className="folio-description">{project.description}</p>
                                <div className="folio-links">
                                    <a href={project.github} className="folio-link" target="_blank" rel="noopener noreferrer">
                                        <span>⚙</span> GitHub
                                    </a>
                                    <a href={project.live} className="folio-link" target="_blank" rel="noopener noreferrer">
                                        <span>🌐</span> View Live
                                    </a>
                                </div>
                            </div>

                            <div className="folio-spine" />

                            <div className="folio-right">
                                <h4 className="folio-section-label">Key Highlights</h4>
                                <ul className="folio-highlights">
                                    {project.highlights.map((h, i) => (
                                        <li key={i}>
                                            <span className="quill-bullet">✎</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                <h4 className="folio-section-label">Tools & Techniques</h4>
                                <div className="folio-tech-seals">
                                    {project.tech.map((t) => (
                                        <span key={t} className="tech-seal">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Archive Divider ── */}
            <motion.div
                className="archive-divider"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <span className="archive-divider-line" />
                <span className="archive-divider-glyph">☙ ✦ ❧</span>
                <span className="archive-divider-line" />
            </motion.div>

            {/* ── Open Archive Button ── */}
            <motion.div
                className="archive-trigger-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <p className="archive-prelude">
                    Beyond the principal folios lie further works — experiments, studies & commissions from the sketchbook.
                </p>

                <button
                    className={`archive-trigger ${archiveOpen ? 'is-open' : ''}`}
                    onClick={handleToggle}
                    aria-expanded={archiveOpen}
                >
                    <span className="archive-trigger-seal">
                        {archiveOpen ? '✕' : '⚜'}
                    </span>
                    <span className="archive-trigger-text">
                        {archiveOpen ? 'Seal the Archive' : 'Open the Archive'}
                    </span>
                    <span className="archive-trigger-arrow">
                        {archiveOpen ? '↑' : '↓'}
                    </span>
                </button>
            </motion.div>

            {/* ── Archive Panel ── */}
            <AnimatePresence>
                {archiveOpen && (
                    <motion.div
                        className="archive-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="archive-panel-inner">
                            <div className="archive-header">
                                <h3 className="archive-title">
                                    <span>✦</span> The Sketchbook Archive <span>✦</span>
                                </h3>
                                <p className="archive-subtitle">Studies, Experiments & Minor Commissions</p>
                            </div>

                            {loading && (
                                <div className="archive-loading">
                                    <span className="loading-quill">✎</span>
                                    <p>Retrieving manuscripts from the vault…</p>
                                </div>
                            )}

                            {error && (
                                <div className="archive-error">
                                    <span>⚠</span> {error}
                                </div>
                            )}

                            {!loading && !error && miniProjects.length > 0 && (
                                <div className="archive-grid">
                                    {miniProjects.map((repo, i) => (
                                        <ArchiveCard key={repo.id} repo={repo} index={i} />
                                    ))}
                                </div>
                            )}

                            {!loading && !error && fetched && miniProjects.length === 0 && (
                                <p className="archive-empty">No additional manuscripts found in the vault.</p>
                            )}

                            <div className="archive-footer">
                                <a
                                    href="https://github.com/fidhafathima-m?tab=repositories"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="archive-github-link"
                                >
                                    ⚙ View all repositories on GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}