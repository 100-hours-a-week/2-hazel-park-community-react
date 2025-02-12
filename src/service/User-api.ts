import {
  SessionUserResponse,
  CheckEmailResponse,
  CheckNicknameResponse,
} from '../types/user/user'

const baseUrl = import.meta.env.VITE_APP_USER_URL

export async function getSessionUser(): Promise<SessionUserResponse | null> {
  try {
    const response = await fetch(`${baseUrl}/user-session`, {
      method: 'GET',
      credentials: 'include',
    })

    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  } catch (error) {
    console.error('세션 사용자 확인 실패:', error)
    return null
  }
}

export async function checkEmailDuplicate(
  email: string
): Promise<CheckEmailResponse> {
  try {
    const response = await fetch(`${baseUrl}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    return await response.json()
  } catch (error) {
    console.error('이메일 중복 확인 오류:', error)
    return { code: 500, message: '서버와의 통신에 실패했습니다.' }
  }
}

export async function checkNicknameDuplicate(
  nickname: string
): Promise<CheckNicknameResponse> {
  try {
    const response = await fetch(`${baseUrl}/nickname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    })
    return await response.json()
  } catch (error) {
    console.error('닉네임 중복 확인 오류:', error)
    return { code: 500, message: '서버와의 통신에 실패했습니다.' }
  }
}
