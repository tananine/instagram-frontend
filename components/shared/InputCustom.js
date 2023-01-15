import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const RedditTextField = styled(props => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(() => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    fontSize: 14,
    borderRadius: 3,
    backgroundColor: '#fafafa',
    '&:hover': {
      backgroundColor: '#fafafa',
    },
    '&.Mui-focused': {
      backgroundColor: '#fafafa',
      borderColor: '#a8a8a8',
    },
  },
  '& label.Mui-focused': {
    color: '#8E8E8E',
  },
  '& label': {
    color: '#8E8E8E',
    fontSize: 12,
  },
  '& input': {
    paddingTop: 12,
  },
}))

const InputCustom = props => {
  return <RedditTextField size="small" {...props} />
}

export default InputCustom
