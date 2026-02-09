import React, { useState, useRef, useEffect } from 'react'
import * as Icons from 'lucide-react'
import BulletList from './BulletList'
import GDPInsetPie from './GDPInsetPie'
import Thermometer from './Thermometer'
import CCILineChart from './CCILineChart'
import EventsTable from './EventsTable'
import StackedBarChart from './StackedBarChart'


export default function EnhancedPopover({ node, x, y, onMouseEnter, onMouseLeave, onClose }) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const popoverRef = useRef(null)

  if (!node || !node.visualization) return null

  const renderVisualization = () => {
    const viz = node.visualization

    switch (viz.type) {
      case 'table':
        if (viz.component === 'EventsTable') {
          return <EventsTable events={viz.data.events} />
        }
        return null

      case 'list':
        return <BulletList items={viz.data} />

      case 'pie':
        return <GDPInsetPie data={viz.data} />

      case 'thermometer':
        return <Thermometer value={viz.data.value} label={viz.data.label} />

      case 'lineChart':
        return <CCILineChart data={viz.data} />

      case 'stackedBar':
        return <StackedBarChart data={viz.data} totalLabel={viz.totalLabel} />

      case 'text':
        const IconComponent = viz.data.icon ? Icons[viz.data.icon] : null

        return (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 0' }}>
            {IconComponent && (
              <div style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #002868 0%, #0047ab 100%)',
                color: '#fff',
                boxShadow: '0 8px 20px rgba(0, 40, 104, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />
                <IconComponent size={18} strokeWidth={2} style={{ position: 'relative', zIndex: 1 }} />
              </div>
            )}
            <div style={{ flex: 1, paddingTop: '6px', fontSize: '0.96rem', lineHeight: '1.7', color: '#003366', letterSpacing: '0.002em' }}>
              {viz.data.content}
            </div>
          </div>
        )

      default:
        return <p style={{ color: '#003366' }}>{node.detail}</p>
    }
  }

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2
  const midPointX = (x + screenCenterX) / 2
  const midPointY = (y + screenCenterY) / 2

  const viz = node.visualization
  const isTable = viz?.type === 'table'
  const popoverWidth = isTable ? 850 : 600
  const popoverHeight = isTable ? 650 : 600

  let finalX = position.x || midPointX
  let finalY = position.y || midPointY

  const margin = 20

  if (!position.x) {
    if (finalX - popoverWidth / 2 < margin) {
      finalX = margin + popoverWidth / 2
    } else if (finalX + popoverWidth / 2 > window.innerWidth - margin) {
      finalX = window.innerWidth - margin - popoverWidth / 2
    }
  }

  if (!position.y) {
    if (finalY - popoverHeight / 2 < margin) {
      finalY = margin + popoverHeight / 2
    } else if (finalY + popoverHeight / 2 > window.innerHeight - margin) {
      finalY = window.innerHeight - margin - popoverHeight / 2
    }
  }

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - (position.x || finalX),
      y: e.clientY - (position.y || finalY)
    })
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch drag handlers for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({
      x: touch.clientX - (position.x || finalX),
      y: touch.clientY - (position.y || finalY)
    })
    e.preventDefault()
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const newX = touch.clientX - dragStart.x
    const newY = touch.clientY - dragStart.y
    setPosition({ x: newX, y: newY })
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Add touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, dragStart])

  return (
    <div
      ref={popoverRef}
      className="enhanced-popover"
      style={{
        position: 'fixed',
        left: `${position.x || finalX}px`,
        top: `${position.y || finalY}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        pointerEvents: 'auto',
        width: 'auto',
        minWidth: isTable ? '500px' : '400px',
        maxWidth: `${popoverWidth}px`,
        height: 'auto',
        minHeight: 'auto',
        maxHeight: window.innerWidth < 768 ? '85vh' : '80vh',
        overflow: 'hidden',
        overflowY: 'auto',
        cursor: isDragging ? 'grabbing' : 'default',
        background: '#ffffff',
        borderRadius: '16px',
        border: '3px solid #0047ab',
        boxShadow: '0 20px 60px rgba(0, 40, 104, 0.3)',
        padding: '24px'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="popover-content">
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            borderBottom: '3px solid #0047ab', 
            paddingBottom: '12px',
            position: 'relative'
          }}
        >
          {/* Draggable header area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1,
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <h3 className="popover-title" style={{ 
              margin: 0, 
              border: 'none', 
              padding: 0, 
              fontSize: '1.4rem',
              color: '#002868',
              fontFamily: 'Merriweather, Georgia, serif',
              fontWeight: 700
            }}>
              {node.title}
            </h3>
          </div>

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                color: '#0047ab'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 71, 171, 0.1)'
                e.currentTarget.style.color = '#002868'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#0047ab'
              }}
              aria-label="Close popover"
            >
              <Icons.X size={24} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {node.detail && <p className="popover-detail" style={{
          fontSize: '0.95rem',
          color: '#003366',
          lineHeight: 1.6,
          marginTop: '16px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal'
        }}>{node.detail}</p>}

        <div className="popover-viz" style={{ 
          overflowX: isTable ? 'auto' : 'visible',
          marginTop: '12px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}>
          {renderVisualization()}
        </div>
      </div>
    </div>
  )
}
