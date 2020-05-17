/*@jsx jsx*/
import { jsx } from '@emotion/core'
import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/layout'
import SEO from 'components/seo'
import { Stack } from '@chakra-ui/core'
import { NavBar } from 'components/navigations'

const NavigationPage = () => (
  <Layout>
    <SEO title="React - Chakra UI forms" />
    <Stack
      width="full"
      spacing="0"
      height={['full', '100vh']}
      css={{
        scrollSnapType: 'y mandatory',
        '::-webkit-scrollbar': { width: 0 },
        MsOverflowStyle: 'none',
        scrollbarWidth: 'none',
        minHeight: '100vh',
        overflowY: 'scroll',
      }}
    >
      <NavBar />
    </Stack>
  </Layout>
)

export default NavigationPage
