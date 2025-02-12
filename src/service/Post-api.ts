import { GetPostsResponse } from '../types/post/post'

const baseUrl = 'http://127.0.0.1:3000/api/posts'

export async function getPosts(
  page: number,
  limit: number
): Promise<GetPostsResponse | null> {
  try {
    const response = await fetch(`${baseUrl}?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error(`Error: ${response.status}`)

    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
