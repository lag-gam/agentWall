import type { ReactNode } from 'react';

interface LayoutProps {
  header: ReactNode;
  left: ReactNode;
  middle: ReactNode;
  right: ReactNode;
}

export function Layout({ header, left, middle, right }: LayoutProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0f172a',
      color: '#e5e7eb',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #1e293b',
        background: '#0f172a',
      }}>
        {header}
      </div>

      {/* 3-panel layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '30% 35% 35%',
        overflow: 'hidden',
      }}>
        <div style={{ borderRight: '1px solid #1e293b', overflow: 'hidden' }}>
          {left}
        </div>
        <div style={{ borderRight: '1px solid #1e293b', overflow: 'hidden' }}>
          {middle}
        </div>
        <div style={{ overflow: 'hidden' }}>
          {right}
        </div>
      </div>
    </div>
  );
}
