type NodeData = {
  date?: string
  label: string
  note?: string
  type?: string
}

type Props = {
  node: NodeData
  x: number
  y: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function TimelinePopover(props: Props) {
  const { node, x, y, onMouseEnter, onMouseLeave } = props

  return (
    <div
      className="timelinePopover"
      style={{
        position: "fixed",
        left: x,
        top: y - 8,
        transform: "translate(-50%, -100%)",
        zIndex: 100
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="tooltip"
    >
      <div className="timelinePopoverCard">
        {node.date ? <div className="timelinePopoverDate">{node.date}</div> : null}
        <div className="timelinePopoverTitle">{node.label}</div>
        {node.note ? <div className="timelinePopoverNote">{node.note}</div> : null}
      </div>
    </div>
  )
}
