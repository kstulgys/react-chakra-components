import React from 'react'
import { Link as GLink } from 'gatsby'
import Layout from 'components/layout'
import SEO from 'components/seo'
import { Flex, Text, Box, Stack, Link as CLink, Button, Grid } from '@chakra-ui/core'

const IndexPage = () => (
  <Layout>
    <SEO title="UI Components Built With React And Chakra-UI" />
    <Nav />
    <Header />
    <GridItemList />
  </Layout>
)

export default IndexPage

const itemList = [
  {
    id: 1,
    to: '/form',
    name: 'Form',
  },
  {
    id: 2,
    to: '/navigation',
    name: 'Navigation',
  },
  {
    id: 3,
    to: '/hero',
    name: 'Hero',
  },
  {
    id: 4,
    to: '/footer',
    name: 'Footer',
  },
  {
    id: 5,
    to: '/banner',
    name: 'Banner',
  },
  {
    id: 6,
    to: '/search',
    name: 'Search',
  },
  {
    id: 7,
    to: '/grid',
    name: 'Grid',
  },
  {
    id: 8,
    to: '/list',
    name: 'List',
  },
  {
    id: 9,
    to: '/other',
    name: 'other',
  },
]

export const Nav = () => {
  return (
    <Stack bg="gray.900">
      <Container>
        <Box>
          <CLink fontSize="2xl" fontWeight="medium" color="white" isExternal href="https://www.linkedin.com/in/kstulgys/">
            About
          </CLink>
        </Box>
      </Container>
    </Stack>
  )
}

export const GridItemList = () => {
  return (
    <Container>
      <Grid gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gridGap="10">
        {itemList.map(({ id, to, name }) => (
          <Link to={to} key={id}>
            {name}
          </Link>
        ))}
      </Grid>
    </Container>
  )
}

function Link({ children, to, ...rest }: any) {
  return (
    <Box width="full" {...rest}>
      <CLink
        as={GLink}
        to={to}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Button
          variant="link"
          py="4"
          fontSize="2xl"
          width="full"
          display="flex"
          border="1px solid"
          borderColor="gray.900"
          borderWidth="2px"
          mx="auto"
          color="gray.900"
          _hover={{
            textDecoration: 'none',
            bg: 'gray.900',
            color: 'white',
            borderColor: 'gray.900',
          }}
        >
          {children}
        </Button>
      </CLink>
    </Box>
  )
}

function Header(props: any) {
  return (
    <Container {...props} py="24">
      <Stack mx="auto">
        <Text fontFamily="inherit" fontSize="4xl" textAlign="center" fontWeight="semibold">
          UI components built for happy clients
        </Text>
        <Stack
          flexDir={['column', 'row']}
          width="full"
          isInline
          fontFamily="inherit"
          fontSize="4xl"
          textAlign="center"
          fontWeight="semibold"
          justifyContent="center"
        >
          <CLink textDecor="underline" isExternal href="https://reactjs.org/">
            React
          </CLink>
          <Box mx="2">+</Box>
          <CLink textDecor="underline" isExternal href="https://chakra-ui.com/">
            Chakra-UI{' '}
          </CLink>
          <span role="img" aria-label="heart emoji">
            = 💖
          </span>
        </Stack>

        <Box mx="auto" mt="10">
          <Text fontFamily="inherit" fontSize="lg" textAlign="center">
            Do you have any inquiries?{' '}
            <CLink textDecor="underline" isExternal href="mailto:karolis.stulgys@gmail.com?subject=Hi Karolis&body=Hi Karolis,">
              Get in touch.
            </CLink>
          </Text>
        </Box>
        {/* <Box mx='auto'>
          <Text fontFamily='inherit'>
            All code available at{" "}
            <CLink
              textDecor='underline'
              isExternal
              href='https://codesandbox.io/s/laughing-taussig-g9ulm'
            >
              CodeSandbox
            </CLink>
          </Text>
        </Box> */}
      </Stack>
    </Container>
  )
}

function Container(props: any) {
  return <Stack maxW="6xl" mx="auto" width="full" p="4" {...props} />
}
