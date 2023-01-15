import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const router = useRouter()

  const meName = useSelector(state => state.userInfo.userName)
  const meId = useSelector(state => state.userInfo.userId)
  const meDescription = useSelector(state => state.userInfo.description)
  const meImage = useSelector(state => state.userInfo.profileImage)

  const goProfile = () => {
    router.push('/profile/' + meId)
  }

  return (
    <div className="item-center mt-[16px] mb-[10px] flex">
      <Avatar
        src={meImage ? `http://localhost:3001/${meImage}` : ''}
        className="h-[56px] w-[56px]"
        alt="profile"
      />
      <div className="ml-[12px] flex w-full items-center justify-between">
        <div className="leading-[1.2]">
          <div className="cursor-pointer font-[600]" onClick={goProfile}>
            {meName}
          </div>
          <div className="text-[#8e8e8e]">{meDescription}</div>
        </div>
        <div
          className="cursor-pointer text-[14px] font-[600] text-[#0095f6]"
          onClick={goProfile}
        >
          ดูโพรไฟล์
        </div>
      </div>
    </div>
  )
}

export default MyProfile
