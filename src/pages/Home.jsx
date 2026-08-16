import { Link } from 'react-router-dom'
import {
  Leaf,
  Sparkles,
  ArrowRight,
  Camera,
  ScanLine,
  ClipboardCheck,
  RefreshCcw,
  Quote,
  Zap,
  Target,
  Gift,
} from 'lucide-react'

const stats = [
  { icon: Zap, label: 'Realtime', desc: 'Analisis langsung tanpa jeda' },
  { icon: Gift, label: 'Free to Use', desc: 'Tidak berbayar' },
  { icon: Target, label: 'Berbasis Browser', desc: 'Tanpa instalasi aplikasi' },
]

const steps = [
  {
    icon: Camera,
    title: 'Buka Halaman Detect',
    desc: 'Izinkan akses kamera perangkatmu, cukup lewat browser tanpa install aplikasi tambahan.',
  },
  {
    icon: ScanLine,
    title: 'Arahkan ke Buah/Sayur',
    desc: 'Posisikan objek di depan kamera. Sistem membaca kondisinya secara realtime, tanpa perlu memotret.',
  },
  {
    icon: ClipboardCheck,
    title: 'Tunggu Analisis Stabil',
    desc: 'Setelah hasil konsisten selama beberapa detik, kamera berhenti otomatis dan kesimpulan ditampilkan.',
  },
  {
    icon: RefreshCcw,
    title: 'Ulangi Kapan Saja',
    desc: 'Ingin cek objek lain? Tekan tombol ulangi dan kamera akan aktif kembali dari awal.',
  },
]

const sampleResult = [
  { label: 'Apple Healthy', value: 90 },
  { label: 'Noise', value: 6.2 },
  { label: 'Apple Rotten', value: 1.6 },
  { label: 'Apple Scab', value: 1.3 },
  { label: 'Apple Cedar', value: 0.9 },
]

const testimonials = [
  { name: 'Ipan', text: 'Mantap bang' },
  { name: 'Repa', text: 'Analisisnya cepat dan gampang dipahami, cocok untuk yang awam sekalipun.' },
  { name: 'Mr. Johndoe', text: 'Impressive, real-time detection actually works smoothly on my browser.' },
  { name: 'Alok', text: 'Desainnya bersih, enak dilihat, dan hasil deteksinya cukup meyakinkan.' },
  { name: 'Lancelot', text: 'Fitur berhenti otomatis saat hasil stabil itu ide yang cerdas, hemat waktu.' },
  { name: 'Hayato', text: 'Bantu banget buat sortir buah di kios sebelum dijual, tinggal arahkan kamera saja.' },
]

export default function Home() {
  const loopTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="page home-page">
      <section className="hero-full">
        <div className="hero-bg" style={{ backgroundImage: "url('/background.jpg')" }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge glass">
              <Sparkles size={14} strokeWidth={2.2} />
              <span>Analisis realtime berbasis kamera</span>
            </div>
            <h1 className="hero-title">Smart Plants Disease</h1>
            <p className="hero-hook">
              Kenali kondisi buah dan sayuran dalam hitungan detik, langsung dari kamera perangkatmu.
            </p>
            <p className="hero-desc">
              Smart Plants Disease membaca kondisi visual buah dan sayuran secara langsung lewat
              kamera, lalu menyimpulkan apakah kondisinya sehat atau menunjukkan tanda kerusakan.
              Seluruh proses berjalan di browser, tanpa perlu mengunggah foto atau menunggu server.
            </p>
            <Link to="/detect" className="btn btn-glass-green btn-lg">
              Mulai Deteksi
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
          </div>
          <div className="hero-logo">
            <Leaf strokeWidth={1.2} />
          </div>
        </div>
      </section>

      <section className="section stats-row">
        {stats.map((s) => (
          <div className="stat-card glass" key={s.label}>
            <div className="stat-icon">
              <s.icon size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="section demo-section">
        <div className="demo-grid-v2">
          <div className="demo-left">
            <h2 className="section-title section-title-center demo-title">Deteksi Dengan Mudah</h2>
            <p className="demo-hook">
              Deteksi kesegaran buah dan sayuran secara realtime hanya dengan mengarahkan kamera. Sistem bekerja langsung di browser, 
              sehingga tidak memerlukan instalasi aplikasi atau perangkat tambahan.
              
              Dirancang agar mudah digunakan siapa saja, kapan saja. Cukup buka browser, arahkan kamera, dan biarkan 
              sistem membantu mengenali kondisi buah dan sayuran secara praktis dan cepat.
            </p>
            <div className="demo-sample-dark">
              <span className="demo-sample-tag">Contoh Hasil Analisis</span>
              <h3>Apple Healthy</h3>
              <div className="demo-bars">
                {sampleResult.map((item) => (
                  <div className="demo-bar-row" key={item.label}>
                    <span className="demo-bar-label">{item.label}</span>
                    <div className="demo-bar-track">
                      <div className="demo-bar-fill" style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="demo-bar-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="demo-image glass">
            <img src="/example.jpg" alt="Contoh deteksi apel" />
          </div>
        </div>
      </section>

      <section className="section cara-section">
        <div className="cara-grid">
          <div className="cara-right">
            {steps.map((step) => (
              <div className="cara-step" key={step.title}>
                <div className="cara-bar">
                  <step.icon size={18} strokeWidth={2.2} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cara-left">
            <h2 className="cara-title">Instruksi Penggunaan</h2>
            <p className="cara-subtitle">
              Empat langkah singkat sebelum hasil analisis muncul.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Apa Kata Mereka</h2>
        <p className="section-subtitle">Pengalaman singkat dari yang sudah mencoba.</p>

        <div className="marquee">
          <div className="marquee-track">
            {loopTestimonials.map((t, i) => (
              <div className="testimonial-card glass" key={`${t.name}-${i}`}>
                <Quote size={20} strokeWidth={2.2} className="testimonial-quote" />
                <p>{t.text}</p>
                <span className="testimonial-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <p className="quote-text">
          "To forget how to dig the earth and to tend the soil is to forget ourselves"
        </p>
        <span className="quote-author">— Mahatma Gandhi</span>
      </section>
    </div>
  )
}
