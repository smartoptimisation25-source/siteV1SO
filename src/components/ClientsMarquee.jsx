const CLIENTS = [
  { name: 'SNCF',    src: '/logos/sncf.svg',    h: 36 },
  { name: 'Alstom',  src: '/logos/alstom.png',  h: 32 },
  { name: 'Hager',   src: '/logos/hager.webp',  h: 34 },
  { name: 'CTS',     src: '/logos/cts.png',      h: 52 },
  { name: 'Bugatti', src: '/logos/bugatti.svg',  h: 52 },
  { name: 'Baumert', src: '/logos/baumert.jpeg', h: 36 },
  { name: 'HUS',     src: '/logos/hus.png',      h: 52 },
]

const ITEMS = [...CLIENTS, ...CLIENTS]

function LogoItem({ client }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '64px',
        flexShrink: 0,
      }}
    >
      <img
        src={client.src}
        alt={client.name}
        style={{
          height: `${client.h}px`,
          width: 'auto',
          objectFit: 'contain',
          filter: 'none',
          opacity: 1,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      />
    </div>
  )
}

export default function ClientsMarquee() {
  return (
    <div style={{ marginTop: '48px' }}>
      <p style={{
        color: '#9CA3AF',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        Ils nous font confiance
      </p>

      <div style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}>
        <div className="marquee-track">
          {ITEMS.map((c, i) => (
            <LogoItem key={i} client={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
