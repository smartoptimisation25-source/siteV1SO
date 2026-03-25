import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null
  return (
    <nav aria-label="Fil d'Ariane" style={{
      padding: '12px 0',
      fontSize: '13px',
      color: '#6B7280',
    }}>
      <ol style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '4px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {i > 0 && <span style={{ color: '#D1D5DB' }} aria-hidden="true">›</span>}
            {item.to ? (
              <Link to={item.to} style={{
                color: '#6B7280',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#3B4FD8'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: '#374151', fontWeight: 500 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
