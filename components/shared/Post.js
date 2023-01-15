import PostModal from './PostModal'
import { Avatar, Card, Divider } from '@mui/material'
import axios from 'axios'
import Moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'

const Post = props => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState([])
  const commentRef = useRef()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const goProfile = () => {
    router.push('/profile/' + props.userId)
  }

  const image = () => {
    const render = file => {
      return (
        <Image
          src={`http://localhost:3001/${file}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      )
    }

    const images = props.media.map(item => {
      return {
        originalClass: 'h-[530px] w-[470px] cursor-default',
        bulletClass: 'padding-none w-2 h-2 pointer-events-none',
        bulletOnClick: () => {
          console.log('test')
        },
        renderItem: () => {
          return render(item.file)
        },
      }
    })

    return (
      <ImageGallery
        items={images}
        showBullets
        showFullscreenButton={false}
        showPlayButton={false}
      />
    )
  }

  const date = () => {
    const create = Moment(props.create)
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

  const [isLike, setIsLike] = useState(props.isLike)
  const [like, setLike] = useState(props.like)

  const toggle = e => {
    axios.post('/post/like-post', { postId: props.postId }).then(() => {
      if (e) {
        setLike(prev => prev + 1)
      } else {
        setLike(prev => prev - 1)
      }
      setIsLike(e)
    })
  }

  const toggleFav = () => {
    if (isLike) {
      return (
        <svg
          aria-label="เลิกถูกใจ"
          color="#ed4956"
          fill="#ed4956"
          height="24"
          role="img"
          viewBox="0 0 48 48"
          width="24"
          onClick={() => toggle(false)}
          className="cursor-pointer"
        >
          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
      )
    } else {
      return (
        <svg
          aria-label="ถูกใจ"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          onClick={() => toggle(true)}
          className="cursor-pointer"
        >
          <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
        </svg>
      )
    }
  }

  const comment = () => {
    if (!commentRef.current.value) {
      return
    }
    axios
      .post('/post/comment', {
        postId: props.postId,
        comment: commentRef.current.value,
      })
      .then(() => {
        setComments(prev => [
          ...prev,
          { userName: props.meName, caption: commentRef.current.value },
        ])
        commentRef.current.value = ''
      })
      .catch(() => {
        alert('Comment fail')
      })
  }

  const lastComment = () => {
    return comments.map((comment, index) => {
      return (
        <div className="mt-[4px] px-[12px] font-[600]" key={index}>
          {comment.userName}{' '}
          <span className="font-[400]">{comment.caption}</span>
        </div>
      )
    })
  }

  return (
    <div>
      <Card variant="outlined" className="mb-[12px] rounded-[8px]">
        <div className="mx-[12px] my-[8px] flex items-center">
          <Avatar
            alt="profile"
            src={props.userImg ? `http://localhost:3001/${props.userImg}` : ''}
            className="h-[32px] w-[32px]"
          />
          <a
            className="ml-[10px] grow cursor-pointer font-[600]"
            onClick={goProfile}
          >
            {props.userName}
          </a>
          <div className="p-[8px]">
            <svg
              color="#262626"
              fill="#262626"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </div>
        </div>
        <div className="relative h-[530px] w-[470px]">{image()}</div>
        <div className="flex px-[12px] py-[10px]">
          <div className="flex flex-1 gap-[16px]">
            {toggleFav()}
            <svg
              aria-label="ความคิดเห็น"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              onClick={handleOpen}
              className="cursor-pointer"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            {/* <svg
              aria-label="แชร์โพสต์"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg> */}
          </div>
          {/* <svg
            aria-label="บันทึก"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg> */}
        </div>
        {like ? (
          <div className="px-[12px] font-[600]">ถูกใจ {like} คน</div>
        ) : (
          ''
        )}
        <div className="mt-[4px] px-[12px] font-[600]">
          <span className="cursor-pointer" onClick={goProfile}>
            {props.userName}
          </span>{' '}
          <span className="font-[400]">{props.caption}</span>
        </div>
        {lastComment()}
        {props.countComment ? (
          <div className="mt-[4px]">
            <div
              className="inline cursor-pointer px-[12px] font-[400] text-[#8e8e8e]"
              onClick={handleOpen}
            >
              ดูความคิดเห็นทั้ง {props.countComment} รายการ
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="mb-[12px] mt-[12px] px-[12px] text-[12px] font-[400] text-[#8e8e8e]">
          {date()}
        </div>
        <Divider />
        <div className="py-[4px] pl-[12px]">
          <div className="my-[8px] mr-[12px] flex">
            <svg
              aria-label="อีโมจิ"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
            </svg>
            <input
              ref={commentRef}
              placeholder="เพิ่มความคิดเห็น"
              className="ml-[10px] w-full text-[14px] focus:outline-none"
            />
            <div
              className="ml-[8px] cursor-pointer text-[14px] font-[600] text-[#0095f6]"
              onClick={comment}
            >
              โพสต์
            </div>
          </div>
        </div>
      </Card>
      <PostModal
        postId={props.postId}
        open={open}
        handleClose={handleClose}
        like={like}
        isLike={isLike}
        toggle={toggle}
        date={date}
      />
    </div>
  )
}

export default Post
