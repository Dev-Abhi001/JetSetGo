import {useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {PoppinsMedium_500, PoppinsSemiBold_600} from '../assets/FontConsts';

const FlightDetails = () => {
  const routeData = useRoute<any>()?.params?.data;
  console.log(routeData);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
      <Text
        style={{
          marginTop: 15,
          marginBottom: 30,
          fontFamily: PoppinsSemiBold_600,
          fontSize: 18,
          color: '#171717',
        }}>
        Flight Details
      </Text>
      <View style={styles.mV}>
        <Text style={styles.title}>Aircraft - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.aircraft}
        </Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>AirLine - </Text>
        <Text style={[styles.title, {color: 'red'}]}>{routeData?.airline}</Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Arrival - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.arrivalTime?.slice(0, 10)}
        </Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Departure - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.departureTime?.slice(0, 10)}
        </Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Origin - </Text>
        <Text style={[styles.title, {color: 'red'}]}>{routeData?.origin}</Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Destination - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.destination}
        </Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Duration - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.duration}
        </Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Flight Number - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.flightNumber}
        </Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Onboarding Gate - </Text>
        <Text style={[styles.title, {color: 'red'}]}>{routeData?.gate}</Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Price - </Text>
        <Text style={[styles.title, {color: 'red'}]}>₹ {routeData?.price}</Text>
      </View>
      <View style={styles.mV}>
        <Text style={styles.title}>Seats Available - </Text>
        <Text style={[styles.title, {color: 'red'}]}>
          {routeData?.seatsAvailable}
        </Text>
      </View>
    </View>
  );
};
export default FlightDetails;
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: '171717',
    fontFamily: PoppinsMedium_500,
  },
  mV: {flexDirection: 'row', marginVertical: 5},
});
