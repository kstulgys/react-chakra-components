/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import {
  Box,
  Stack,
  PseudoBox,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Button,
  Text,
} from "@chakra-ui/core";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/dist/client/router";

export const Navigation = () => {
  const [currentTab, setCurrentTab] = React.useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const handleCurentTab = (name) => {
    if (name === currentTab) return setCurrentTab(null);
    setCurrentTab(name);
  };

  const isResourcePage = slug === "support-for-yourself" || slug === "supporting-someone-else";
  const isNewPage = slug === "news" || slug === "blogs" || slug === "events";

  return (
    <>
      <Box bg='white' py='5' height='full'>
        <Container isInline alignItems='center' height='full'>
          <Link href='/' width='56' color='darkPurple'>
            <Box>
              <Text lineHeight='none' fontSize='4xl' fontWeight='semibold'>
                Ahead for
              </Text>
            </Box>
            <Box mt='1'>
              <Text lineHeight='none' fontSize='4xl' fontWeight='semibold'>
                Business
              </Text>
            </Box>
          </Link>
          <Stack isInline spacing={3} shouldWrapChildren>
            <NavLink
              name='Resources'
              handleSelect={handleCurentTab}
              currentTab={currentTab}
              isDropdown
              isCurrentPage={isResourcePage}
            />
            <NavLink
              name='New'
              handleSelect={handleCurentTab}
              currentTab={currentTab}
              isDropdown
              isCurrentPage={isNewPage}
            />
            <NavLink
              name='Directory'
              handleSelect={() => window.alert("Route to Directory page")}
            />
            <NavLink name='About' handleSelect={() => window.alert("Route to About page")} />
          </Stack>
          <Stack ml='auto' isInline spacing={10} alignItems='center' shouldWrapChildren>
            <LoginOrRegister />
            <SearchInput />
          </Stack>
        </Container>
      </Box>
      {currentTab === "Resources" && <TabContent spacing='64' itemList={ResourceItemList} />}
      {currentTab === "New" && <TabContent spacing='32' itemList={NewItemList} />}
    </>
  );
};

const TabContent = ({ spacing, itemList, ...rest }) => {
  return (
    <Stack
      bg='darkBlue'
      isInline
      position='absolute'
      top='0'
      mt='56'
      width='full'
      boxShadow='2xl'
      {...rest}
    >
      <Container py='8' pl='56' isInline>
        <Stack ml='10' isInline width='full' spacing={spacing}>
          {itemList.map((item) => (
            <TabItem key={item.id} {...item} />
          ))}
        </Stack>
      </Container>
    </Stack>
  );
};

const TabItem = ({ title, text, href, as, ...rest }) => {
  return (
    <Stack spacing='5' {...rest}>
      <Link href={href} as={as}>
        <Text color='white' fontSize='xl' fontWeight='medium'>
          {title}
        </Text>
      </Link>
      <Box width='290px'>
        <Text color='white' fontWeight='light'>
          {text}
        </Text>
      </Box>
    </Stack>
  );
};

const LoginOrRegister = () => {
  const { route } = useRouter();

  const getLinkProps = (name) => {
    const href = `/${name}`;
    return {
      href,
      fontSize: "2xl",
      color: route === href ? "darkBlue" : "lightPurple",
      fontWeight: route === href ? "semibold" : "normal",
    };
  };

  return (
    <Stack isInline spacing={3} alignItems='center'>
      <Box>
        <Link
          _hover={{
            color: "darkBlue",
          }}
          {...getLinkProps("login")}
        >
          Login
        </Link>
      </Box>
      <Box>
        <Text fontSize='2xl' color='lightPurple'>
          |
        </Text>
      </Box>
      <Box>
        <Link
          _hover={{
            color: "darkBlue",
          }}
          {...getLinkProps("register")}
        >
          Register
        </Link>
      </Box>
    </Stack>
  );
};

const SearchInput = () => {
  return (
    <InputGroup size='lg' width='64'>
      <Input
        placeholder='Search...'
        _placeholder={{ fontWeight: "light" }}
        bg='gray.100'
        rounded='full'
        border='none'
        _focus={{ boxShadow: "outline" }}
      />
      <InputRightElement>
        <Button type='secondary' width='12' height='12'>
          <Box mx='auto'>
            <Box as={FiSearch} color='white' size='6' />
          </Box>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const NavLink = ({ name, handleSelect, currentTab, isDropdown, isCurrentPage, ...rest }) => {
  const isActive = currentTab === name;
  const getColor = () => {
    if (isActive) return { color: "white" };
    if (isCurrentPage && !isActive) return { color: "darkBlue" };
    return { color: "basePurple" };
  };

  return (
    <PseudoBox position='relative' role='group' width='full'>
      <Button
        onClick={() => handleSelect(name)}
        height='16'
        variant='unstyled'
        rounded='none'
        zIndex={10}
        _focus={{ boxShadow: "none" }}
        {...rest}
      >
        <Stack isInline alignItems='center' px='4'>
          <Box>
            <PseudoBox
              as='p'
              {...getColor()}
              fontSize='3xl'
              fontWeight='medium'
              _groupHover={{
                color: isActive ? "white" : "darkBlue",
              }}
            >
              {name}
            </PseudoBox>
          </Box>
          {isDropdown && (
            <Box mt='3'>
              <PseudoBox
                as={!isActive ? FiChevronDown : FiChevronUp}
                size='6'
                {...getColor()}
                _groupHover={{
                  color: isActive ? "white" : "darkBlue",
                }}
              />
            </Box>
          )}
        </Stack>
      </Button>
      {isDropdown && isActive && (
        <Box
          borderTopRightRadius='20px'
          borderTopLeftRadius='20px'
          height='108px'
          bg='darkBlue'
          width='full'
          position='absolute'
          top='0'
        />
      )}
    </PseudoBox>
  );
};

const ResourceItemList = [
  {
    id: 1,
    href: "/resources/[slug]?slug=support-for-yourself",
    as: "/resources/support-for-yourself",
    title: "Support for yourself",
    text: "Structuring your work for success, and solutions for business stress.",
  },
  {
    id: 2,
    href: "/resources/[slug]?slug=supporting-someone-else",
    as: "/resources/supporting-someone-else",
    title: "Supporting someone else",
    text: "Health and wellbeing at home, with practical tips for every day.",
  },
];

const NewItemList = [
  {
    id: 1,
    title: "News",
    href: "/new/[slug]?slug=news",
    as: "/new/news",
    text: "Small business news from a range of reputable publications.",
  },
  {
    id: 2,
    href: "/new/[slug]?slug=blogs",
    as: "/new/blogs",
    title: "Blogs",
    text: "Contributions from the Ahead for Business community.",
  },
  {
    id: 3,
    href: "/",
    as: "/",
    title: "Events",
    text: "Webinars, networking opportunities, and important dates.",
  },
];
