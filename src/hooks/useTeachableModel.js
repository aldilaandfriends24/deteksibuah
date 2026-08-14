import { useEffect, useRef, useState } from 'react'
import * as tmImage from '@teachablemachine/image'

// Path ini nunjuk ke folder public/model
// Ganti isi folder public/model dengan hasil export "Tensorflow.js" dari Teachable Machine
const MODEL_URL = '/model/model.json'
const METADATA_URL = '/model/metadata.json'

export function useTeachableModel() {
  const modelRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadModel() {
      try {
        setIsLoading(true)
        const model = await tmImage.load(MODEL_URL, METADATA_URL)
        if (isMounted) {
          modelRef.current = model
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Gagal load model:', err)
        if (isMounted) {
          setError(
            'Model belum ditemukan. Pastikan file model.json, metadata.json, dan weights.bin sudah ditaruh di folder public/model.'
          )
          setIsLoading(false)
        }
      }
    }

    loadModel()

    return () => {
      isMounted = false
    }
  }, [])

  async function predict(imageElement) {
    if (!modelRef.current) {
      throw new Error('Model belum siap.')
    }
    const predictions = await modelRef.current.predict(imageElement)
    // Urutkan dari confidence tertinggi ke terendah
    return predictions.sort((a, b) => b.probability - a.probability)
  }

  return { predict, isLoading, error }
}
