import LoginPanel from '/components/page/login/LoginPanel'
import Phone from '/components/page/login/Phone'
import Footer from '/components/shared/Footer'
import { Fragment } from 'react'

const Login = () => {
  return (
    <Fragment>
      <div className="my-[32px] flex justify-center">
        <Phone />
        <LoginPanel />
      </div>
      <div className="pt-[20px]">
        <Footer />
      </div>
    </Fragment>
  )
}

export default Login
