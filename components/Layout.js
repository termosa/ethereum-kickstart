import React from 'react'
import Head from 'next/head'
import Header from './Header'
import { Container } from 'semantic-ui-react'

const Layout = ({ children, title }) => (
  <Container>
    <Head>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
    </Head>

    <Header />

    <main>
      { title && <h1>{ title }</h1> }
      { children }
    </main>
  </Container>
)

export default Layout
