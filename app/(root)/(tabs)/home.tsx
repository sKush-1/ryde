import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, Text, View } from 'react-native'

export default function Home() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/(auth)/welcome')
    } catch (error) {
      console.log('Sign out error:', error)
      Alert.alert('Error', 'Failed to sign out. Please try again.')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <SignedIn>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}