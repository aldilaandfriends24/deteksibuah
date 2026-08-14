import { useRef, useState } from 'react'
import ImageUploader from './components/ImageUploader.jsx'
import CameraCapture from './components/CameraCapture.jsx'
import PredictionResult from './components/PredictionResult.jsx'
import Loader from './components/Loader.jsx'
import { useTeachableModel } from './hooks/useTeachableModel.js'

export default function App() {
  const { predict, isLoading, error: modelError } = useTeachableModel()
  const [mode, setMode] = useState('upload') // 'upload' | 'camera'
  const [imageUrl, setImageUrl] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [isPredicting, setIsPredicting] = useState(false)
  const [predictError, setPredictError] = useState(null)
  const imgRef = useRef(null)

  async function runPrediction(sourceElement) {
    setIsPredicting(true)
    setPredictError(null)
    try {
      const result = await predict(sourceElement)
      setPredictions(result)
    } catch (err) {
      console.error(err)
      setPredictError('Gagal melakukan prediksi. Coba lagi.')
    } finally {
      setIsPredicting(false)
    }
  }

  function handleImageSelected(file) {
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setPredictions(null)

    const img = new Image()
    img.src = url
    img.onload = () => runPrediction(img)
  }

  function handleCameraCapture(canvas) {
    setImageUrl(canvas.toDataURL('image/png'))
    setPredictions(null)
    runPrediction(canvas)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Deteksi Buah Sehat & Busuk</h1>
        <p>Unggah foto buah atau gunakan kamera untuk mengecek kondisinya.</p>
      </header>

      {isLoading && <Loader text="Memuat model deteksi..." />}
      {modelError && <p className="app-error">{modelError}</p>}

      {!isLoading && !modelError && (
        <main className="app-main">
          <div className="mode-switch">
            <button
              className={mode === 'upload' ? 'active' : ''}
              onClick={() => setMode('upload')}
            >
              Unggah Gambar
            </button>
            <button
              className={mode === 'camera' ? 'active' : ''}
              onClick={() => setMode('camera')}
            >
              Kamera
            </button>
          </div>

          {mode === 'upload' ? (
            <ImageUploader onImageSelected={handleImageSelected} />
          ) : (
            <CameraCapture onCapture={handleCameraCapture} />
          )}

          {imageUrl && (
            <div className="preview">
              <img ref={imgRef} src={imageUrl} alt="Pratinjau buah" />
            </div>
          )}

          {isPredicting && <Loader text="Menganalisis gambar..." />}
          {predictError && <p className="app-error">{predictError}</p>}
          {!isPredicting && predictions && (
            <PredictionResult predictions={predictions} />
          )}
        </main>
      )}

      <footer className="app-footer">
        <p>Model berjalan langsung di browser (TensorFlow.js).</p>
      </footer>
    </div>
  )
}
