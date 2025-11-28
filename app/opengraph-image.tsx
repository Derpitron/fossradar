import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "FOSSRadar - India's Open Source Directory";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#030712',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background gradient effects */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          }}
        />

        {/* India flag inspired accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            display: 'flex',
          }}
        >
          <div style={{ flex: 1, backgroundColor: '#f97316' }} />
          <div style={{ flex: 1, backgroundColor: '#ffffff' }} />
          <div style={{ flex: 1, backgroundColor: '#22c55e' }} />
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* FOSSRadar Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
                <path d="M4 6h.01" />
                <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
                <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
                <path d="M12 18h.01" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              foss<span style={{ color: '#f97316' }}>radar</span><span style={{ color: '#6b7280' }}>.dev</span>
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            India's Open Source Directory
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '28px',
              color: '#9ca3af',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            Discover and explore open source projects from Indian founders, creators, and contributors
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <span style={{ color: '#6b7280', fontSize: '20px' }}>
            fossradar.dev
          </span>
          <span style={{ color: '#6b7280', fontSize: '20px' }}>
            An initiative by wbfoss
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
