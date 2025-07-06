import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import OAuth from "@/components/oAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false);

   const router = useRouter()

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(form.email, form.password)

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err:any) {
      Alert.alert(
        "Error",
        err.errors[0].longMessage || "An error occurred during sign up."
      )
    }
  } 

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
         setVerification({
          ...verification,
          state: "success",
        });
        // router.replace('/')
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err:any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2))
    }
  }

  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image className="z-0 w-full h-[250px]" source={images.signUpCar} />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            {" "}
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

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
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-6 w-4/5"
            />

            <OAuth />

            <Link
              href={"/(auth)/sign-in"}
              className="text-center text-general-200 mt-10"
            >
              <Text>Already have an account? </Text>
              <Text className="text-primary-500">Login</Text>
            </Link>
          </View>
        </View>

        <ReactNativeModal 
        isVisible={verification.state === 'pending'}
        onModalHide={() => {
          if (verification.state === 'success') {
            setShowSuccessModal(true);
          }
        }}
        >
          <View className="bg-white px-7 py-9 rounde-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>

            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>

            <InputField
              label="code"
              icon={icons.lock}
              placeholder="12345"
              keyboardType="numeric"
              onChangeText={setCode}
               />

                <CustomButton 
            title="Verify Email"
            onPress={onVerifyPress}
            className="mt-5 bg-success-500"
          />
          </View>

          {verification.error && (
            <Text className="text-red-500">{verification.error}</Text>
          )}

         
          
          </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-center text-2xl font-JakartaSemiBold">
              Verified
            </Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>

            <CustomButton 
            title="Browse Home" 
            onPress={() => {
              setShowSuccessModal(false);
              router.push('/(root)/(tabs)/home')
            }} 
            className="mt-5"  />
          </View>
        </ReactNativeModal>
        
      </View>
    </ScrollView>
  );
};

export default SignUp;
