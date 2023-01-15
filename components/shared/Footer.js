import { Grid } from '@mui/material'

const PAGE = [
  'Meta',
  'เกี่ยวกับ',
  'บล็อก',
  'งาน',
  'ความช่วยเหลือ',
  'API',
  'ความเป็นส่วนตัว',
  'ข้อกำหนด',
  'บัญชียอดนิยม',
  'แฮชแท็ก',
  'ตำแหน่ง',
  'Instagram Lite',
  'การอัพโหลดผู้ติดต่อและผู้ที่ไม่ได้ใช้บริการ',
]

const TYPE = [
  'การเต้นรำ',
  'อาหารและเครื่องดื่ม',
  'บ้านและสวน',
  'ดนตรี',
  'ทัศนศิลป์',
]

const List = data => {
  return data.map((list, index) => {
    return (
      <Grid item key={index}>
        {list}
      </Grid>
    )
  })
}

const Footer = () => {
  return (
    <div className="mb-[52px] text-center text-[12px] text-[#8e8e8e]">
      <Grid
        className="mb-[6px]"
        columnGap="16px"
        container
        justifyContent="center"
        rowGap="6px"
      >
        {List(PAGE)}
      </Grid>
      <Grid
        className="mb-[16px]"
        columnGap="16px"
        container
        justifyContent="center"
        rowGap="6px"
      >
        {List(TYPE)}
      </Grid>
      © 2022 Instagram from Meta
    </div>
  )
}

export default Footer
