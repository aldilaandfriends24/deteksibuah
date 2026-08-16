import { useEffect, useRef, useState } from 'react'
import { Video, Square, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useTeachableModel } from '../hooks/useTeachableModel.js'
import Loader from '../components/Loader.jsx'

const STABLE_DURATION_MS = 7000
const TICK_INTERVAL_MS = 350

export default function Detect() {
  const { predict, isLoading, error: modelError } = useTeachableModel()

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)
  const topClassRef = useRef(null)
  const lastChangeRef = useRef(0)

  const [status, setStatus] = useState('idle') // idle | scanning | modal | concluded
  const [cameraError, setCameraError] = useState(null)
  const [liveTop, setLiveTop] = useState(null)
  const [finalPredictions, setFinalPredictions] = useState(null)
  const [stableProgress, setStableProgress] = useState(0)

  function clearLoop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function stopCamera() {
    clearLoop()
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  useEffect(() => stopCamera, [])

  async function startDetection() {
    setCameraError(null)
    setFinalPredictions(null)
    setLiveTop(null)
    setStableProgress(0)
    topClassRef.current = null
    lastChangeRef.current = Date.now()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setStatus('scanning')

      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return
        try {
          const predictions = await predict(videoRef.current)
          const top = predictions[0]
          setLiveTop(top)

          const now = Date.now()
          if (topClassRef.current !== top.className) {
            topClassRef.current = top.className
            lastChangeRef.current = now
          }

          const elapsed = now - lastChangeRef.current
          setStableProgress(Math.min(1, elapsed / STABLE_DURATION_MS))

          if (elapsed >= STABLE_DURATION_MS) {
            setFinalPredictions(predictions)
            setStatus('modal')
            stopCamera()
          }
        } catch (err) {
          console.error(err)
        }
      }, TICK_INTERVAL_MS)
    } catch (err) {
      console.error(err)
      setCameraError('Tidak bisa mengakses kamera. Periksa izin kamera pada browser.')
    }
  }

  function resetDetection() {
    stopCamera()
    setStatus('idle')
    setFinalPredictions(null)
    setLiveTop(null)
    setStableProgress(0)
  }

  function confirmResult() {
    setStatus('concluded')
  }

  const mainTop = finalPredictions ? finalPredictions[0] : null
  const otherPicks = finalPredictions
    ? finalPredictions
        .filter(
          (p) =>
            p.className !== mainTop.className && p.className.toLowerCase() !== 'noise'
        )
        .slice(0, 3)
    : []

  return (
    <div className="page detect-page">
      <section className="section detect-intro">
        <h1 className="section-title">Detect</h1>
        <p className="section-subtitle">
          Arahkan kamera ke buah atau sayuran. Sistem membaca kondisinya secara langsung
          hingga hasil dinilai cukup stabil.
        </p>
      </section>

      {isLoading && <Loader text="Memuat model deteksi..." />}
      {modelError && (
        <div className="alert glass">
          <AlertTriangle size={18} strokeWidth={2.2} />
          <p>{modelError}</p>
        </div>
      )}

      {!isLoading && !modelError && (
        <section className="section detect-panel">
          {(status === 'idle' || status === 'scanning' || status === 'modal') && (
            <div className="camera-frame glass">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={
                  status === 'scanning' || status === 'modal'
                    ? 'camera-video-active'
                    : 'camera-video-hidden'
                }
              />

              {status === 'idle' && (
                <div className="camera-placeholder">
                  <Video size={32} strokeWidth={1.8} />
                  <p>Kamera belum aktif</p>
                </div>
              )}

              {status === 'scanning' && liveTop && (
                <div className="live-readout glass">
                  <span className="live-readout-label">{liveTop.className}</span>
                  <div className="live-readout-track">
                    <div
                      className="live-readout-fill"
                      style={{ width: `${(liveTop.probability * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <span className="live-readout-value">
                    {(liveTop.probability * 100).toFixed(1)}%
                  </span>
                  <div className="stability-track">
                    <div
                      className="stability-fill"
                      style={{ width: `${(stableProgress * 100).toFixed(0)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {cameraError && (
            <div className="alert glass">
              <AlertTriangle size={18} strokeWidth={2.2} />
              <p>{cameraError}</p>
            </div>
          )}

          <div className="detect-controls">
            {status === 'idle' && (
              <button className="btn btn-primary" onClick={startDetection}>
                <Video size={18} strokeWidth={2.2} />
                Aktifkan Kamera
              </button>
            )}
            {status === 'scanning' && (
              <button className="btn btn-ghost" onClick={resetDetection}>
                <Square size={16} strokeWidth={2.2} />
                Hentikan
              </button>
            )}
            {status === 'concluded' && (
              <button className="btn btn-primary" onClick={startDetection}>
                <RotateCcw size={18} strokeWidth={2.2} />
                Ulangi Deteksi
              </button>
            )}
          </div>

          {status === 'concluded' && mainTop && (
            <div className="final-result glass">
              <span className="result-tag">Kesimpulan Analisis</span>
              <h2 className="final-result-title">{mainTop.className}</h2>
              <p className="final-result-percent">
                {(mainTop.probability * 100).toFixed(1)}%
              </p>

              {otherPicks.length > 0 && (
                <div className="other-picks">
                  <span className="other-picks-label">Kemungkinan Lain</span>
                  <div className="other-picks-grid">
                    {otherPicks.map((p) => (
                      <div className="other-pick-card" key={p.className}>
                        <span className="other-pick-name">{p.className}</span>
                        <span className="other-pick-value">
                          {(p.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {status === 'modal' && mainTop && (
        <div className="modal-overlay">
          <div className="modal-card glass">
            <div className="modal-check">
              <CheckCircle2 size={56} strokeWidth={1.6} />
            </div>
            <h2>Berhasil dideteksi!</h2>
            <p>
              Kemungkinan <strong>{mainTop.className}</strong> dengan presentase{' '}
              <strong>{(mainTop.probability * 100).toFixed(1)}%</strong>
            </p>
            <button className="btn btn-primary" onClick={confirmResult}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
