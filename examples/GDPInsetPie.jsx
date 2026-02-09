import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

// Custom Tooltip with light background
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '2px solid #0047AB',
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ 
          fontWeight: '700', 
          fontSize: '15px', 
          color: '#002868',
          marginBottom: '4px'
        }}>
          {data.name}
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#003366',
          marginBottom: '2px'
        }}>
          {data.value}%
        </div>
        <div style={{ 
          fontSize: '13px', 
          color: '#64748B',
          fontStyle: 'italic'
        }}>
          {data.info}
        </div>
      </div>
    )
  }
  return null
}

// Custom Legend Component
const CustomLegend = ({ payload }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '24px',
      flexWrap: 'wrap',
      marginTop: '8px',
      padding: '0 12px'
    }}>
      {payload.map((entry, index) => (
        <div 
          key={`legend-${index}`}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: entry.color,
              borderRadius: '3px',
              flexShrink: 0
            }}
          />
          <span style={{ 
            color: '#1E293B', 
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function GDPInsetPie() {
  const data = [
    {
      name: 'Non-Federal Economy',
      value: 78,
      color: '#06B6D4',
      info: 'Private/state/local activity'
    },
    {
      name: 'Mandatory & Interest',
      value: 16,
      color: '#3B82F6',
      info: 'Continues during shutdown'
    },
    {
      name: 'Discretionary at Risk',
      value: 6,
      color: '#F97316',
      info: 'Paused during shutdown'
    }
  ]

  return (
    <div style={{ width: '100%', height: '340px', paddingTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="48%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
            label={({ value }) => `${value}%`}
            labelLine={false}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomLegend />}
            wrapperStyle={{ paddingTop: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
