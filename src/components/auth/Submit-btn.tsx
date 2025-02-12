import { useNavigate } from 'react-router-dom'

interface submitBtnProps {
  title: string
  onClick: () => void
}

const btnValues: { [key: string]: string } = {
  login: 'Log in',
  signin: 'Sign in',
}

const gotoValues: { [key: string]: string } = {
  login: 'Sign in',
  signin: 'Already have an account?',
}

export default function SubmitBtn({ title, onClick }: submitBtnProps) {
  const navigator = useNavigate()

  const handleClick = () => {
    if (title == 'login') {
      navigator('/signin')
    }

    if (title == 'signin') {
      navigator('/login')
    }
  }

  return (
    <>
      <div className="flex flex-col mt-2 gap-3 justify-center">
        <input
          type="submit"
          value={btnValues[title] || ''}
          className="w-[355px] h-[33px] py-auto rounded-md text-sm text-white bg-inputBg cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            onClick()
          }}
        />
        <div className="text-center cursor-pointer mb-5" onClick={handleClick}>
          {gotoValues[title] || ''}
        </div>
      </div>
    </>
  )
}
