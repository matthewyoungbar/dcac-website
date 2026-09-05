import './CoachesPage.css'
import tammyPhoto from '../assets/coach_tammy.webp'
import kevinPhoto from '../assets/coach_kevin.webp'
import grantPhoto from '../assets/coach_grant.webp'
import basiraPhoto from '../assets/coach_basira.webp'
import wilPhoto from '../assets/coach_wil.webp'
import nouraPhoto from '../assets/coach_noura.webp'
import kendallPhoto from '../assets/coach_kendall.webp'
import laurenPhoto from '../assets/coach_lauren.webp'
import samPhoto from '../assets/sam.webp'

interface Coach {
  name: string
  pronouns: string
  bio: string
  photo: string
}

const coaches: Coach[] = [
  {
    name: 'Tammy Lowengrub',
    photo: tammyPhoto,
    pronouns: 'she/her',
    bio: "Tammy joined the coaching staff at DCAC in 2007. Prior to coaching, she competed for NCAA Division III powerhouse Kenyon College. In addition to Masters coaching, Tammy coaches age group swimming for Nation's Capital Swim Club (NCAP). When not on a pool deck, Tammy can be found at Haute Bodhi Yoga studio teaching either a pilates or yoga class.",
  },
  {
    name: 'Kevin Majoros',
    photo: kevinPhoto,
    pronouns: 'he/him/his',
    bio: 'Kevin came up through age group swimming with the Greater Toledo Aquatic Club and swam NCAA Division 1 at Kent State University. He has been competing with DCAC since 1996 and represented the club and Team USA at the FINA Masters World Championships in Budapest in 2017. Kevin coached age group swimming for 10 years in Northern Ohio and is excited to be sharing his love of swimming with adults. Kevin is a Certified Level 1, 2, & 3 US Masters Swimming Coach.',
  },
  {
    name: 'Grant Casey',
    photo: grantPhoto,
    pronouns: 'he/him/his',
    bio: "Grant grew up swimming in New England for the Hockomock Area YMCA (HAY) and Attleboro Bluefish (ABF) club teams before swimming for Brown University, where he is the former record-holder in the 1,000 yard freestyle. He joined DCAC in 2019 when he moved to the DMV area after graduating school. Grant has been coaching for DCAC since 2023 and he thoroughly enjoys competing and training with the team regardless if he's on the deck or in the pool.",
  },
  {
    name: 'Basira Knight',
    photo: basiraPhoto,
    pronouns: 'she/her',
    bio: 'Basira started swimming at age 7 as part of her local summer team. By age 9, she was a competitive swimmer at the YMCA and remained with the team until she graduated high school. She then swam at The Catholic University of America, and still holds the school record for 100 breaststroke! After college, she coached for the Capitol Sea Devils as an age group coach for kids aged 5-12. She loves to travel and spend time with her cat, Misty Blue.',
  },
  {
    name: 'Wil Cosgrove',
    photo: wilPhoto,
    pronouns: 'he/him',
    bio: "Wil began swimming at the age of 4 with Radnor Aquatic Club, where he continued competing until the age of 19. In addition to RAC, he trained with five other swim clubs, gaining new styles and techniques. Wil went on to swim at American University, a Division 1 program. Over the years, he has coached swimmers of all ages, including a summer club and co-founding a swim school with his brother. Together, they successfully taught over 400 children to swim during the five summers the school operated. He now brings his experience and dedication to coaching the Master's team in DC.",
  },
  {
    name: 'Noura Hemady',
    photo: nouraPhoto,
    pronouns: 'she/her',
    bio: 'Noura started swimming at age 5, and represented the Padonia Pooh Bears and Towson YMCA Frogs until she was 17. As a collegiate athlete, she swam for four years with Goucher College. Her coaching career began at age 14, and she continued to coach kids of all ages throughout high school and college. She joined DCAC when she moved to DC in 2019.',
  },
  {
    name: 'Kendall Surhoff',
    photo: kendallPhoto,
    pronouns: 'she/her',
    bio: "Kendall grew up swimming for North Baltimore Aquatic Club, and competed in college at the University of North Carolina, Chapel Hill. These days, she prefers open water races to competing in a pool — especially if she can swim with her mom! Her open water adventures have taken her to Mexico, Egypt, and Greece. When she's not swimming, you can find her hiking, cycling, or planning her next road trip. Kendall's favorite part of coaching is connecting with and challenging swimmers of all ages and abilities.",
  },
  {
    name: 'Lauren Jee',
    photo: laurenPhoto,
    pronouns: 'she/her',
    bio: "Lauren began swimming with the Delta Aquatic Club in Cleveland, Mississippi, and later served as captain of her law school's intramural swim team. She returned to the sport through triathlon with the DC Tri Club and began swimming with DCAC in 2023. Lauren specializes in training newer swimmers and triathletes for open water swimming. Her favorite thing about coaching is building confidence in swimmers of all abilities and ages. Lauren is a Level 1 and 2 certified USMS swimming coach.",
  },
  {
    name: 'Sam Kuhn',
    photo: samPhoto,
    pronouns: 'he/him',
    bio: "",
  },
]

export function CoachesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <h1>Coaches</h1>
          </div>
        </div>
      </section>

      <main id="main" className="wrap" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <div className="coach-list">
            {coaches.map(c => (
              <article className="coach-card" key={c.name}>
                {/* alt="" — the coach's name is right beside the photo, so
                    describing it again would only double up in a screen reader */}
                <img className="coach-photo" src={c.photo} alt="" width="480" height="600" loading="lazy" />
                <div>
                  <h2 className="coach-name">
                    Coach {c.name} <span className="coach-pronouns">({c.pronouns})</span>
                  </h2>
                  <p className="coach-bio">{c.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="reach">
          Questions for the coaching staff? Email <a href="mailto:cocaptain@swimdcac.org">cocaptain@swimdcac.org</a>.
        </p>
      </main>
    </>
  )
}
