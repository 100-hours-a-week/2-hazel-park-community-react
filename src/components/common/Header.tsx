import React, { useState, useEffect } from 'react'
import { getSessionUser } from '../../service/User-api'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/user/user'
import preProfile from '../../assets/pre-profile.png'

const Header: React.FC = () => {
  const navigation = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const sessionUser = await getSessionUser()
      setUser(sessionUser?.user || null)
    }
    fetchData()
  }, [])

  return (
    <header className="bg-white border-b border-solid border-b-lightBottom">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <p
            className="cursor-pointer text-xl font-bold "
            onClick={() => navigation('/')}
          >
            Hazel Forum
          </p>
          <div className="relative">
            <input
              type="text"
              className="rounded-full px-4 py-2 border focus:outline-none text-sm"
              placeholder="search"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <img
                src={user.profile_picture || preProfile}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          ) : (
            <button
              className="p-2 border rounded"
              onClick={() => navigation('/login')}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
