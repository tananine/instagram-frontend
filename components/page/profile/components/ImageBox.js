import PostModal from '/components/shared/PostModal'
import { Grid } from '@mui/material'
import axios from 'axios'
import Moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ImageBox = props => {
  const userId = useSelector(state => state.userInfo.userId)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [isLike, setIsLike] = useState(false)
  const [like, setLike] = useState(props?.post?.postLikes?.length)

  const [checkLike, setCheckLike] = useState(
    props?.post?.postLikes?.map(item => {
      return item.userId
    })
  )
  useEffect(() => {
    setIsLike(checkLike?.includes(userId))
  }, [])

  const toggle = e => {
    axios.post('/post/like-post', { postId: props.post.id }).then(() => {
      if (e) {
        setLike(prev => prev + 1)
      } else {
        setLike(prev => prev - 1)
      }
      setIsLike(e)
    })
  }

  const date = () => {
    const create = Moment(props.post.createdAt)
    const now = Moment(Date.now())
    const date = now.diff(create, 'days')
    const hour = now.diff(create, 'hours')
    const minute = now.diff(create, 'minutes')
    if (date && date <= 6) {
      return <div>{now.diff(create, 'days')} วันที่แล้ว</div>
    } else if (date) {
      return <div>{Moment(create).format('DD/MM/YY')}</div>
    } else if (hour) {
      return <div>{now.diff(create, 'hours')} ชั่วโมงที่แล้ว</div>
    } else if (minute) {
      return <div>{now.diff(create, 'minutes')} นาทีที่แล้ว</div>
    }
    return <div>เมื่อซักครู่</div>
  }

  return (
    <Grid item w0={4}>
      <div
        onClick={handleOpen}
        className="relative aspect-square cursor-pointer border border-[#e8e8e8]"
      >
        <div className="absolute z-50 flex h-full w-full flex-col justify-center bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-100">
          <p className="text-center text-[18px] font-[600] text-white">
            <svg
              aria-label="ฟีดกิจกรรม"
              color="#FFFFFF"
              fill="#FFFFFF"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              className="mr-[5px] inline"
            >
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
            <span className="cursor-default">{like}</span>
          </p>
        </div>
        <div className="absolute right-0 z-40 p-[5px]">
          {props?.post?.photos.length > 1 ? (
            <svg
              aria-label="โฆษณาแบบภาพสไลด์"
              color="#FFFFFF"
              fill="#FFFFFF"
              height="22"
              role="img"
              viewBox="0 0 48 48"
              width="22"
            >
              <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
            </svg>
          ) : (
            ''
          )}
        </div>
        <Image
          src={`http://localhost:3001/${props?.post?.photos[0]?.file}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* <PostModal open={open} handleClose={handleClose} /> */}
      <PostModal
        postId={props.post.id}
        open={open}
        handleClose={handleClose}
        like={like}
        isLike={isLike}
        toggle={toggle}
        date={date}
      />
    </Grid>
  )
}

export default ImageBox
