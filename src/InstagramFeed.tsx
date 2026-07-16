import { posts } from 'virtual:instagram-feed'

export function InstagramFeed() {
  if (posts.length === 0) return null

  return (
    <div className="insta">
      <div className="insta-head">
        <span className="lbl">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          @swimdcac
        </span>
        <a href="https://instagram.com/swimdcac" target="_blank" rel="noopener noreferrer">
          Follow us →
        </a>
      </div>
      <div className="insta-grid">
        {posts.map(post => (
          <a
            key={post.id}
            className="insta-post"
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={post.caption?.slice(0, 100) ?? 'View on Instagram'}
          >
            <img src={post.local_image} alt="" loading="lazy" />
            {post.media_type === 'VIDEO' && (
              <span className="insta-badge" aria-hidden="true">▶</span>
            )}
            {post.media_type === 'CAROUSEL_ALBUM' && (
              <span className="insta-badge" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="9" height="9" rx="1" />
                  <rect x="13" y="2" width="9" height="9" rx="1" />
                  <rect x="2" y="13" width="9" height="9" rx="1" />
                  <rect x="13" y="13" width="9" height="9" rx="1" />
                </svg>
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
