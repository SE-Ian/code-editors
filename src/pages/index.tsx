import { useState, useEffect } from 'react'
import AuthButtons from '@/components/AuthButtons'
import { auth } from '@/firebase/app'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CldVideoPlayer } from 'next-cloudinary'

const Home = () => {
  const [user, loading] = useAuthState(auth)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const formatTime = (date: Date) => {
      const formatter = new Intl.DateTimeFormat([], {
        hour: '2-digit',
        hour12: false,
      })
      return parseInt(formatter.format(date))
    }

    const getGreeting = () => {
      const currentTime = formatTime(new Date())
      if (currentTime >= 0 && currentTime < 12) {
        return 'Good Morning'
      } else if (currentTime >= 12 && currentTime < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
    }

    setGreeting(getGreeting())
  }, [])

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      top={200}
      text-align="center"
      width={{ base: '80%', md: '60%', lg: '600px' }}
      height="100vh"
      mx="auto"
    >
      <Flex w="full" direction="column" align="stretch" textAlign="center">
        <Heading fontSize="20pt" fontWeight={700} mt={-40}>
          Welcome Back
        </Heading>
        <Text fontSize="14pt" mt={16}>
          {loading && '🕒 Checking authentication...'}
          {!loading &&
            user &&
            `${greeting} ${user?.displayName}, Glad to have you again!`}
          {!user && 'Kindly Sign In'}
        </Text>

        {!loading && user && (
          <>
            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using codepen code editor
            </Text>
            <iframe
              style={{
                height: '500px',
                width: '1000px',
                marginBottom: '40px',
              }}
              title="Untitled"
              src="https://codepen.io/Ian-Chege/embed/NWEMmxB?default-tab=html%2Cresult&editable=true"
              loading="lazy"
            >
              See the Pen{' '}
              <a href="https://codepen.io/Ian-Chege/pen/NWEMmxB">Untitled</a> by
              Ian Chege (<a href="https://codepen.io/Ian-Chege">@Ian-Chege</a>)
              on <a href="https://codepen.io">CodePen</a>.
            </iframe>

            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using repl.it code editor
            </Text>
            <iframe
              src="https://replit.com/@replit/HTML-CSS-JS?v=1#index.html?embed=true"
              style={{
                height: '500px',
                width: '1000px',
                marginBottom: '40px',
              }}
            ></iframe>

            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using CodeSandbox code editor
            </Text>
            <iframe
              src="https://codesandbox.io/embed/new?codemirror=1&fontsize=14&hidenavigation=0&theme=dark"
              height="500px"
              style={{ width: '1000px' }}
              title="charming-lamport-zz5xfp"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </>
        )}

        <Flex mt={10}>
          <AuthButtons />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
