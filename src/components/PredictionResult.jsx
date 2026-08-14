export default function PredictionResult({ predictions }) {
  if (!predictions || predictions.length === 0) return null

  const top = predictions[0]
  const isSehat = top.className.toLowerCase().includes('sehat')
  const isBusuk = top.className.toLowerCase().includes('busuk')

  let statusClass = 'result-neutral'
  if (isSehat) statusClass = 'result-sehat'
  if (isBusuk) statusClass = 'result-busuk'

  return (
    <div className={`result ${statusClass}`}>
      <h2 className="result-label">{top.className}</h2>
      <p className="result-confidence">
        Keyakinan: {(top.probability * 100).toFixed(1)}%
      </p>
      {top.probability < 0.6 && (
        <p className="result-warning">
          Keyakinan model masih rendah, coba gunakan foto yang lebih jelas.
        </p>
      )}

      <div className="result-details">
        {predictions.map((p) => (
          <div key={p.className} className="result-bar-row">
            <span className="result-bar-label">{p.className}</span>
            <div className="result-bar-track">
              <div
                className="result-bar-fill"
                style={{ width: `${(p.probability * 100).toFixed(1)}%` }}
              />
            </div>
            <span className="result-bar-value">
              {(p.probability * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
