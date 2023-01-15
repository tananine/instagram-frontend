import { Box } from '@mui/material'
import Head from 'next/head'
import { Fragment } from 'react'

const BasePage = props => {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Box className="mx-auto mt-[60px] max-w-[820px]">{props.children}</Box>
    </Fragment>
  )
}

export default BasePage
