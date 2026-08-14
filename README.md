# Deteksi Buah Sehat & Busuk

Website deteksi kondisi buah (sehat/busuk) berbasis React + TensorFlow.js,
model dari Teachable Machine berjalan langsung di browser (client-side).

## Struktur Folder

```
deteksi-buah/
├── public/
│   └── model/              <- taruh file model Teachable Machine di sini
│       ├── model.json
│       ├── metadata.json
│       └── weights.bin
├── src/
│   ├── components/
│   │   ├── ImageUploader.jsx
│   │   ├── CameraCapture.jsx
│   │   ├── PredictionResult.jsx
│   │   └── Loader.jsx
│   ├── hooks/
│   │   └── useTeachableModel.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Cara Menjalankan di Lokal

1. Install dependencies:
   ```
   npm install
   ```
2. Taruh file model Teachable Machine (model.json, metadata.json, weights.bin)
   ke folder `public/model/` (lihat public/model/README.txt untuk caranya).
3. Jalankan server dev:
   ```
   npm run dev
   ```
4. Buka http://localhost:5173

## Deploy ke Vercel

1. Push project ini ke repo GitHub.
2. Buka vercel.com > "Add New Project" > pilih repo tersebut.
3. Vercel otomatis mendeteksi framework Vite, langsung klik "Deploy".
4. Selesai, dapat URL live.

Pastikan folder `public/model` sudah berisi file model sebelum push,
supaya versi yang di-deploy juga bisa melakukan prediksi.
