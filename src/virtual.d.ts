declare module 'virtual:instagram-feed' {
  export interface InstagramPost {
    id: string
    caption?: string
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
    local_image: string
    permalink: string
    timestamp: string
  }
  export const posts: InstagramPost[]
}
