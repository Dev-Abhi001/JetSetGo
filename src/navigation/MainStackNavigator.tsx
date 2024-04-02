import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FindFlights from '../screens/FindFlights';
import FlightDetails from '../screens/FlightDetails';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator<any>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'FindFlights'} component={FindFlights} />
      <Stack.Screen name={'FlightDetails'} component={FlightDetails} />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
