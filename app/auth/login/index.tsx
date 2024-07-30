"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useApp } from "../../../context/app-context";
import ErrorMessage from '../../../utils/error-message';
import { loginUser } from '../../../api/auth';


export default function Login({ isOpen, onClose, setLoginOpen, setSignupOpen }: any) {
  const router = useRouter()
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const switchSignup = (event: any) => {
    setLoginOpen(false)
    setSignupOpen(true)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const user = await loginUser({ email, password });
      const { accessToken } = user;
      login(accessToken)
      setIsLoggedIn(true);
      setIsLoading(false);

      router.push('/dashboard')
      
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent mb={30}>
        <ModalHeader textAlign='center'>Sign In</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                size="lg"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  size="lg"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="md"
                    alignItems='center'
                    colorScheme='teal' 
                    variant='link'
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <ViewIcon w={5} h={5}  mt="0.8rem"/>
                    ) : (
                      <ViewOffIcon w={5} h={5} mt="0.8rem" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
              disabled={isLoading}
              onClick={onClose}
            >
              {isLoading ? (
                <CircularProgress
                  isIndeterminate
                  size="24px"
                  color="teal"
                />
              ) : (
                'Sign In'
              )}
            </Button>
          </ModalFooter>

          <Divider size={'8'}/>
          <Text fontWeight='500' fontSize='14px' align='center' pt={4} pb={4}>
            Don't have an account yet? {' '}
            <Button
              variant="link"
              colorScheme='teal'
              onClick={switchSignup}
            >
              Sign up
            </Button>
          </Text>
        </form>
      </ModalContent>
    </Modal>
  )
}
