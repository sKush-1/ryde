import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to ensure auth state is properly resolved
      setTimeout(() => {
        setShouldRedirect(true);
      }, 100);
    }
  }, [isLoaded]);

  // Show loading while auth is being determined
  if (!isLoaded || !shouldRedirect) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Redirect href={isSignedIn ? "/(root)/(tabs)/home" : "/(auth)/welcome"} />;
};

export default Home;
