import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  PoppinsMedium_500,
  PoppinsRegular_400,
  PoppinsSemiBold_600,
} from '../assets/FontConsts';
import SortModal from '../component/modal/SortModal';
import FilterModal from '../component/modal/FilterModal';
import {useNavigation} from '@react-navigation/native';

const FindFlights = () => {
  const [flightData, setFlightData] = useState<[]>([]);
  const [sortVisible, setSortVisible] = useState<boolean>(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    ApiRequest();
  }, []);

  async function ApiRequest() {
    try {
      const response = await fetch(
        'https://api.npoint.io/378e02e8e732bb1ac55b',
      );
      const data = await response.json();
      setFlightData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const formatDuration = duration => {
    const parts = duration.split(' ');
    let hours = 0;
    let minutes = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'hours') {
        hours = parseInt(parts[i - 1]);
      } else if (parts[i] === 'minutes') {
        minutes = parseInt(parts[i - 1]);
      }
    }
    const result = hours > 0 ? `${hours}h` : '';
    const separator = hours > 0 && minutes > 0 ? ' ' : '';
    const minutesStr = minutes > 0 ? `${minutes}m` : '';
    return result + separator + minutesStr;
  };

  //   const filteredAndSortedData = flightData
  //     .filter((item: any) => !selectedAirline || item.airline === selectedAirline)
  //     .sort((a: any, b: any) => {
  //       if (sortOption === 'asc') {
  //         return a.price - b.price;
  //       } else if (sortOption === 'desc') {
  //         return b.price - a.price;
  //       }
  //       return 0;
  //     });
  const toggleModal = () => {
    setSortVisible(!sortVisible);
  };
  const filterModal = () => {
    setFilterVisible(!filterVisible);
  };

  const sortDataByLowToHigh = () => {
    const sorted = flightData.slice().sort((a, b) => a.price - b.price);
    setFlightData(sorted);
    toggleModal();
    setRefresh(!refresh);
  };
  const onSortByHighToLow = () => {
    const sorted = flightData.slice().sort((a, b) => b.price - a.price);
    setFlightData(sorted);
    toggleModal();
    setRefresh(!refresh);
  };
  const onFilterAirline = (airline: any) => {
    const filtered: any = flightData.filter(
      (item: any) => item.airline === airline,
    );
    setFlightData(filtered);
    filterModal();
    setRefresh(!refresh);
  };
  const resetFilters = () => {
    ApiRequest();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <FlatList
          data={flightData}
          extraData={flightData}
          key={refresh} // Use a key prop and update it when data changes
          keyExtractor={(item: any) => item?.id?.toString()}
          renderItem={({item}: any) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('FlightDetails', {data: item})}
              activeOpacity={0.9}
              style={styles.touchable}>
              <View style={{flex: 1}}>
                <MaterialCommunityIcons
                  name={'airplane'}
                  color={'#000'}
                  size={20}
                />
                <Text
                  style={{
                    fontFamily: PoppinsRegular_400,
                    color: '#707070',
                    fontSize: 12,
                  }}>
                  {item.airline}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'flex-start',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: PoppinsMedium_500,
                    fontSize: 12,
                    color: '#000',
                    marginEnd: 5,
                  }}>
                  {item.origin?.slice(0, 3)}
                </Text>
                <View
                  style={{height: 1, backgroundColor: '#707070', width: 20}}
                />
                <Text
                  style={{
                    marginHorizontal: 2,
                    fontFamily: PoppinsSemiBold_600,
                    fontSize: 12,
                    color: '#000',
                  }}>
                  {formatDuration(item.duration)}
                </Text>

                <View
                  style={{height: 1, backgroundColor: '#707070', width: 20}}
                />
                <Text
                  style={{
                    fontFamily: PoppinsMedium_500,
                    fontSize: 12,
                    color: '#000',
                    marginStart: 5,
                  }}>
                  {item.destination?.slice(0, 3)}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontFamily: PoppinsMedium_500,
                    fontSize: 12,
                    color: '#000',
                  }}>
                  ₹ {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          height: 50,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterView}
          onPress={() => setSortVisible(true)}>
          <MaterialCommunityIcons
            name={'sort-variant'}
            color={'#707070'}
            size={20}
            style={{marginEnd: 5, bottom: 2}}
          />
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFilterVisible(true)}
          style={styles.filterView}>
          <MaterialCommunityIcons
            name={'filter'}
            color={'#707070'}
            size={20}
            style={{marginEnd: 5, bottom: 2}}
          />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => resetFilters()}
          style={styles.filterView}>
          <MaterialCommunityIcons
            name={'filter'}
            color={'#707070'}
            size={20}
            style={{marginEnd: 5, bottom: 2}}
          />
          <Text style={styles.filterText}>Reset Filter</Text>
        </TouchableOpacity>
      </View>
      {sortVisible && (
        <SortModal
          visible={sortVisible}
          onCloseModal={toggleModal}
          onSortByLowToHigh={sortDataByLowToHigh}
          onSortByHighToLow={onSortByHighToLow}
        />
      )}
      {filterVisible && (
        <FilterModal
          visible={filterVisible}
          onCloseModal={toggleModal}
          data={flightData}
          onSelectAirline={(item: any) => onFilterAirline(item)}
        />
      )}
    </View>
  );
};
export default FindFlights;

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  filterText: {
    fontFamily: PoppinsMedium_500,
    color: '#707070',
    fontSize: 18,
  },
  filterView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
