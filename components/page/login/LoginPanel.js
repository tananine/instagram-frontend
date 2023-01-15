import ButtonCustom from '/components/shared/ButtonCustom'
import InputCustom from '/components/shared/InputCustom'
import { Card, Divider } from '@mui/material'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const fbIcon = () => {
  return (
    <svg
      fill="#385085"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22px"
      height="22px"
    >
      <path d="M21,3H3v18h9.621v-6.961h-2.343v-2.725h2.343V9.309c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105 v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7l-0.351,2.725h-2.365V21H21V3z" />
    </svg>
  )
}

const LoginPanel = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    deleteCookie('token')
  }, [])

  const setEmailHandler = e => {
    setEmail(e.target.value)
  }
  const setPasswordHandler = e => {
    setPassword(e.target.value)
  }

  const login = () => {
    const payload = {
      email: email,
      password: password,
    }
    axios
      .post('/auth/login', payload)
      .then(res => {
        document.cookie = `token=${res.data.token}`
        router.push('/')
      })
      .catch(() => {
        alert('Login fail')
      })
  }

  return (
    <div className="w-[350px]">
      <Card
        variant="outlined"
        className="mb-[10px] mt-[12px] flex flex-col items-center rounded-[1px] pt-[46px] pb-[10px]"
      >
        <Image
          src={require('/public/logo.png')}
          alt="Logo"
          width={175}
          height={51}
        />
        <div className="mt-[28px] mb-[10px] w-full px-[40px] text-center">
          <InputCustom
            className="mb-[6px]"
            fullWidth
            label="หมายเลขโทรศัพท์ ชื่อผู้ใช้ หรืออีเมล"
            variant="filled"
            value={email}
            onInput={e => setEmailHandler(e)}
          />
          <InputCustom
            className="mb-[6px]"
            fullWidth
            label="รหัสผ่าน"
            variant="filled"
            value={password}
            onInput={e => setPasswordHandler(e)}
          />
          <ButtonCustom
            title="เข้าสู่ระบบ"
            className="mt-[8px] mb-[16px]"
            fullWidth
            onClick={login}
          />
          <Divider className="text-[13px] text-[#8e8e8e]">หรือ</Divider>
          <div className="mt-[26px] flex justify-center pb-[8px] text-[14px] font-[600] text-[#385085]">
            {fbIcon()}
            <span className="ml-[8px]">เข้าสู่ระบบด้วย Facebook</span>
          </div>
          <div className="mt-[12px] text-[12px] text-[#00376b]">
            ลืมรหัสผ่านใช่ไหม
          </div>
        </div>
      </Card>
      <Card
        variant="outlined"
        className="mt-[12px] mb-[10px] rounded-[1px] py-[5px] text-center text-[14px]"
      >
        <div className="m-[15px]">
          หากยังไม่มีบัญชี{' '}
          <span className="font-[600] text-[#0095f6]">สมัครใช้งาน</span>
        </div>
      </Card>
      <div className="p-[10px] text-center text-[14px]">ติดตั้งแอพ</div>
      <div className="flex justify-center gap-[8px] py-[10px]">
        <Image
          src={require('/public/ios.png')}
          alt="ios"
          width={136}
          height={40}
        />
        <Image
          src={require('/public/android.png')}
          alt="ios"
          width={136}
          height={40}
        />
      </div>
    </div>
  )
}

export default LoginPanel
