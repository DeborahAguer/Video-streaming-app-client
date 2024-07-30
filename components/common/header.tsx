"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import classes from "../../styles/Header.module.css";
import NavigationDrawer from "../../components/navigation/navigation-drawer";
import { useApp } from "../../context/app-context";
import LoginModal from '../../app/auth/login'
import SignUpModal from '../../app/auth/signup'

const Header = () => {
  const { logout, user } = useApp() as any;
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const [search, setSearch] = useState("");

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const handleSignout = () => {
    logout()
    router.push('/');
  }

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim().length === 0) {
        toast({
          title: "Please enter something in the input.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      router.push(`/search?query=${search}`);
    }
  };

  const searchHandler = (event: any) => {
    event.preventDefault();
    if (search.trim().length === 0) {
      toast({
        title: "Please enter something in the input.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    router.push(`/search?query=${search}`);
  };

  return (
    <header className={classes.header}>
      <Box bg={colorMode === "dark" ? "#1A202C" : "white"}>
        <Box
          py={2}
          pt={3}
          px={{ base: 2, md: 4 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display={"flex"} alignItems="center" pl='6'>
            <NavigationDrawer>
              <Button
                mr={3}
                display={{ md: "block", base: "none", lg: "none" }}
              >
                <RxHamburgerMenu />
              </Button>
            </NavigationDrawer>
            <Link href={"/"}>
              <Heading colorScheme="teal" color={'teal'}>VSM</Heading>
            </Link>
          </Box>
          <Box display={{ md: "block", base: "none" }}>
            <form onKeyDown={handleSearch}>
              <InputGroup size="md">
                <Input
                  pr="1.5rem"
                  value={search}
                  placeholder="Search..."
                  variant={"filled"}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <InputRightAddon
                  children={<RiSearchLine />}
                  style={{ cursor: "pointer" }}
                  onClick={searchHandler}
                />
              </InputGroup>
            </form>
          </Box>
          {user ? (
            <Flex alignItems={'center'} pr='6'>
              <Link href={"/dashboard"}>
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                  leftIcon={<AddIcon />}
                  >
                  Upload
                </Button>
              </Link>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                  >
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                  </Avatar>
                </MenuButton>
                <MenuList>
                  <MenuItem>Account</MenuItem>
                  <MenuItem>Upload content</MenuItem>
                  <MenuDivider />
                  <Link href='/' onClick={handleSignout}>
                    <MenuItem>Sign out</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Flex>
            ): (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Stack direction='row' spacing={4} align='center'>
               <Button
                  variant={"solid"}
                  colorScheme='teal'
                  onClick={openSignUpModal}
                >
                  Sign Up
                </Button>
                  <Button
                  variant={"outline"}
                  colorScheme="teal"
                  onClick={openLoginModal}
                  >
                  Sign In
                  </Button>
              </Stack>
            </div>
          )}
        </Box>
        <Box
          mt={1}
          px={2}
          pb={3}
          w={"100%"}
          minW={"100%"}
          display={{ lg: "none", md: "none", base: "block" }}
        >
          <Box display="flex" alignItems="center">
            <NavigationDrawer>
              <Button mr={1}>
                <RxHamburgerMenu />
              </Button>
            </NavigationDrawer>
            <Box width={"100%"}>
              <form onKeyDown={handleSearch}>
                <InputGroup size="md">
                  <Input
                    pr="1.5rem"
                    value={search}
                    variant={"filled"}
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <InputRightAddon
                    children={<RiSearchLine />}
                    style={{ cursor: "pointer" }}
                    onClick={searchHandler}
                  />
                </InputGroup>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} setLoginOpen={setLoginModalOpen} setSignupOpen={setSignUpModalOpen}/>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} setLoginOpen={setLoginModalOpen} setSignupOpen={setSignUpModalOpen}/>
    </header>
  );
};

export default Header;
