import React, { useState } from 'react'

export default function Thermometer({ value = 35, label = 'Trust Index' }) {
  const [hover, setHover] = useState('')

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: '16px',
      padding: '20px 10px'
    }}>
      {/* Thermometer Visual */}
      <div style={{ 
        position: 'relative',
        width: '60px',
        height: '220px'
      }}>
        {/* Thermometer bulb */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: value < 40 ? '#e53935' : value < 70 ? '#fb8c00' : '#43a047',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }} />

        {/* Thermometer tube */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '170px',
          background: '#e0e0e0',
          borderRadius: '10px 10px 0 0',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Fill */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: `${value}%`,
            background: value < 40 ? 
              'linear-gradient(to top, #e53935, #ef5350)' : 
              value < 70 ? 
              'linear-gradient(to top, #fb8c00, #ffa726)' : 
              'linear-gradient(to top, #43a047, #66bb6a)',
            transition: 'height 0.5s ease'
          }} />
        </div>

        {/* Tick marks and labels */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <div key={tick} style={{
            position: 'absolute',
            bottom: `${30 + (tick / 100) * 170}px`,
            right: '35px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div style={{
              width: '8px',
              height: '2px',
              background: '#757575'
            }} />
            <span style={{
              fontSize: '11px',
              color: '#757575',
              fontWeight: '500'
            }}>
              {tick}
            </span>
          </div>
        ))}
      </div>

      {/* Value Display */}
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: value < 40 ? '#e53935' : value < 70 ? '#fb8c00' : '#43a047',
          lineHeight: '1'
        }}>
          {value}%
        </div>
        <div style={{
          fontSize: '0.95rem',
          color: '#5d4037',
          marginTop: '8px',
          fontWeight: '600'
        }}>
          {label}
        </div>
      </div>

      {/* Status indicator */}
      <div style={{
        fontSize: '0.85rem',
        color: '#757575',
        fontStyle: 'italic'
      }}>
        {value < 40 ? '🔴 Critical Low' : value < 70 ? '🟠 Below Average' : '🟢 Healthy'}
      </div>
    </div>
  )
}