import { useEffect, useState, useRef, useCallback } from 'react'
import Header from '../../components/common/Header'
import PostCard from '../../components/posts/Post-card'
import { Post } from '../..//types/post/post'
import { getPosts } from '../../service/Post-api'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await getPosts(page, 4)

      if (response && response.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.posts])
        if (response.posts.length < 4) {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [page, hasMore, loading])

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return

      // 이전 observer 해제
      if (observer.current) observer.current.disconnect()

      // 새로운 observer 생성
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1)
          }
        },
        {
          root: null,
          rootMargin: '8px',
          threshold: 0.1, // 10%만 보여도 트리거
        }
      )

      if (node) observer.current.observe(node)
    },
    [hasMore, loading]
  )

  useEffect(() => {
    fetchPosts()
  }, [page])

  const handleClick = () => {
    alert('어라')
  }

  return (
    <>
      <Header />
      <div className="flex justify-center mt-5">
        <div className="flex w-[680px] justify-end">
          <button
            className="w-[138px] h-10 p-1 rounded shadow-md text-center"
            onClick={handleClick}
          >
            <span className="font-medium text-base text-contentGray">
              Write
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 min-h-screen">
        {posts.map((post, index) => {
          const isLastPost = index === posts.length - 1

          return isLastPost ? (
            <div key={`${post.id}-${index}`} ref={lastPostRef}>
              <PostCard post={post} />
            </div>
          ) : (
            <PostCard key={`${post.id}-${index}`} post={post} />
          )
        })}

        {loading && (
          <div className="w-full flex justify-center p-4">
            <DotLottieReact
              src="https://lottie.host/feb8b006-73d6-4336-98ff-293629b06ff6/L35Y1HiN1A.lottie"
              loop
              autoplay
            />
          </div>
        )}

        {!hasMore && !loading && posts.length > 0 && (
          <div className="w-full flex justify-center p-4">
            <DotLottieReact
              src="https://lottie.host/d40b7d9d-466e-4691-8206-8d432a18d409/DYX4SjXxpV.lottie"
              loop
              autoplay
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Posts
