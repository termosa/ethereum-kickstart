import React from 'react'
import Head from 'next/head'
import Header from './Header'
import { Container } from 'semantic-ui-react'
import { Link } from '../routes'

const Layout = ({ children, title, back }) => (
  <Container>
    <Head>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
    </Head>

    <Header />

    <main>
      { back && <Link route={back}>
          <a>&lt; Back</a>
        </Link> }
      { title && <h1>{ title }</h1> }
      { children }
    </main>
  </Container>
)

export default Layout
