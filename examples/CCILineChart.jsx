import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function CCILineChart({ data = [] }) {
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

  // Split data into pre-shutdown and shutdown periods
  const preShutdownData = data.slice(0, 3) // Jul, Aug, Sep
  const shutdownData = data.slice(2) // Sep, Oct, Nov (overlap at Sep)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const isShutdown = payload[0].payload.month === 'Oct 2025' || payload[0].payload.month === 'Nov 2025'
      return (
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.98)',
          border: `2px solid ${isShutdown ? '#F97316' : '#06B6D4'}`,
          borderRadius: '12px',
          padding: '12px 16px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>
            {payload[0].payload.month}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            CCI: {payload[0].value}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart 
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
      >
        <defs>
          {/* Vibrant Cyan gradient for pre-shutdown */}
          <linearGradient id="colorPre" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.05}/>
          </linearGradient>

          {/* Vibrant Orange gradient for shutdown */}
          <linearGradient id="colorShutdown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F97316" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#F97316" stopOpacity={0.05}/>
          </linearGradient>

          {/* Glow filters */}
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow-orange">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#E2E8F0" 
          strokeOpacity={0.5}
        />

        <XAxis 
          dataKey="month" 
          stroke="#64748B"
          tick={{ fontSize: 12, fontWeight: 600 }}
        />

        {/* FIXED: Accurate Y-axis domain for data values 89-97.4 */}
        <YAxis 
          domain={[88, 98]}
          ticks={[88, 90, 92, 94, 96, 98]}
          stroke="#64748B"
          tick={{ fontSize: 13, fontWeight: 600 }}
        />

        <Tooltip content={<CustomTooltip />} />

        {/* Single area with conditional coloring */}
        <Area
          type="monotone"
          dataKey="cci"
          stroke="#06B6D4"
          strokeWidth={3}
          fill="url(#colorPre)"
          dot={(props) => {
            const { cx, cy, index } = props
            const isShutdown = index >= 5 // Sep (index 2) and beyond
            const color = isShutdown ? '#F97316' : '#06B6D4'
            return (
              <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={color}
                stroke="#fff"
                strokeWidth={3}
              />
            )
          }}
          activeDot={(props) => {
            const { cx, cy, index } = props
            const isShutdown = index >= 5
            const color = isShutdown ? '#F97316' : '#06B6D4'
            return (
              <circle
                cx={cx}
                cy={cy}
                r={8}
                fill={color}
                stroke="#fff"
                strokeWidth={3}
              />
            )
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}