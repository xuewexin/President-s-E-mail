import React from 'react';

const henanPath = 'M 180 20 L 240 22 L 280 18 L 310 25 L 355 20 L 390 28 L 410 35 L 420 50 L 405 65 L 415 85 L 395 100 L 410 120 L 400 140 L 415 155 L 400 175 L 395 190 L 405 210 L 390 225 L 395 240 L 385 255 L 375 265 L 365 280 L 350 285 L 330 290 L 310 285 L 290 275 L 270 270 L 250 265 L 230 260 L 210 250 L 190 240 L 175 225 L 160 210 L 150 190 L 140 170 L 135 150 L 130 130 L 135 110 L 125 90 L 130 70 L 142 52 L 160 38 L 180 20 Z';

const campuses = [
  { name: '龙子湖校区', x: 290, y: 88, color: '#1677ff', count: 180, pending: 24 },
  { name: '文化路校区', x: 265, y: 72, color: '#52c41a', count: 126, pending: 16 },
  { name: '许昌校区', x: 310, y: 220, color: '#fa8c16', count: 67, pending: 10 },
];

const labels = [
  { name: '黄河', x: 155, y: 45, fontSize: 11, color: '#4a90d9' },
  { name: '郑州', x: 260, y: 60, fontSize: 12, color: '#333' },
  { name: '许昌', x: 295, y: 260, fontSize: 12, color: '#333' },
  { name: '洛阳', x: 155, y: 135, fontSize: 10, color: '#999' },
  { name: '南阳', x: 230, y: 310, fontSize: 10, color: '#999' },
  { name: '河南省', x: 270, y: 165, fontSize: 16, color: 'rgba(0,0,0,0.06)' },
];

function HenanMap({ style }) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #f8fdf5 0%, #f0f7e8 50%, #e8f5e0 100%)',
        borderRadius: 8,
        padding: 16,
        position: 'relative',
        ...style,
      }}
    >
      <svg viewBox="80 0 320 340" width="100%" height="100%" style={{ maxHeight: 340 }}>
        <path d={henanPath} fill="#d4e8c2" stroke="#8bc34a" strokeWidth="2.5" strokeLinejoin="round" />

        {labels.map((l) => (
          <text key={l.name} x={l.x} y={l.y} fontSize={l.fontSize} fill={l.color}
            textAnchor="middle" fontWeight={l.color === 'rgba(0,0,0,0.06)' ? 'bold' : 'normal'}>
            {l.name}
          </text>
        ))}

        <line x1="100" y1="38" x2="330" y2="55" stroke="#4a90d9" strokeWidth="1.5"
          strokeDasharray="6 3" opacity="0.5" />

        {campuses.map((campus) => (
          <g key={campus.name}>
            <line x1={campus.x - 8} y1={campus.y - 8} x2={campus.x + 8} y2={campus.y + 8}
              stroke={campus.color} strokeWidth="0.5" opacity="0.15" />
            <line x1={campus.x + 8} y1={campus.y - 8} x2={campus.x - 8} y2={campus.y + 8}
              stroke={campus.color} strokeWidth="0.5" opacity="0.15" />
            <circle cx={campus.x} cy={campus.y} r={14} fill={campus.color} opacity="0.15" />
            <circle cx={campus.x} cy={campus.y} r={8} fill={campus.color} opacity="0.85" />
            <circle cx={campus.x} cy={campus.y} r={4} fill="#fff" />
            <text x={campus.x} y={campus.y - 18} fontSize={12} fontWeight="bold" fill={campus.color}
              textAnchor="middle">
              {campus.name}
            </text>
            <text x={campus.x} y={campus.y - 4} fontSize={10} fill="#fff" textAnchor="middle"
              fontWeight="bold">{campus.count}</text>
          </g>
        ))}

        <foreignObject x="82" y="305" width="280" height="35">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {campuses.map((c) => (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#666',
                background: '#fff', padding: '4px 8px', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'inline-block', flexShrink: 0 }} />
                {c.name} 待处理 {c.pending}
              </div>
            ))}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

export { campuses };
export default HenanMap;