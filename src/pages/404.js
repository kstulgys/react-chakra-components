import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Stack, Text } from "@chakra-ui/core";

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <Container py='64'>
      <Text fontSize='6xl'>Coming soon...</Text>
    </Container>
  </Layout>
);

function Container(props) {
  return <Stack maxW='6xl' mx='auto' width='full' p='4' {...props} />;
}

export default NotFoundPage;
