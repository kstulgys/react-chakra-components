/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react'
import { Box, Stack, PseudoBox, Input, InputGroup, InputRightElement, Link, Button, Text, Flex, Image, Icon } from '@chakra-ui/core'
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { ComponentWrapper, Container } from 'lib/components'

export const NavBar = () => {
  return (
    <ComponentWrapper position="absolute">
      <PageImage />
      <Nav boxShadow="2xl" position="fixed" width="full">
        <Navigation bg="white">
          <NavContainer>
            <NavLogo>
              <Image src="https://picsum.photos/200/100" height="100px" width="200px" borderRadius="lg" />
            </NavLogo>
            <NavLinkList>
              <NavLink>Resources</NavLink>
              <NavLink>News</NavLink>
              <NavLink>Other</NavLink>
            </NavLinkList>
          </NavContainer>
        </Navigation>
        <NavLinkContent>
          <Box fontSize="xl" color="white">
            Resources content
          </Box>
          <Box fontSize="xl" color="white">
            News content
          </Box>
          <Box fontSize="xl" color="white">
            Other content
          </Box>
        </NavLinkContent>
      </Nav>
    </ComponentWrapper>
  )
}

interface NavState {
  activeIndex: number | undefined
  setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

const NavContext = React.createContext<Partial<NavState>>({})
const useNav = () => {
  const ctx = React.useContext(NavContext)
  return ctx
}

function Nav({ ...props }: any) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)
  return (
    <NavContext.Provider value={{ activeIndex, setActiveIndex }}>
      <Stack spacing="0" {...props} />
    </NavContext.Provider>
  )
}

interface NavLinkListState {
  index: number | undefined
}

const NavLinkListContext = React.createContext<Partial<NavLinkListState>>({})
const useNavLinkList = () => {
  const ctx = React.useContext(NavLinkListContext)
  return ctx
}

function NavLinkList({ children, ...props }: any) {
  if (!children) {
    return null
  }

  if (Array.isArray(children)) {
    return (
      <Stack isInline spacing="10" position="relative" {...props}>
        {children.map((child: any, index: any) => {
          return (
            <Box height="full" key={index} {...props}>
              <NavLinkListContext.Provider value={{ index }}>{child}</NavLinkListContext.Provider>
            </Box>
          )
        })}
      </Stack>
    )
  }

  return (
    <Stack height="full" isInline spacing="10" position="relative" {...props}>
      <Box height="full" key={0} {...props}>
        <NavLinkListContext.Provider value={{ index: 0 }}>{children}</NavLinkListContext.Provider>
      </Box>
    </Stack>
  )
}

function NavLink({ children, ...props }: any) {
  const { setActiveIndex, activeIndex } = useNav()
  const { index } = useNavLinkList()
  const isActive = index === activeIndex
  const handleSetIndex = () => {
    if (!setActiveIndex) return
    if (isActive) return setActiveIndex(undefined)
    setActiveIndex(index)
  }

  return (
    <Button
      display="flex"
      alignItems="center"
      height="12"
      zIndex={10}
      onClick={handleSetIndex}
      variant="unstyled"
      rounded="none"
      fontSize="2xl"
      fontWeight="semibold"
      borderBottom="4px solid"
      borderColor={isActive ? 'blue.500' : 'white'}
      _focus={{
        boxShadow: 'none',
      }}
      _hover={{
        borderColor: 'blue.500',
      }}
    >
      {children}
      <Box ml="1">
        <Icon size="6" name={isActive ? 'chevron-up' : 'chevron-down'} />
      </Box>
    </Button>
  )
}

function Navigation(props: any) {
  return <Stack px="20" py="6" width="full" spacing="0" position="relative" {...props} />
}

function NavLogo(props: any) {
  return <Stack {...props} />
}

function NavContainer(props: any) {
  return <Stack isInline spacing="10" alignItems="center" {...props} />
}

function NavLinkContent({ children, ...props }: any) {
  const { activeIndex } = useNav()
  const ref = React.useRef()

  if (activeIndex === undefined) {
    return null
  }
  return (
    <Stack ref={ref} px="20" bg="blue.500" py="4" width="full" isInline spacing="10" {...props}>
      {children[activeIndex]}
    </Stack>
  )
}

function PageImage(props: any) {
  return (
    <Stack
      backgroundImage='url("https://picsum.photos/1600/1200")' /* The image used */
      backgroundPosition="center" /* Center the image */
      backgroundRepeat="no-repeat" /* Do not repeat the image */
      backgroundSize="cover"
      height="full"
    />
  )
}

// function useOnClickOutside(ref: any, handler: any) {
//   React.useEffect(
//     () => {
//       const listener = (event: any) => {
//         // Do nothing if clicking ref's element or descendent elements
//         if (!ref.current || ref.current.contains(event.target)) {
//           return
//         }

//         handler(event)
//       }

//       document.addEventListener('mousedown', listener)
//       document.addEventListener('touchstart', listener)

//       return () => {
//         document.removeEventListener('mousedown', listener)
//         document.removeEventListener('touchstart', listener)
//       }
//     },
//     // Add ref and handler to effect dependencies
//     // It's worth noting that because passed in handler is a new ...
//     // ... function on every render that will cause this effect ...
//     // ... callback/cleanup to run every render. It's not a big deal ...
//     // ... but to optimize you can wrap handler in useCallback before ...
//     // ... passing it into this hook.
//     [ref, handler]
//   )
// }

// return (
//   <ComponentWrapper position="absolute">
//     <Box bg="white" py="5" boxShadow="2xl" height="40">
//       <Container maxW="1500px" isInline alignItems="center" height="full">
//         <Link href="/" width="56" color="darkPurple">
//           <Box>
//             <Text lineHeight="none" fontSize="4xl" fontWeight="semibold">
//               Your
//             </Text>
//           </Box>
//           <Box mt="1">
//             <Text lineHeight="none" fontSize="4xl" fontWeight="semibold">
//               Business
//             </Text>
//           </Box>
//         </Link>
//         <Stack isInline spacing={3} shouldWrapChildren>
//           <NavLink name="Resources" handleSelect={handleCurentTab} currentTab={currentTab} isDropdown isCurrentPage={true} />
//           <NavLink name="News" handleSelect={handleCurentTab} currentTab={currentTab} isDropdown isCurrentPage={false} />
//           <NavLink name="Directory" handleSelect={() => window && window.alert('Route to Directory page')} />
//           <NavLink name="About" handleSelect={() => window && window.alert('Route to About page')} />
//         </Stack>
//         <Stack ml="auto" isInline spacing={10} alignItems="center" shouldWrapChildren>
//           <LoginOrRegister />
//           <SearchInput />
//         </Stack>
//       </Container>
//     </Box>
//     {currentTab === 'Resources' && <TabContent spacing="64" itemList={ResourceItemList} />}
//     {currentTab === 'News' && <TabContent spacing="32" itemList={NewItemList} />}
//     <PageImage />
//   </ComponentWrapper>
// )

// const TabContent = ({ spacing, itemList, ...rest }: any) => {
//   return (
//     <Stack bg="darkBlue" isInline position="absolute" top="0" mt="40" width="full" boxShadow="2xl" {...rest}>
//       <Container py="8" pl="56" isInline>
//         <Stack ml="10" isInline width="full" spacing={spacing}>
//           {itemList.map((item: any) => (
//             <TabItem key={item.id} {...item} />
//           ))}
//         </Stack>
//       </Container>
//     </Stack>
//   )
// }

// const TabItem = ({ title, text, href, as, ...rest }: any) => {
//   return (
//     <Stack spacing="5" {...rest}>
//       <Link href={href} as={as}>
//         <Text color="white" fontSize="xl" fontWeight="medium">
//           {title}
//         </Text>
//       </Link>
//       <Box width="290px">
//         <Text color="white" fontWeight="light">
//           {text}
//         </Text>
//       </Box>
//     </Stack>
//   )
// }

// const LoginOrRegister = () => {
//   const getLinkProps = (name: string) => {
//     // const href = `/${name}`
//     return {
//       // href,
//       fontSize: '2xl',
//       color: 'darkBlue',
//       fontWeight: 'normal',
//     }
//   }

//   return (
//     <Stack isInline spacing={3} alignItems="center">
//       <Box>
//         <Link
//           _hover={{
//             color: 'darkBlue',
//           }}
//           {...getLinkProps('login')}
//         >
//           Login
//         </Link>
//       </Box>
//       <Box>
//         <Text fontSize="2xl" color="lightPurple">
//           |
//         </Text>
//       </Box>
//       <Box>
//         <Link
//           _hover={{
//             color: 'darkBlue',
//           }}
//           {...getLinkProps('register')}
//         >
//           Register
//         </Link>
//       </Box>
//     </Stack>
//   )
// }

// const SearchInput = () => {
//   return (
//     <InputGroup size="lg" width="64">
//       <Input
//         placeholder="Search..."
//         _placeholder={{ fontWeight: 'light', color: 'gray.600' }}
//         bg="gray.100"
//         rounded="full"
//         border="none"
//         _focus={{ boxShadow: 'outline' }}
//       />
//       <InputRightElement>
//         <Button
//           width="12"
//           height="12"
//           bg="baseBlue"
//           rounded="full"
//           _hover={{
//             bg: 'baseBlue',
//           }}
//         >
//           <Box mx="auto">
//             <Box as={FiSearch} color="white" size="6" />
//           </Box>
//         </Button>
//       </InputRightElement>
//     </InputGroup>
//   )
// }

// const NavLink = ({ name, handleSelect, currentTab, isDropdown, isCurrentPage, ...rest }: any) => {
//   const isActive = currentTab === name
//   const getColor = () => {
//     if (isActive) return { color: 'white' }
//     if (isCurrentPage && !isActive) return { color: 'darkBlue' }
//     return { color: 'basePurple' }
//   }

//   return (
//     <PseudoBox position="relative" role="group" width="full">
//       <Button onClick={() => handleSelect(name)} height="16" variant="unstyled" rounded="none" zIndex={10} _focus={{ boxShadow: 'none' }} {...rest}>
//         <Stack isInline alignItems="center" px="4">
//           <Box>
//             <PseudoBox
//               as="p"
//               {...getColor()}
//               fontSize="3xl"
//               fontWeight="medium"
//               _groupHover={{
//                 color: isActive ? 'white' : 'darkBlue',
//               }}
//             >
//               {name}
//             </PseudoBox>
//           </Box>
//           {isDropdown && (
//             <Box mt="3">
//               <PseudoBox
//                 as={!isActive ? FiChevronDown : FiChevronUp}
//                 size="6"
//                 {...getColor()}
//                 _groupHover={{
//                   color: isActive ? 'white' : 'darkBlue',
//                 }}
//               />
//             </Box>
//           )}
//         </Stack>
//       </Button>
//       {isDropdown && isActive && (
//         <Box borderTopRightRadius="20px" borderTopLeftRadius="20px" height="112px" bg="darkBlue" width="full" position="absolute" top="0" />
//       )}
//     </PseudoBox>
//   )
// }

// const ResourceItemList = [
//   {
//     id: 1,
//     // href: '/resources/[slug]?slug=support-for-yourself',
//     // as: '/resources/support-for-yourself',
//     title: 'Support for yourself',
//     text: 'Structuring your work for success, and solutions for business stress.',
//   },
//   {
//     id: 2,
//     // href: '/resources/[slug]?slug=supporting-someone-else',
//     // as: '/resources/supporting-someone-else',
//     title: 'Supporting someone else',
//     text: 'Health and wellbeing at home, with practical tips for every day.',
//   },
// ]

// const NewItemList = [
//   {
//     id: 1,
//     title: 'News',
//     // href: '/new/[slug]?slug=news',
//     // as: '/new/news',
//     text: 'Small business news from a range of reputable publications.',
//   },
//   {
//     id: 2,
//     // href: '/new/[slug]?slug=blogs',
//     // as: '/new/blogs',
//     title: 'Blogs',
//     text: 'Contributions from the Ahead for Business community.',
//   },
//   {
//     id: 3,
//     // href: '/',
//     // as: '/',
//     title: 'Events',
//     text: 'Webinars, networking opportunities, and important dates.',
//   },
// ]
