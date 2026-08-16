import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Leaf size={16} strokeWidth={2.2} />
          <span>Smart Plants Disease</span>
        </div>
        <p>© 2026 Smart Plants Disease. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  )
}
