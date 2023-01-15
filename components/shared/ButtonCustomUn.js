import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const BootstrapButton = styled(props => <Button {...props} />)(props => ({
  '&.MuiButtonBase-root': {
    border: '1px solid #DBDBDB',
    boxShadow: 'none',
    color: 'black',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.3,
    '&.Mui-disabled': {
      opacity: 0.3,
    },
  },
}))

const ButtonCustom = props => {
  return <BootstrapButton {...props}>{props.title}</BootstrapButton>
}

export default ButtonCustom
