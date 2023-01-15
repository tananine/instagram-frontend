import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const BootstrapButton = styled(props => <Button {...props} />)(props => ({
  '&.MuiButtonBase-root': {
    backgroundColor: props.color ?? '#0095F6',
    boxShadow: 'none',
    color: 'white',
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
