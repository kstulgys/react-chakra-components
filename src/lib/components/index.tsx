/*@jsx jsx*/
import { jsx } from '@emotion/core'
import React from 'react'
import { Stack, Input, Checkbox as BaseCheckbox, InputGroup, InputRightElement, Icon, Box, Flex, Text, Button } from '@chakra-ui/core'

export const ComponentWrapper = (props: any) => {
  return (
    <Stack
      spacing="0"
      minH="100vh"
      width="full"
      height={['full', '100vh']}
      css={{
        scrollSnapAlign: 'start',
      }}
      {...props}
    />
  )
}

export function Container(props: any) {
  return <Stack maxW="6xl" mx="auto" width="full" p={[2, 4]} {...props} />
}
