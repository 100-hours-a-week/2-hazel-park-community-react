import { useState } from 'react'
import InputForm from '../../components/auth/Input-form'
import SubmitBtn from '../../components/auth/Submit-btn'
import Header from '../../components/common/Header'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState({ email: '', password: '' })

  const validateEmail = (email: string): string => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!email) {
      return '이메일을 입력해주세요.'
    }
    if (!emailPattern.test(email)) {
      return '올바른 이메일 주소 형식을 입력해주세요.'
    }
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) {
      return '비밀번호를 입력해주세요.'
    }
    if (password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.'
    }
    return ''
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // 입력값에 따라 바로 유효성 검사 실행
    const error =
      field === 'email' ? validateEmail(value) : validatePassword(value)
    setFormErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }

    setFormErrors(errors)

    if (Object.values(errors).every((error) => error === '')) {
      alert('띠용')
    }
  }

  return (
    <>
      <Header />
      <div className="mt-48 text-center">
        <div className="mb-10 text-3xl text-nowrap">Welcome</div>
        <div className="flex justify-center text-start">
          <div className="w-[392px] flex flex-col pt-6 px-5">
            <InputForm
              title="Email"
              inputType="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={formErrors.email}
            />

            <InputForm
              title="Password"
              inputType="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              error={formErrors.password}
            />

            <SubmitBtn title="login" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}
