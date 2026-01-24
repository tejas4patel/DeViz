type Tile = {
  id: string | number
  title: string
}

type Props = {
  items: Tile[]
}

export default function ScrollableTilePane({ items }: Props) {
  return (
    <div className="tilePane">
      <div className="tileGrid">
        {items.map(item => (
          <div key={item.id} className="tileCard">
            <div className="tileTitle">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
