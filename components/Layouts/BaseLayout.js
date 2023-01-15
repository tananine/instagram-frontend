import Header from '/components/shared/Header'
import { userActions } from '/store/user'
import axios from 'axios'
import { deleteCookie, getCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const BaseLayout = props => {
  const dispatch = useDispatch()

  const router = useRouter()
  const token = getCookies('token')

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.token
  useEffect(() => {
    if (!token.token) {
      router.push('/login')
    } else {
      axios
        .get('/profile/get-nav-profile')
        .then(res => {
          dispatch(userActions.user(res.data.user))
        })
        .catch(() => {
          deleteCookie('token')
          router.push('/login')
        })
    }
  }, [])

  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  )
}

export default BaseLayout
