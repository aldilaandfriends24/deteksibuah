import { useEffect, useRef, useState } from 'react'

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState(null)

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsActive(true)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Tidak bisa mengakses kamera. Cek izin kamera di browser.')
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsActive(false)
  }

  function capture() {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0)
    onCapture(canvas)
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="camera">
      {error && <p className="camera-error">{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={isActive ? 'camera-video-active' : 'camera-video-hidden'}
      />
      <div className="camera-controls">
        {!isActive ? (
          <button onClick={startCamera}>Aktifkan kamera</button>
        ) : (
          <>
            <button onClick={capture}>Ambil gambar</button>
            <button onClick={stopCamera}>Matikan kamera</button>
          </>
        )}
      </div>
    </div>
  )
}
