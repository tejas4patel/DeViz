import React, { useEffect, useRef, useState } from 'react';
import { Gavel, Users, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';

const TimelinePopover = ({ node, x, y, onMouseEnter, onMouseLeave }) => {
  const popoverRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ x, y });

  if (!node) return null;

  useEffect(() => {
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      if (x + rect.width / 2 > viewportWidth - 20) {
        adjustedX = viewportWidth - rect.width / 2 - 20;
      }
      if (x - rect.width / 2 < 20) {
        adjustedX = rect.width / 2 + 20;
      }
      if (y - rect.height - 10 < 20) {
        adjustedY = y + 30;
      }

      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }
  }, [x, y]);

  const getIcon = () => {
    const type = node.type?.toLowerCase() || '';
    if (type === 'shutdown') return AlertTriangle;
    if (type === 'economic') return TrendingDown;
    if (type === 'political') return Gavel;
    return Gavel;
  };

  const getTypeStyle = () => {
    const type = node.type?.toLowerCase() || '';
    if (type === 'shutdown') {
      return { label: 'SHUTDOWN', bgColor: '#FEE2E2', textColor: '#991B1B' };
    }
    if (type === 'economic') {
      return { label: 'ECONOMIC', bgColor: '#FEF3C7', textColor: '#92400E' };
    }
    if (type === 'political') {
      return { label: 'POLITICAL', bgColor: '#DBEAFE', textColor: '#1E40AF' };
    }
    return { label: 'EVENT', bgColor: '#F3F4F6', textColor: '#374151' };
  };

  const Icon = getIcon();
  const typeStyle = getTypeStyle();

  const popoverStyle = {
    position: 'fixed',
    left: `${adjustedPosition.x}px`,
    top: `${adjustedPosition.y - 10}px`,
    transform: 'translate(-50%, -100%)',
    zIndex: 10000,
    maxWidth: '420px',
    minWidth: '320px',
    backgroundColor: 'white',
    border: '1px solid #94A3B8',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderBottom: '1px solid #E5E7EB'
  };

  const dateContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#64748B',
    fontWeight: '500'
  };

  const calendarIconStyle = {
    width: '12px',
    height: '12px',
    color: '#64748B'
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
    color: '#64748B',
    flexShrink: 0
  };

  const badgeStyle = {
    backgroundColor: typeStyle.bgColor,
    color: typeStyle.textColor,
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    marginLeft: 'auto'
  };

  const playersStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: '#F8FAFC',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '12px',
    flexWrap: 'wrap'
  };

  const playerIconStyle = {
    width: '14px',
    height: '14px',
    color: '#64748B',
    flexShrink: 0
  };

  const playerPillStyle = {
    backgroundColor: 'white',
    border: '1px solid #CBD5E1',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    color: '#475569',
    fontWeight: '500'
  };

  const descriptionStyle = {
    padding: '10px 12px',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#475569'
  };

  const bulletsContainerStyle = {
    padding: '8px 12px 10px',
    borderTop: '1px solid #E5E7EB',
    backgroundColor: '#FAFAFA'
  };

  const bulletListStyle = {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '12px',
    lineHeight: '1.6',
    color: '#475569'
  };

  const bulletItemStyle = {
    marginBottom: '6px'
  };

  const costSectionStyle = {
    padding: '8px 12px',
    backgroundColor: '#FEF3C7',
    borderTop: '1px solid #E5E7EB',
    fontSize: '11px',
    fontWeight: '600',
    color: '#92400E',
    lineHeight: '1.4'
  };

  return (
    <div
      ref={popoverRef}
      style={popoverStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header with date and type badge */}
      <div style={headerStyle}>
        <div style={dateContainerStyle}>
          <Calendar style={calendarIconStyle} />
          <span>{node.label || node.date}</span>
        </div>
        <Icon style={iconStyle} />
        <div style={badgeStyle}>{typeStyle.label}</div>
      </div>

      {/* Key Players Section */}
      {node.key_names && node.key_names.length > 0 && (
        <div style={playersStyle}>
          <Users style={playerIconStyle} />
          {node.key_names.map((name, idx) => (
            <div key={idx} style={playerPillStyle}>
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Main Description */}
      <div style={descriptionStyle}>
        {node.note}
      </div>

      {/* Bullets Section - NEW */}
      {node.bullets && node.bullets.length > 0 && (
        <div style={bulletsContainerStyle}>
          <ul style={bulletListStyle}>
            {node.bullets.map((bullet, idx) => (
              <li key={idx} style={bulletItemStyle}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cost Summary - NEW */}
      {node.cost && (
        <div style={costSectionStyle}>
          💰 {node.cost}
        </div>
      )}
    </div>
  );
};

export default TimelinePopover;
