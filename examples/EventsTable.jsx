import React from 'react'
import { Calendar, AlertTriangle, Users, DollarSign } from 'lucide-react'

export default function EventsTable({ events = [] }) {
  const getEventTypeColor = (type) => {
    switch(type) {
      case 'shutdown': return { bg: '#FEF3F2', border: '#F97316', text: '#EA580C' }
      case 'political': return { bg: '#EFF6FF', border: '#3B82F6', text: '#2563EB' }
      case 'economic': return { bg: '#FEF9C3', border: '#EAB308', text: '#CA8A04' }
      default: return { bg: '#F3F4F6', border: '#9CA3AF', text: '#6B7280' }
    }
  }

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'shutdown': return AlertTriangle
      case 'political': return Users
      case 'economic': return DollarSign
      default: return Calendar
    }
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px',
      overflowX: 'auto'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
        fontSize: '14px'
      }}>
        <thead>
          <tr style={{
            backgroundColor: '#F8FAFC',
            borderBottom: '2px solid #E2E8F0'
          }}>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: '700',
              color: '#1E293B',
              borderBottom: '2px solid #CBD5E1'
            }}>
              Date
            </th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: '700',
              color: '#1E293B',
              borderBottom: '2px solid #CBD5E1'
            }}>
              Type
            </th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: '700',
              color: '#1E293B',
              borderBottom: '2px solid #CBD5E1'
            }}>
              Event
            </th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: '700',
              color: '#1E293B',
              borderBottom: '2px solid #CBD5E1'
            }}>
              Key Players
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            const colors = getEventTypeColor(event.type)
            const TypeIcon = getEventTypeIcon(event.type)

            return (
              <tr 
                key={index}
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Date */}
                <td style={{
                  padding: '12px 16px',
                  verticalAlign: 'top',
                  whiteSpace: 'nowrap',
                  color: '#475569',
                  fontWeight: '600'
                }}>
                  {event.label}
                </td>

                {/* Type Badge */}
                <td style={{
                  padding: '12px 16px',
                  verticalAlign: 'top'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    backgroundColor: colors.bg,
                    border: `1.5px solid ${colors.border}`,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: colors.text,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    <TypeIcon size={14} strokeWidth={2.5} />
                    {event.type}
                  </div>
                </td>

                {/* Event Note */}
                <td style={{
                  padding: '12px 16px',
                  verticalAlign: 'top',
                  color: '#334155',
                  lineHeight: '1.6'
                }}>
                  {event.note}
                  {event.cost && (
                    <div style={{
                      marginTop: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      backgroundColor: '#FEF3F2',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#EA580C'
                    }}>
                      <DollarSign size={14} />
                      Cost: {event.cost}
                    </div>
                  )}
                </td>

                {/* Key Players */}
                <td style={{
                  padding: '12px 16px',
                  verticalAlign: 'top',
                  color: '#64748B',
                  fontSize: '13px'
                }}>
                  {event.key_names?.join(', ') || '-'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}