import preProfile from '../../assets/pre-profile.png'
import { formatDate, formatTime } from '../../utils/Format-date'
import { Post } from '../../types/post/post'
import checkCount from '../../utils/Check-count'

interface postCardProps {
  post: Post
}

export default function PostCard({ post }: postCardProps) {
  const handleClick = () => {
    alert('오잉')
  }
  return (
    <div
      className="w-[680px] h-[193px] p-4 flex flex-col cursor-pointer border-solid border-b border-b-lightBottom 
             hover:shadow-lg hover:shadow-[rgba(204,204,204,0.25)] hover:-translate-y-1 
             hover:transition-all hover:duration-300 hover:ease-in-out"
      onClick={handleClick}
    >
      <div className="py-1 flex flex-row gap-3 font-normal text-sm leading-5 items-center">
        <img
          src={post.img || preProfile}
          alt="profile_img"
          className="w-5 h-5 rounded-full"
        />
        <div className="block font-normal text-sm leading-5 cursor-pointer text-black">
          {post.writer}
        </div>
      </div>
      <div className="h-full flex justify-between font-normal text-sm cursor-pointer">
        <div className="text-overflow flex flex-col max-w-[464px] gap-5">
          <div className=" font-bold text-2xl leading-8 max-h-16 break-words">
            {post.title}
          </div>
          <div className="mt-2 font-normal text-base leading-5 max-h-20 text-contentGray">
            {post.contents}
          </div>
        </div>
        {post.post_img ? (
          <img
            src={post.post_img}
            alt="post_img"
            className="w-40 h-[107px] object-cover rounded-sm"
          />
        ) : (
          ''
        )}
      </div>
      <div className="mt-5 flex flex-row gap-5 text-contentGray font-normal text-sm leading-4">
        <div className="block items-start text-nowrap">
          {formatDate(post.updated_at) + ' ' + formatTime(post.updated_at)}
        </div>
        <div className="flex flex-row gap-1">
          <i className="fa-solid fa-heart"></i>
          <div>{checkCount(post.likes)}</div>
        </div>
        <div className="flex flex-row gap-1">
          <i className="fa-solid fa-comment"></i>
          <div>{checkCount(post.comments)}</div>
        </div>
        <div className="flex flex-row gap-1">
          <i className="fa-solid fa-eye"></i>
          <div>{checkCount(post.views)}</div>
        </div>
      </div>
    </div>
  )
}
