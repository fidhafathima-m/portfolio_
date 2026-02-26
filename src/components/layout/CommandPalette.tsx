import { useEffect, useMemo, useState } from 'react'

interface ActionItem {
  id: string
  label: string
  group: string
  keywords: string[]
  run: () => void | Promise<void>
}

const sectionTargets = [
  { id: 'hero', label: 'Go to Cover' },
  { id: 'about', label: 'Go to About' },
  { id: 'skills', label: 'Go to Skills' },
  { id: 'projects', label: 'Go to Projects' },
  { id: 'education', label: 'Go to Education' },
  { id: 'game', label: 'Go to Game' },
  { id: 'contact', label: 'Go to Contact' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const actions = useMemo<ActionItem[]>(() => {
    const sectionActions = sectionTargets.map((target) => ({
      id: target.id,
      label: target.label,
      group: 'Navigation',
      keywords: [target.id, target.label.toLowerCase(), 'section', 'scroll'],
      run: () => {
        document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setOpen(false)
      },
    }))

    return [
      ...sectionActions,
      {
        id: 'resume',
        label: 'Open Resume PDF',
        group: 'Profile',
        keywords: ['resume', 'cv', 'pdf'],
        run: () => {
          window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
          setOpen(false)
        },
      },
      {
        id: 'email',
        label: 'Copy Email Address',
        group: 'Profile',
        keywords: ['email', 'mail', 'copy'],
        run: async () => {
          try {
            await navigator.clipboard.writeText('fidhumusthafa3549@gmail.com')
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
          } catch {
            window.location.href = 'mailto:fidhumusthafa3549@gmail.com'
          }
          setOpen(false)
        },
      },
      {
        id: 'github',
        label: 'Open GitHub Profile',
        group: 'Social',
        keywords: ['github', 'code', 'repo'],
        run: () => {
          window.open('https://github.com/fidhafathima-m', '_blank', 'noopener,noreferrer')
          setOpen(false)
        },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn Profile',
        group: 'Social',
        keywords: ['linkedin', 'network', 'work'],
        run: () => {
          window.open('https://www.linkedin.com/in/fidha-fathima-m/', '_blank', 'noopener,noreferrer')
          setOpen(false)
        },
      },
    ]
  }, [])

  const filteredActions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions

    return actions.filter((action) => {
      const haystack = `${action.label} ${action.group} ${action.keywords.join(' ')}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [actions, query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.ctrlKey || event.metaKey
      if (isMeta && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
        setQuery('')
        setActiveIndex(0)
        return
      }

      if (!open) return

      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((value) => (value + 1) % Math.max(filteredActions.length, 1))
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((value) => (value - 1 + Math.max(filteredActions.length, 1)) % Math.max(filteredActions.length, 1))
      }

      if (event.key === 'Enter' && filteredActions[activeIndex]) {
        event.preventDefault()
        void filteredActions[activeIndex].run()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, filteredActions, open])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0)
  }, [query])

  return (
    <>
      <button
        type="button"
        className="command-chip"
        onClick={() => setOpen(true)}
        aria-label="Open quick actions"
      >
        <span>Spellbook</span>
        <kbd>Ctrl K</kbd>
      </button>

      {copied && <div className="copy-toast">Email copied</div>}

      {open && (
        <div className="palette-backdrop" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="palette-panel" onClick={(event) => event.stopPropagation()}>
            <div className="palette-header">
              <input
                className="palette-input"
                autoFocus
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search section, link, or action..."
              />
            </div>

            <ul className="palette-list">
              {filteredActions.length === 0 && <li className="palette-empty">No matching action.</li>}
              {filteredActions.map((action, index) => (
                <li key={action.id}>
                  <button
                    type="button"
                    className={`palette-item ${index === activeIndex ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => void action.run()}
                  >
                    <span>{action.label}</span>
                    <small>{action.group}</small>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
