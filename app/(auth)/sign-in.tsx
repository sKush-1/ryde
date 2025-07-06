import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import OAuth from "@/components/oAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = () => {
    console.log(form);
  };


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image className="z-0 w-full h-[250px]" source={images.signUpCar} />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            {" "}
            Sign In To Your Account
          </Text>
        </View>

        <View className="p-5">

           <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}  
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <View className="items-center">
            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className="mt-6 w-4/5"
            />

            <OAuth />

            <Link
              href={"/(auth)/sign-up"}
              className="text-center text-general-200 mt-10"
            >
              <Text>Don't have an account? </Text>
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
