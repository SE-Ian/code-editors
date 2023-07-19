import { auth } from '@/firebase/app'
import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'

const SignInWithProvider: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth)

  return (
    <Flex>
      <Button rightIcon={<FcGoogle/>} isLoading={loading} loadingText='Loading' onClick={() => signInWithGoogle()}>
        Continue with 
      </Button>
      {fbError && (
        <Text textAlign="center" color="red" fontSize="10pt">
          {fbError.message}
        </Text>
      )}
    </Flex>
  )
}
export default SignInWithProvider
