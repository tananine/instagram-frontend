import BasePage from '/components/BasePage'
import BaseLayout from '/components/Layouts/BaseLayout'
import PostGallery from '/components/page/profile/PostGallery'
import PrivateAlert from '/components/page/profile/privateAlert'
import ButtonCustom from '/components/shared/ButtonCustom'
import ButtonCustomUn from '/components/shared/ButtonCustomUn'
import { Avatar, Divider } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const router = useRouter()
  const targetId = router.query.id
  const userId = useSelector((state) => state.userInfo.userId)
  const [user, setUser] = useState(null)
  const [meStatus, setMeStatus] = useState(false)
  const [statusFollow, setStatusFollow] = useState(0)

  useEffect(() => {
    if (targetId) {
      axios.get('/profile/get-follower').then((res) => {
        if (res.data.follow.includes(userId)) {
          setStatusFollow(1)
        }
      })
      axios.post('/profile/get-profile', { userId: targetId }).then((res) => {
        setUser(res.data)
        if (targetId === userId) {
          setMeStatus(true)
        }
      })
      if (targetId.toString() === userId.toString()) {
        setMeStatus(true)
      } else {
        setMeStatus(false)
      }
    } else {
      router.push('/')
    }
  }, [])

  const sendFollow = (e) => {
    setStatusFollow(e)
  }

  const showMeStatus = () => {
    if (meStatus) {
      return (
        <ButtonCustom title="แก้ไขโพรไฟล์" className="ml-[20px] px-[16px]" />
      )
    } else {
      if (statusFollow === 1) {
        return (
          <ButtonCustomUn
            title="กำลังติดตาม"
            className="ml-[20px] px-[16px]"
            onClick={() => sendFollow(0)}
          />
          // <ButtonCustom
          //   title="ติดตามกลับ"
          //   className="ml-[20px] px-[16px]"
          // />
        )
      } else {
        return (
          <ButtonCustom
            title="ติดตาม"
            className="ml-[20px] px-[16px]"
            onClick={() => sendFollow(1)}
          />
        )
      }
    }
  }

  return (
    <BaseLayout>
      <BasePage title="instagram">
        <div className="flex pt-[30px]">
          <div className="mr-[30px] flex shrink-0 grow justify-center">
            <Avatar
              src={
                user?.user?.profileImage
                  ? `http://localhost:3001/${user.user.profileImage}`
                  : ''
              }
              alt=""
              className="h-[150px] w-[150px]"
            />
          </div>
          <div className="flex grow-[2] flex-col">
            <div className="flex items-center">
              <a className="text-[30px] font-[300]">{user?.user?.name}</a>
              {showMeStatus()}
              {/* <div className="p-[8px]">
                <svg
                  aria-label="ตัวเลือก"
                  color="#262626"
                  fill="#262626"
                  height="32"
                  role="img"
                  viewBox="0 0 24 24"
                  width="32"
                >
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              </div> */}
            </div>
            <div className="mt-[16px] flex basis-[30px] text-[18px] font-[400]">
              <a className="mr-[40px]">
                <span className="font-[600]">{user?.post?.length}</span> โพสต์
              </a>
              <a className="mr-[40px]">
                ผู้ติดตาม <span className="font-[600]">{user?.follower}</span>{' '}
                คน
              </a>
              <a className="mr-[40px]">
                กำลังติดตาม{' '}
                <span className="font-[600]">{user?.meFollower}</span> คน
              </a>
            </div>
            <div className="mt-[16px]">{user?.user?.description}</div>
            {/* <div className="mt-[14px] text-[14px] text-[#8e8e8e]">
              ติดตามโดย <span className="font-[600] text-black">name</span> +
              คนอื่นๆ อีก 10 คน
            </div> */}
          </div>
        </div>
        <Divider className="mt-[44px]" />
        {/* <PrivateAlert /> */}
        <PostGallery post={user?.post} />
      </BasePage>
    </BaseLayout>
  )
}

export default Profile
