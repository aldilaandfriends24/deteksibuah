import { AtSign, Code2, Ban, Target, Sparkles } from 'lucide-react'

const team = [
  { name: 'Aldila Alif A.', no: '01', role: 'Data Researcher', instagram: 'aldiief', github: null },
  { name: 'Andry Muh I.D.R.', no: '05', role: 'Full-Stack + DevOps', instagram: 'andry_2511', github: 'andry968' },
  { name: 'Gendhis Ghaniyah', no: '09', role: 'Operations Support', instagram: 'geghaniy.a', github: null },
  { name: 'Fajar Indah Q.', no: '10', role: 'Operations Support', instagram: 'fjar_iindh', github: null },
  { name: 'M. Fahri Firnando', no: '17', role: 'Full-Stack Dev + IoT Engineer', instagram: 'mfahrifirnando', github: 'mfahrifirnando' },
  { name: 'Novansa Rofiq A', no: '22', role: 'Koordinator', instagram: '12ofiqsz', github: '12ofiqsz' },
]

function LinkButton({ href, icon: Icon, label }) {
  if (!href) {
    return (
      <button className="btn btn-ghost btn-disabled" disabled>
        <Ban size={16} strokeWidth={2.2} />
        Belum dicantumkan
      </button>
    )
  }
  return (
    <a className="btn btn-ghost" href={href} target="_blank" rel="noreferrer">
      <Icon size={16} strokeWidth={2.2} />
      {label}
    </a>
  )
}

export default function About() {
  return (
    <div className="page about-page">
      <section className="section about-intro">
        <div className="about-icon glass">
          <Target size={22} strokeWidth={2.2} />
        </div>
        <h1 className="section-title section-title-center">Tujuan</h1>
        <p className="section-subtitle section-subtitle-center">
          Smart Plants Disease dibangun untuk membantu siapa saja mengenali kondisi buah dan
          sayuran secara cepat dan mudah, tanpa perlu keahlian khusus. Melalui kamera yang
          langsung membaca kondisi objek, kami berharap proses sortir hasil panen, pengecekan
          stok di kios, maupun pembelajaran seputar identifikasi penyakit tanaman bisa
          dilakukan lebih praktis, di mana saja, dan sepenuhnya lewat browser.
        </p>
        <a
          className="btn btn-ghost"
          href="https://github.com/aldilaandfriends24"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 size={16} strokeWidth={2.2} />
          Collab Us!
        </a>
      </section>

      <section className="section">
        <h2 className="section-title section-title-center">Tim Pengembang</h2>
        <p className="section-subtitle section-subtitle-center">
          Website kreatif ini dirancang dan dibangun oleh Siswa-Siswi SMK Negeri 2 Klaten.
        </p>

        <div className="team-grid">
          {team.map((member) => {
            const igUrl = member.instagram ? `https://instagram.com/${member.instagram}` : null
            const ghUrl = member.github ? `https://github.com/${member.github}` : null

            return (
              <div className="team-card glass" key={member.no}>
                <div className="team-card-header">
                  <span className="team-no">{member.no}</span>
                  <div>
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                  </div>
                </div>
                <div className="team-links">
                  <LinkButton href={igUrl} icon={AtSign} label="Instagram" />
                  <LinkButton href={ghUrl} icon={Code2} label="GitHub" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section closing-section glass">
        <Sparkles size={22} strokeWidth={2.2} />
        <p>
          Terima kasih telah mencoba Smart Plants Disease. Kami percaya hal-hal sederhana yang
          dikerjakan dengan sungguh-sungguh bisa memberi manfaat nyata. Semoga karya kecil ini
          jadi langkah awal yang berarti, bagi kami untuk terus belajar, dan bagi siapa pun
          yang menggunakannya untuk merawat hasil bumi dengan lebih baik.
        </p>
      </section>
    </div>
  )
}
