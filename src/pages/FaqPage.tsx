import { Link } from 'wouter'
import type { ComponentChildren } from 'preact'
import faqPhoto from '../assets/faq.webp'
import './FaqPage.css'

interface Faq {
  q: string
  a: ComponentChildren
}

const faqs: Faq[] = [
  {
    q: 'Is there a waiting list?',
    a: <p>No! We are always looking for new swimmers to join us.</p>,
  },
  {
    q: "I haven't swam for years and I am out of shape. Will I fit in?",
    a: (
      <p>
        Yes! We will get you back into shape. Our workout lanes are set up so that you will swim with other people of similar abilities. We recommend that you feel comfortable swimming in a coached practice with other swimmers and be able to complete sets like 4x100 yard freestyle on a 2:00 interval.
      </p>
    ),
  },
  {
    q: 'I am not a member of the LGBT community. Can I still join?',
    a: <p>Yes! We celebrate and welcome all gender identities, ethnicities &amp; sexual identities.</p>,
  },
  {
    q: 'I want to learn how to swim. Do you provide adult swim lessons?',
    a: (
      <p>
        DCAC does not offer adult swim lessons. The <a href="https://dpr.dc.gov">D.C. Parks &amp; Recreation Department</a> has adult swim lessons you can sign up for. We recommend that you feel comfortable swimming in a coached practice with other swimmers and be able to complete sets like 4x100 yard freestyle on a 2:00 interval.
      </p>
    ),
  },
  {
    q: 'Where do you swim and can I swim at multiple pools?',
    a: (
      <p>
        We swim in multiple pools throughout the D.C. metro area. See our <Link href="/schedule">practice schedule</Link> for our current active pools, and our pool directions page for info on locations. You can swim at any of our practices.
      </p>
    ),
  },
  {
    q: 'What are the costs?',
    a: (
      <p>
        You can find the path to membership and the costs on our <Link href="/join">how to join</Link> page.
      </p>
    ),
  },
  {
    q: 'Do I have to compete in meets?',
    a: (
      <p>
        No! Many of our members do not compete and swim with us for fitness, health and wellness. Don't be surprised if we suggest it on occasion though.
      </p>
    ),
  },
  {
    q: 'How often do I have to come to practice?',
    a: (
      <p>
        Most of our pool dues options allow for unlimited swimming within our schedule. There is no attendance requirement and you can come as often, or as little as you like.
      </p>
    ),
  },
  {
    q: 'Can I bring training gear to practices?',
    a: (
      <p>
        Yes, we welcome swim paddles, pull buoys, fins, kickboards and snorkels. A few of our training pools have pull buoys and kickboards on hand. You can do all of our practices without training gear.
      </p>
    ),
  },
  {
    q: "What if I don't know how to swim all four competitive strokes?",
    a: (
      <p>
        DCAC's team of coaches will help you with technique and stroke correction to achieve your goals. We offer periodic stroke clinics focused on each individual stroke. As above, you should be comfortable with freestyle at a minimum.
      </p>
    ),
  },
  {
    q: "What if I can't afford to join the team?",
    a: (
      <p>
        DCAC offers several types of financial assistance to assist in the cost of pool dues. See our scholarships page.
      </p>
    ),
  },
  {
    q: "I'm a Masters swimmer and I'm visiting DC. Can I practice with you?",
    a: (
      <p>
        Yes! DCAC welcomes visitors from other USMS teams. Show up to any practice and introduce yourself to the coach. Don't forget to bring proof of USMS membership! Visitors are welcome to one free swim per quarter.
      </p>
    ),
  },
  {
    q: 'How does the team keep in touch?',
    a: (
      <p>
        Most of our day-to-day team chatter happens on Discord — practice updates, meet planning, carpools and social plans all live there. Email <a href="mailto:membership@swimdcac.org">membership@swimdcac.org</a>, our membership chair, for an invite.
      </p>
    ),
  },
  {
    q: 'Who can I contact with questions?',
    a: (
      <p>
        There is a list of contact emails on our <Link href="/contact">contact us</Link> page.
      </p>
    ),
  },
  {
    q: 'Can I try the team out before I join?',
    a: (
      <p>
        Yes! See our <Link href="/trial">trial swimmers</Link> page.
      </p>
    ),
  },
  {
    q: 'Who are the coaches?',
    a: (
      <p>
        We have a great team of coaches who will help you achieve your goals. See our <Link href="/coaches">coaches</Link> page.
      </p>
    ),
  },
  {
    q: 'I want to compete. What swim meets do you go to?',
    a: (
      <p>
        We love to compete! We participate in many <Link href="/competition">focus meets</Link> throughout the year, and usually have a handful of members attend most DMV-area meets. We compete locally, nationally and internationally. Our big meet every year is the IGLA World Championships. Former locations for the Championships have been New York City, Paris, Miami, Edmonton, Stockholm, Cleveland, Seattle, Reykjavik, Honolulu, Melbourne and Cologne.
      </p>
    ),
  },
  {
    q: "I'm still nervous.",
    a: <p>Just grab your suit and come to practice. You'll be glad you did.</p>,
  },
]

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
                <div className="faq-a">{f.a}</div>
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
