import ImageBox from './components/ImageBox'
import { Grid } from '@mui/material'

const PostGallery = props => {
  return (
    <Grid container spacing={3} className="mt-0">
      {props?.post?.map((item, index) => {
        return <ImageBox post={item} key={index} />
      })}
    </Grid>
  )
}

export default PostGallery
