import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
const Home = () => {
  const { isSignedIn } = useAuth()
  return <Redirect href={isSignedIn ? "/(root)/(tabs)/home" : "/(auth)/sign-in"}></Redirect>;
};

export default Home;
