import Comment from './Comment'

const CommentProvide = props => {
  return (
    <div>
      <Comment comment={props.comment} />
      <div className="ml-[54px] mb-[16px]">
        {/* ——
        <span className="ml-[10px] cursor-pointer text-[12px] font-[600] text-[#8e8e8e]">
          ดูข้อความตอบกลับ (1 รายการ)
        </span> */}
        {/* <div className="mb-[22px]">
          <Comment />
        </div> */}
      </div>
    </div>
  )
}

export default CommentProvide
