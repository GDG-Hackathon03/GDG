import { useState } from 'react'
import {
  BookOpen,
  Search,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Code2,
  Globe,
  Award
} from 'lucide-react'
import { initialLearningResources } from '../data/mockData'

export default function Resources({ showToast }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('prepwise_bookmarked_resources')
      return saved ? JSON.parse(saved) : ['res-1', 'res-3']
    } catch {
      return ['res-1', 'res-3']
    }
  })

  const categories = [
    'All',
    'DSA Practice',
    'Core CS Subjects',
    'Aptitude & Verbal',
    'System Design',
    'Career & Resume',
    'Quick Reference'
  ]

  const toggleBookmark = (id, e) => {
    e.stopPropagation()
    const next = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(b => b !== id)
      : [...bookmarkedIds, id]
    setBookmarkedIds(next)
    try {
      localStorage.setItem('prepwise_bookmarked_resources', JSON.stringify(next))
    } catch (err) {
      console.warn(err)
    }
    showToast(bookmarkedIds.includes(id) ? 'Removed from saved toolkit' : 'Saved to your toolkit!')
  }

  const filtered = initialLearningResources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase()) ||
      res.category.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'All' || res.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="page-wrap module-page">
      {/* Module Heading */}
      <div className="module-heading">
        <div>
          <p className="eyebrow">CURATED LEARNING ECOSYSTEM</p>
          <h1>Good Resources, <em>Zero Noise.</em></h1>
          <p className="subtitle">
            A vetted selection of standard platforms, roadmaps, cheat sheets, and problem sheets for engineering preparation.
          </p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-row" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div className="search-field" style={{ minWidth: 260 }}>
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources, topics, platforms..."
          />
        </div>

        <div className="cat-pill-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-button ${activeCategory === cat ? 'active-filter' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="resource-grid-wide">
        {filtered.map((res) => {
          const isSaved = bookmarkedIds.includes(res.id)
          return (
            <article className="resource-card-full" key={res.id}>
              <div className="resource-card-head">
                <div className={`resource-icon ${res.tone}`}>
                  <BookOpen size={19} />
                </div>
                <div className="resource-badges">
                  <span className="section-kicker">{res.type}</span>
                  <button
                    className="save-icon-btn"
                    onClick={(e) => toggleBookmark(res.id, e)}
                    title={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
                  >
                    {isSaved ? <BookmarkCheck size={18} color="#ed765f" /> : <Bookmark size={18} color="#aaa69d" />}
                  </button>
                </div>
              </div>

              <h2>{res.title}</h2>
              <p>{res.description}</p>

              <div className="resource-foot">
                <span className="diff-pill medium">{res.difficulty}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-external-link"
                >
                  Visit Platform <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          )
        })}

        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            No resources match your search filter.
          </div>
        )}
      </div>
    </div>
  )
}
