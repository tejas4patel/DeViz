export default function ScenePlaceholder(props: { title: string; description: string }) {
  return (
    <div className="kv">
      <div style={{ fontWeight: 700 }}>Placeholder</div>
      <div>
        <div style={{ fontWeight: 700 }}>{props.title}</div>
        <div className="small" style={{ marginTop: 6 }}>{props.description}</div>
      </div>
    </div>
  )
}
