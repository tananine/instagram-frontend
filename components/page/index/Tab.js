import Follow from './components/Follow'
import MyProfile from './components/MyProfile'

const Tab = () => {
  return (
    <div>
      <MyProfile />
      <div className="flex items-center justify-between pt-[4px] font-[600] text-[#8e8e8e]">
        แนะนำสำหรับคุณ
        {/* <span className="text-[14px] text-[#262626]">ดูทั้งหมด</span> */}
      </div>
      <div className="mt-[8px]">
        <Follow />
        <Follow />
        <Follow />
        <Follow />
        <Follow />
      </div>
    </div>
  )
}

export default Tab
