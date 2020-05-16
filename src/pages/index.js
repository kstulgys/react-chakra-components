import React from "react";
import { Link as GLink } from "gatsby";
import Layout from "components/layout";
import Image from "components/image";
import SEO from "components/seo";
import { Flex, Text, Box, Stack, Link as CLink, Button, Grid } from "@chakra-ui/core";
import { getFunName } from "utils/getFunName";
import { Login } from "components/forms";

// const formOne = getFunName();
// const formTwo = getFunName();

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <Header />
    <GridItemList />
    {/* <Container>
      <Stack p='6' width='64' width='full'>
        <Stack isInline spacing='10' width='full'>
          <Link to='/forms'>Forms</Link>
          <Link to='/navigations'>Navigations</Link>
          <Link to='/heros'>Heros</Link>
          <Link to='/Footers'>Footers</Link>
          <Link to='/banners'>Banners</Link>
          <Link to='/search'>Search</Link>
        </Stack>
      </Stack>
    </Container> */}
  </Layout>
);

export default IndexPage;

const itemList = [
  {
    id: 1,
    to: "/form",
    name: "Form",
  },
  {
    id: 2,
    to: "/navigation",
    name: "Navigation",
  },
  {
    id: 3,
    to: "/hero",
    name: "Hero",
  },
  {
    id: 4,
    to: "/footer",
    name: "Footer",
  },
  {
    id: 5,
    to: "/banner",
    name: "Banner",
  },
  {
    id: 6,
    to: "/search",
    name: "Search",
  },
  {
    id: 7,
    to: "/other",
    name: "other",
  },
];

export const GridItemList = () => {
  return (
    <Container>
      <Grid gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))' gridGap='10'>
        {itemList.map(({ id, to, name }) => (
          <Link to={to} key={id}>
            {name}
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

function Link({ children, to, ...rest }) {
  return (
    <Box width='full' {...rest}>
      <CLink
        as={GLink}
        to={to}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Button
          variant='link'
          py='4'
          fontSize='2xl'
          width='full'
          display='flex'
          border='1px solid'
          borderColor='gray.900'
          borderWidth='2px'
          mx='auto'
          color='gray.900'
          _hover={{
            textDecoration: "none",
            bg: "gray.900",
            color: "gray.100",
            borderColor: "gray.900",
          }}
        >
          {children}
        </Button>
      </CLink>
    </Box>
  );
}

function Header(props) {
  return (
    <Container {...props} py='24'>
      <Stack mx='auto'>
        <Text fontFamily='inherit' fontSize='4xl' textAlign='center' fontWeight='semibold'>
          UI components built for happy clients
        </Text>
        <Stack
          flexDir={["column", "row"]}
          width='full'
          isInline
          fontFamily='inherit'
          fontSize='4xl'
          textAlign='center'
          fontWeight='semibold'
          justifyContent='center'
        >
          <CLink textDecor='underline' isExternal href='https://reactjs.org/'>
            React
          </CLink>
          <Box mx='2'>+</Box>
          <CLink textDecor='underline' isExternal href='https://chakra-ui.com/'>
            Chakra-UI
          </CLink>
          <Box mx='2'>= 💖</Box>
        </Stack>

        <Box mx='auto' mt='10'>
          <Text fontFamily='inherit' fontSize='lg' textAlign='center'>
            Do you have any inquiries?{" "}
            <CLink
              textDecor='underline'
              isExternal
              href='mailto:karolis.stulgys@gmail.com?subject=Hi Karolis&body=Hi Karolis,'
            >
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
  );
}

function Container(props) {
  return <Stack maxW='6xl' mx='auto' width='full' p='4' {...props} />;
}
