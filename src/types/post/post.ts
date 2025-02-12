export interface Post {
  id: number
  title: string
  writer: string
  updated_at: string
  contents: string
  likes: number
  views: number
  comments: number
  post_img?: string | null
  img?: string | null
}

export interface GetPostsResponse {
  message: string
  posts: Post[]
  pagination: {
    total: number
    page: number
    limit: number
  }
}

export interface GetPostDetailResponse {
  post_id: number
  post_title: string
  post_updated_at: string
  post_writer: string
  post_contents: string
  post_likes: number
  post_views: number
  post_comments: number
  post_img: string | null
  user_img: string | null
  author_profile_picture: string | null
}
