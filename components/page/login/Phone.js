import phone from '/public/phone.png'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

const Phone = () => {
  const Phone = styled(Box)({
    backgroundImage: `url(${phone.src})`,
    backgroundPosition: '-46px 0',
    backgroundSize: '468.32px 634.15px',
    flexBasis: '380.32px',
    marginRight: '32px',
    height: '581.15px',
  })

  return <Phone className="hidden w875:block"></Phone>
}

export default Phone
