import GoogleTextInput from '@/components/googleTextInput';
import Map from '@/components/map';
import RideCard from '@/components/rideCard';
import { icons, images } from '@/constants';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser();
  const loading = true;

  const recentRides = [
    {
      ride_id: "1",
      origin_address: "Kathmandu, Nepal",
      destination_address: "Pokhara, Nepal",
      origin_latitude: 27.717245,
      origin_longitude: 85.323961,
      destination_latitude: 28.209583,
      destination_longitude: 83.985567,
      ride_time: 391,
      fare_price: 19500.0,
      payment_status: "paid",
      driver_id: 2,
      user_email: "user1@example.com",
      created_at: "2024-08-12 05:19:20.620007",
      driver: {
        first_name: "David",
        last_name: "Brown",
        car_seats: 5,
      },
    },
    {
      ride_id: "2",
      origin_address: "Jalkot, MH",
      destination_address: "Pune, Maharashtra, India",
      origin_latitude: 18.609116,
      origin_longitude: 77.165873,
      destination_latitude: 18.52043,
      destination_longitude: 73.856744,
      ride_time: 491,
      fare_price: 24500.0,
      payment_status: "paid",
      driver_id: 1,
      user_email: "user1@example.com",
      created_at: "2024-08-12 06:12:17.683046",
      driver: {
        first_name: "James",
        last_name: "Wilson",
        car_seats: 4,
      },
    },
    {
      ride_id: "3",
      origin_address: "Zagreb, Croatia",
      destination_address: "Rijeka, Croatia",
      origin_latitude: 45.815011,
      origin_longitude: 15.981919,
      destination_latitude: 45.327063,
      destination_longitude: 14.442176,
      ride_time: 124,
      fare_price: 6200.0,
      payment_status: "paid",
      driver_id: 1,
      user_email: "user1@example.com",
      created_at: "2024-08-12 08:49:01.809053",
      driver: {
        first_name: "James",
        last_name: "Wilson",
        car_seats: 4,
      },
    },
    {
      ride_id: "4",
      origin_address: "Okayama, Japan",
      destination_address: "Osaka, Japan",
      origin_latitude: 34.655531,
      origin_longitude: 133.919795,
      destination_latitude: 34.693725,
      destination_longitude: 135.502254,
      ride_time: 159,
      fare_price: 7900.0,
      payment_status: "paid",
      driver_id: 3,
      user_email: "user1@example.com",
      created_at: "2024-08-12 18:43:54.297838",
      driver: {
        first_name: "Michael",
        last_name: "Johnson",
        car_seats: 4,
      },
    },
  ];

  const handleSignOut = () => {
    // Implement sign-out functionality here
  };

  const handleDestinationPress = () => {
    // Implement destination press functionality here
  };

  return (
    <SafeAreaView className="bg-general-500" style={{ flex: 1 }}>
      <FlatList
        data={recentRides?.slice(0, 5)}
        // data={[]}
        renderItem={({ item }) => <RideCard ride={item} />}
        className='px-4'
        keyExtractor={(item) => item.ride_id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className='flex flex-col items-center justify-center'>
            {!loading ? (
              <>
              <Image 
              source={images.noResult} 
              className='w-40 h-40 '
              />
              <Text className="text-center text-gray-500 mt-10">
                No recent rides found.
              </Text>
            </>
            )
          :
          (<ActivityIndicator
              size="small"
              color="#0000ff"
            />
            )}
          
          </View>
        )}
        ListHeaderComponent={() => (
         <>
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-2xl font-JakartaExtraBold captialize">
              Welcome back, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress.split('@')[0]} !
            </Text>
            <TouchableOpacity onPress={handleSignOut} className="justify-center items-center w-10 h-10 bg-white">
              <Image
                source={icons.out}
                className="w-4 h-4 rounded-full"
              />
              </TouchableOpacity>
          </View>
          {/* Google text input */}
          <GoogleTextInput
          icon={icons.search}
          containerStyle="bg-white shadow-md shadow-neutral-300"
          handlePress={handleDestinationPress}
          />

          <>
          <Text className='text-xl font-JakartaBold mt-5 mb-3'>Your current location</Text>
          <View className='flex flex-row items-center bg-transparent h-[300px]'>
            <Map />
          </View>
          </>

          <Text className='text-xl font-JakartaBold mt-5 mb-3'>Recent Rides</Text>

         </>
         
        )}
      />
    </SafeAreaView>
  );
}