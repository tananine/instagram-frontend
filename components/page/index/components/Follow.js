import { Avatar } from '@mui/material'

const Follow = () => {
  return (
    <div className="flex items-center py-[6px]">
      <Avatar src="" className="h-[32px] w-[32px]" alt="profile" />
      <div className="ml-[12px] flex w-full items-center justify-between">
        <div className="leading-[1.2]">
          <div className="font-[600]">name</div>
          <div className="text-[14px] text-[#8e8e8e]">description</div>
        </div>
        <div className="text-[14px] font-[600] text-[#0095f6]">ติดตาม</div>
      </div>
    </div>
  )
}

export default Follow
