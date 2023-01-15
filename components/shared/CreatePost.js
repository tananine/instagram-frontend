import ButtonCustom from '/components/shared/ButtonCustom'
import { postActions } from '/store/post'
import { Avatar, Divider, Modal } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import { useDispatch } from 'react-redux'

const CreatePost = () => {
  const dispatch = useDispatch()

  const [image, setImage] = useState([])
  const caption = useRef()

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setImage([])
    setOpen(false)
  }

  const setImageHandler = event => {
    setImage(event.target.files)
  }

  const inputImage = () => {
    const render = file => {
      const fileTmp = URL.createObjectURL(file)
      return <img src={fileTmp} />
    }
    const arrImage = []
    for (let i in image) {
      if (i >= 0) {
        arrImage.push({
          originalClass: 'h-[530px] w-[470px] cursor-default',
          bulletClass: 'padding-none w-2 h-2 pointer-events-none',
          bulletOnClick: () => {
            console.log('test')
          },
          renderItem: () => {
            return render(image[i])
          },
        })
      }
    }

    return (
      <ImageGallery
        items={arrImage}
        showBullets
        showFullscreenButton={false}
        showPlayButton={false}
      />
    )
  }

  const showImage = () => {
    if (image.length > 0) {
      return (
        <div className="flex">
          {inputImage()}
          <div className="w-[300px] p-[10px]">
            <div className="mb-[10px] flex gap-[10px] font-[600]">
              <Avatar alt="profile" src="" className="h-[32px] w-[32px]" />
              name
            </div>
            <textarea
              ref={caption}
              placeholder="เขียนคำบรรยาย..."
              className="h-1/2 w-full resize-none focus:outline-none"
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="top-1/2 mx-auto flex h-[400px] w-[400px] grow flex-col items-center justify-center text-center">
          <svg
            aria-label="ไอคอนที่ใช้แทนสื่อ เช่น รูปภาพและวิดีโอ"
            color="#262626"
            fill="#262626"
            height="77"
            role="img"
            viewBox="0 0 97.6 77.3"
            width="96"
          >
            <path
              d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
              fill="currentColor"
            ></path>
            <path
              d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
              fill="currentColor"
            ></path>
            <path
              d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
              fill="currentColor"
            ></path>
          </svg>
          {/* <div>ลากรูปภาพและวิดีโอมาที่นี่</div> */}
          <input
            type="file"
            className="hidden"
            id="input-image"
            onInput={e => setImageHandler(e)}
            accept="image/png, image/jpeg"
            multiple
          />
          <label htmlFor="input-image">
            <ButtonCustom
              title="เลือกจากคอมพิวเตอร์"
              className="pointer-events-none mt-[8px] mb-[16px]"
            />
          </label>
        </div>
      )
    }
  }

  const onPost = () => {
    const fromData = new FormData()
    for (let i in image) {
      fromData.append(`file[${i}]`, image[i])
    }
    fromData.append('caption', caption.current.value)
    axios.post('/post/create', fromData).then(() => {
      dispatch(postActions.create())
      handleClose()
    })
  }

  return (
    <div>
      <svg
        aria-label="โพสต์ใหม่"
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        className="cursor-pointer"
        onClick={handleOpen}
      >
        <path
          d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="6.545"
          x2="17.455"
          y1="12.001"
          y2="12.001"
        ></line>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="12.003"
          x2="12.003"
          y1="6.545"
          y2="17.455"
        ></line>
      </svg>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="relative top-[50%] m-auto flex h-fit w-fit translate-y-[-50%] flex-col rounded-[10px] bg-white outline-none">
          <div className="w-full p-[8px] text-center">สร้างโพสต์ใหม่</div>
          {image.length > 0 ? (
            <div
              className="absolute top-[8px] right-[10px] cursor-pointer font-bold text-[#0095f6]"
              onClick={onPost}
            >
              โพสต์
            </div>
          ) : (
            ''
          )}
          <Divider />
          {showImage()}
        </div>
      </Modal>
    </div>
  )
}

export default CreatePost
