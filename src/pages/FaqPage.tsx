import faqs from '../content/faq.json'
import { RichText } from '../components/RichText.tsx'
import faqPhoto from '../assets/faq.webp'
import './FaqPage.css'

const Chevron = () => (
  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Frequently asked questions</h1>
          </div>
        </div>
      </section>

      <main id="main" className="wrap" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <figure className="faq-photo">
          <img
            src={faqPhoto}
            alt="Three DCAC members in swimsuits, holding pool floats and wearing rainbow heart stickers, at a DC Pride event."
            width="1200"
            height="1144"
            loading="lazy"
          />
        </figure>

        <section className="meets-section">
          <div className="faq-list">
            {faqs.map(f => (
              <details className="faq-item" key={f.q}>
                <summary className="faq-q">
                  {f.q}
                  <Chevron />
                </summary>
                <div className="faq-a">
                  <p><RichText text={f.a} /></p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <p className="reach">
          Still have a question? Email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>.
        </p>
      </main>
    </>
  )
}
