import { icons } from "@/constants";
import { Image, Text, View } from "react-native";
import CustomButton from "./customButton";



const OAuth = () => {

  const handleGoogleSingIn = async() => {

  }
  return (
    <View className="w-4/5">
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
      title="Log in with Google"
      className="mt-5 w-full shadow-none"
      IconLeft={() => (
        <Image source={icons.google} className="w-5 h-5 mx2" resizeMode="contain" />
      )}
      bgVariant="outline"
      textVariant="primary"
      onPress={handleGoogleSingIn}
       />
      </View>
      
  )
}

export default OAuth
