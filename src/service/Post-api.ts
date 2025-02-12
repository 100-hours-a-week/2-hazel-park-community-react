import { GetPostsResponse } from '../types/post/post'

const baseUrl = import.meta.env.VITE_APP_POST_URL

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
