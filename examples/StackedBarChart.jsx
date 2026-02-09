import React from 'react'

export default function StackedBarChart({ data = [], totalLabel = '' }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#64748B',
        fontStyle: 'italic'
      }}>
        No data available
      </div>
    )
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div style={{ 
      padding: '20px 0',
      width: '100%'
    }}>
      {/* Stacked Bar */}
      <div style={{
        display: 'flex',
        width: '100%',
        height: '60px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              width: `${(item.value / total) * 100}%`,
              backgroundColor: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scaleY(1.05)'
              e.currentTarget.style.filter = 'brightness(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scaleY(1)'
              e.currentTarget.style.filter = 'brightness(1)'
            }}
            title={`${item.label}: ${item.value}%`}
          >
            {item.value}%
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: item.color,
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            />
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '0.95rem',
                color: '#003366',
                fontWeight: '600'
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: '0.9rem',
                color: '#64748B',
                fontWeight: '700'
              }}>
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Label */}
      {totalLabel && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: 'rgba(0, 71, 171, 0.08)',
          borderLeft: '4px solid #0047ab',
          borderRadius: '6px'
        }}>
          <div style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#002868'
          }}>
            {totalLabel}
          </div>
        </div>
      )}
    </div>
  )
}
