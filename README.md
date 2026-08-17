# Smart Plants Disease

On-device machine learning application for detecting fruit condition (healthy/rotten) directly in the browser, built with React and TensorFlow.js. Inference runs entirely client-side using a model trained via Teachable Machine, requiring no backend server for prediction.

## Live Demo

https://deteksibuah.vercel.app/

## Features

- Real-time image classification (healthy vs. rotten fruit)
- Client-side inference via TensorFlow.js, no server round-trip required
- Responsive UI built with React

## Tech Stack

- React 18
- Vite
- TensorFlow.js
- Teachable Machine (image model)
- React Router DOM

## Project Structure

```
deteksibuah/
├── public/
│   └── model/              <- Teachable Machine model files
│       ├── model.json
│       ├── metadata.json
│       └── weights.bin
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   ├── hooks/
│   │   └── useTeachableModel.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Detect.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/aldilaandfriends24/deteksibuah.git
   cd deteksibuah
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Place the Teachable Machine model files (`model.json`, `metadata.json`, `weights.bin`) into `public/model/`.
4. Start the development server:
   ```
   npm run dev
   ```
5. Open http://localhost:5173 in your browser.

## How It Works

1. The user provides an image via upload or camera capture.
2. The image is preprocessed and passed to a TensorFlow.js model loaded from `public/model/`.
3. The model, trained using Teachable Machine, classifies the image as healthy or rotten.
4. The prediction and confidence score are displayed to the user, with all computation performed locally in the browser.

## License

See the LICENSE file for details.
