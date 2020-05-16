/*@jsx jsx*/
import { jsx } from "@emotion/core";
import React from "react";
import { Link } from "gatsby";
import Layout from "components/layout";
import SEO from "components/seo";
import { Login, CreateAccount } from "components/forms";
import { Stack } from "@chakra-ui/core";

const FormsPage = () => (
  <Layout>
    <SEO title='React - Chakra UI forms' />
    <Stack
      width='full'
      spacing='0'
      height={["full", "100vh"]}
      css={{
        scrollSnapType: "y mandatory",
        "::-webkit-scrollbar": { width: 0 },
        MsOverflowStyle: "none",
        scrollbarWidth: "none",
        minHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      <Login />
      <CreateAccount />
    </Stack>
  </Layout>
);

export default FormsPage;
