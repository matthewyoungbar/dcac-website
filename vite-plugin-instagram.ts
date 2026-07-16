import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:instagram-feed'
const RESOLVED_ID = '\0virtual:instagram-feed'

export interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  local_image: string
  permalink: string
  timestamp: string
}

interface RawPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

export function instagramFeed(options: { count?: number } = {}): Plugin {
  const { count = 9 } = options
  let posts: InstagramPost[] = []

  return {
    name: 'instagram-feed',

    async buildStart() {
      const token = process.env.INSTAGRAM_TOKEN
      if (!token) {
        this.warn('INSTAGRAM_TOKEN not set — Instagram feed will be empty')
        return
      }

      // Refresh the token so it doesn't expire (non-fatal if it fails)
      try {
        await fetch(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
        )
      } catch { /* non-fatal */ }

      // Fetch post metadata
      let rawPosts: RawPost[]
      try {
        const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
        const res = await fetch(
          `https://graph.instagram.com/me/media?fields=${fields}&limit=${count}&access_token=${token}`
        )
        if (!res.ok) {
          this.warn(`Instagram API returned ${res.status} — feed will be empty`)
          return
        }
        const json = await res.json() as { data: RawPost[] }
        rawPosts = json.data ?? []
      } catch (err) {
        this.warn(`Instagram fetch failed: ${err} — feed will be empty`)
        return
      }

      // Download images into public/instagram/ so URLs don't expire
      const publicDir = join(process.cwd(), 'public', 'instagram')
      mkdirSync(publicDir, { recursive: true })

      const settled = await Promise.allSettled(
        rawPosts.map(async (post): Promise<InstagramPost> => {
          const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url! : post.media_url
          const filename = `${post.id}.jpg`
          const filepath = join(publicDir, filename)

          if (!existsSync(filepath)) {
            const imgRes = await fetch(imageUrl)
            if (!imgRes.ok) throw new Error(`image fetch ${imgRes.status}`)
            writeFileSync(filepath, Buffer.from(await imgRes.arrayBuffer()))
          }

          return {
            id: post.id,
            caption: post.caption,
            media_type: post.media_type,
            local_image: `/instagram/${filename}`,
            permalink: post.permalink,
            timestamp: post.timestamp,
          }
        })
      )

      const failed = settled.filter(r => r.status === 'rejected').length
      if (failed) this.warn(`${failed} Instagram image(s) failed to download`)

      posts = settled
        .filter((r): r is PromiseFulfilledResult<InstagramPost> => r.status === 'fulfilled')
        .map(r => r.value)

      console.log(`[instagram-feed] ${posts.length} posts ready`)
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return `export const posts = ${JSON.stringify(posts)}`
      }
    },
  }
}
