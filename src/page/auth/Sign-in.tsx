import { useState } from 'react'
import InputForm from '../../components/auth/Input-form'
import SubmitBtn from '../../components/auth/Submit-btn'
import Header from '../../components/common/Header'
import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
} from '../../service/User-api'
import preProfile from '../../assets/pre-profile.png'

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
    profileImage: null as File | null,
  })
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
  })
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  )

  const debounce = (func: Function, delay: number) => {
    let timer: number
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = window.setTimeout(() => func(...args), delay)
    }
  }

  const validateEmail = async (email: string) => {
    if (!email) {
      setFormErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }))
      return
    }
    const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z\-]+$/
    if (!emailPattern.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: '올바른 이메일 주소 형식을 입력해주세요.',
      }))
      return
    }
    const emailCheck = await checkEmailDuplicate(email)
    if (emailCheck.code == 400) {
      setFormErrors((prev) => ({
        ...prev,
        email: emailCheck.message,
      }))
    } else {
      setFormErrors((prev) => ({ ...prev, email: '' }))
    }
  }

  const validateNickname = debounce(async (nickname: string) => {
    if (!nickname) {
      setFormErrors((prev) => ({ ...prev, nickname: '닉네임을 입력해주세요.' }))
      return '닉네임을 입력해주세요.'
    }

    if (nickname.length < 2 || nickname.length > 10) {
      setFormErrors((prev) => ({
        ...prev,
        nickname: '닉네임은 2자 이상 10자 이하로 입력해주세요.',
      }))
      return '닉네임은 2자 이상 10자 이하로 입력해주세요.'
    }

    if (/\s/.test(nickname)) {
      setFormErrors((prev) => ({
        ...prev,
        nickname: '닉네임에는 띄어쓰기를 사용할 수 없습니다.',
      }))
      return '닉네임에는 띄어쓰기를 사용할 수 없습니다.'
    }

    const nicknameCheck = await checkNicknameDuplicate(nickname)
    if (nicknameCheck.code == 400) {
      setFormErrors((prev) => ({
        ...prev,
        nickname: nicknameCheck.message,
      }))
    } else {
      setFormErrors((prev) => ({ ...prev, nickname: '' }))
    }
  }, 500)

  const validatePassword = (password: string): string => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/

    if (!password) {
      return '비밀번호를 입력해주세요.'
    }

    if (password.length < 8 || password.length > 20) {
      return '비밀번호는 8자 이상, 20자 이하이어야 합니다.'
    }

    if (!passwordPattern.test(password)) {
      return '비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
    }

    return ''
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    switch (field) {
      case 'email':
        validateEmail(value)
        break
      case 'password':
        const passwordError = validatePassword(value)
        if (passwordError) {
          setFormErrors((prev) => ({
            ...prev,
            password: passwordError,
          }))
        } else {
          setFormErrors((prev) => ({ ...prev, password: '' }))
        }
        break
      case 'rePassword':
        if (value !== formData.password) {
          setFormErrors((prev) => ({
            ...prev,
            rePassword: '비밀번호가 일치하지 않습니다.',
          }))
        } else {
          setFormErrors((prev) => ({ ...prev, rePassword: '' }))
        }
        break
      case 'nickname':
        validateNickname(value)
        break
      default:
        break
    }
  }

  const handleProfileImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, profileImage: file }))

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProfileImagePreview(null)
    }
  }

  const handleSubmit = async () => {
    const errors = {
      email: '닉네임을 입력해주세요.',
      password: validatePassword(formData.password),
      rePassword: '비밀번호가 일치하지 않습니다.',
      nickname: '닉네임을 입력해주세요.',
    }

    setFormErrors(errors)

    if (Object.values(errors).every((error) => error === '')) {
      alert('띠요옹')
    }
  }

  return (
    <>
      <Header />
      <div className="mt-20 text-center">
        <div className="mb-10 text-3xl text-nowrap">Sign in</div>
        <div className="flex justify-center text-start">
          <div className="w-[392px] flex flex-col pt-6 px-5">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-2 text-sm w-[352px] self-start">Profile</div>
              <label htmlFor="profileImage">
                <img
                  src={profileImagePreview || preProfile}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover cursor-pointer"
                />
              </label>
              <input
                id="profileImage"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={(e) =>
                  handleProfileImageChange(e.target.files?.[0] || null)
                }
              />
            </div>

            <InputForm
              title="Email *"
              inputType="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={formErrors.email}
            />

            <InputForm
              title="Password *"
              inputType="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              error={formErrors.password}
            />

            <InputForm
              title="Re password *"
              inputType="password"
              value={formData.rePassword}
              onChange={(value) => handleInputChange('rePassword', value)}
              error={formErrors.rePassword}
            />

            <InputForm
              title="Nickname *"
              inputType="text"
              value={formData.nickname}
              onChange={(value) => handleInputChange('nickname', value)}
              error={formErrors.nickname}
            />

            <SubmitBtn title="signin" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}
