import { motion } from 'framer-motion'
import { useRef } from 'react'
import InkBlot from '../ui/InkBlot'
import '../../assets/styles/Skills.css'

const skillGroups = [
    {
        title: 'Languages & Databases',
        skills: ['JavaScript', 'TypeScript', 'C', 'MongoDB', 'MySQL', 'HTML', 'CSS'],
    },
    {
        title: 'Frontend & UI',
        skills: ['React.js', 'Tailwind CSS', 'Redux'],
    },
    {
        title: 'Backend & Architecture',
        skills: ['Node.js', 'Express.js', 'RESTful APIs', 'MVC', 'Repository Pattern', 'SOLID Principles', 'Dependency Injection', 'Mongoose'],
    },
    {
        title: 'DevOps & Deployment',
        skills: ['Git', 'GitHub Actions', 'AWS (EC2 & S3)', 'Nginx', 'PM2'],
    },
    {
        title: 'Tools & Design',
        skills: ['Postman', 'VS Code', 'Figma', 'Eraser'],
    },
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
}

const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
}

const badgeVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const },
    },
}

export default function Skills() {
    const ref = useRef(null)
    return (
        <section id="skills" className="section skills-section" ref={ref}>
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
                The Illuminated Catalogue
            </motion.h2>

            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                A Registry of Practiced Arts
            </motion.p>

            <motion.div
                className="skills-grid"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {skillGroups.map((group, index) => (
                    <motion.div
                        key={group.title}
                        className="skill-card parchment-card rough-edge ink-filter"
                        variants={cardVariant}
                        whileHover={{ rotate: [-0.5, 0.5, -0.5], transition: { duration: 0.3, repeat: Infinity } }}
                    >
                        <div className="card-header">
                            <h3 className="group-title" style={{ filter: 'url(#inkBleed)' }}>{group.title}</h3>
                        </div>
                        <InkBlot rotation={index * 90} scale={0.6} position={{ top: '90%', left: '80%' }} opacity={0.1} />
                        <motion.div
                            className="skill-badges"
                            variants={container}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {group.skills.map((skill) => (
                                <motion.span key={skill} className="skill-badge" variants={badgeVariant}>
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
