import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    style={{ 
      height: 48, // Fixed height for consistent centering
      width: 48,  // Fixed width to match height
      alignSelf: 'center' // Ensure the icon container centers itself
    }}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

export default function Layout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 25, // Added circular border radius
          paddingBottom: 15, // More bottom padding to push icons up higher
          paddingTop: 5, // Less top padding to move icons up
          overflow: "hidden",
          marginHorizontal: 15, // Added horizontal margin for rounded appearance
          marginBottom: Math.max(insets.bottom, 10), // Move entire tab bar up from bottom
          height: 75, // Increased height for more black background
          display: "flex",
          justifyContent: "space-around", // Better distribution of icons
          alignItems: "flex-start", // Align icons to top of available space
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}