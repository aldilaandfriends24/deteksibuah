export default function Loader({ text = 'Memuat...' }) {
  return (
    <div className="loader">
      <div className="loader-spinner" />
      <p>{text}</p>
    </div>
  )
}
