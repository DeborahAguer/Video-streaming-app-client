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
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { createUserAccount } from "../../../api/auth";
import ErrorMessage from '../../../utils/error-message';

export default function SignUp({ isOpen, onClose, setLoginOpen, setSignupOpen }: any) {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const switchLogin = (event: any) => {
    setSignupOpen(false)
    setLoginOpen(true)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createUserAccount({ username, firstName, lastName, email, password });

      toast({
        title: "Account created successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
     
      setSignupOpen(false)
      setLoginOpen(true)
      
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
        <ModalHeader textAlign='center'>Create an account</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          <ModalBody pb={6}>
          <FormControl isRequired mt={4}>
              <FormLabel>User name</FormLabel>
              <Input
                type="text"
                placeholder="User name"
                size="md"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                size="md"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder="First name"
                size="md"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last name"
                size="md"
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  size="md"
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
                'Create Account'
              )}
            </Button>
          </ModalFooter>

          <Divider size={'8'}/>
          <Text fontWeight='500' fontSize='14px' align='center' pt={4} pb={4}>
            Already have an account? {' '}
            <Button onClick={switchLogin} variant="link" color="teal" fontWeight="500">
              Log in
            </Button>
          </Text>
        </form>
      </ModalContent>
    </Modal>
  )
}
