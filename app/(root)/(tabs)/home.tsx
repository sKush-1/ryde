import RideCard from '@/components/rideCard';
import { useUser } from '@clerk/clerk-expo';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser();


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

 

  return (
    <SafeAreaView className="bg-general-500" style={{ flex: 1 }}>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item) => item.ride_id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}