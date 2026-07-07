import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* Contenedor principal del logo */}
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#ce4b2a', // bg-clay
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 3px 0 0 #a8371a', // shadow-[0_2px_0_0_var(--clay-deep)]
          }}
        >
          {/* Letra G */}
          <div
            style={{
              color: '#faf5ea', // text-cream-paper
              fontSize: 34,
              fontWeight: 900,
              fontFamily: 'serif',
            }}
          >
            G
          </div>

          {/* Círculo superior derecho */}
          <div
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 20,
              height: 20,
              backgroundColor: '#d5912b', // bg-ochre
              borderRadius: '50%',
              border: '3px solid #f4ede0', // ring-2 ring-[var(--cream)]
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Triángulo interior */}
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="#211a13" // text-ink
              style={{ marginLeft: '2px' }}
            >
              <path d="M6 4v16l14-8z" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}