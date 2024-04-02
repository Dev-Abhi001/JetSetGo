import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PoppinsMedium_500, PoppinsSemiBold_600} from '../../assets/FontConsts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';

interface Props {
  visible?: boolean;
  onCloseModal?: () => void;
  data?: [];
  onSelectAirline?: (item: string) => void;
}

const FilterModal = ({visible, onCloseModal, data, onSelectAirline}: Props) => {
  const {height, width} = Dimensions.get('window');
  const [LTH, setLTH] = useState<string>('');
  const [name, setName] = useState<any>('');
  const uniqueNames = [...new Set(data?.map((flight: any) => flight?.airline))];

  console.log(uniqueNames, 'uniqueNames');
  console.log(name, 'uniqueNames');

  return (
    <Modal
      visible={visible}
      onRequestClose={onCloseModal}
      animationType="slide"
      transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000090',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            height: height / 1.5,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <Text
            style={{
              fontFamily: PoppinsSemiBold_600,
              color: '#171717',
              fontSize: 18,
            }}>
            Filter By Name :
          </Text>
          <FlatList
            data={uniqueNames}
            renderItem={({item}: any) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={item}
                onPress={() => {
                  setName(item);
                  onSelectAirline(item);
                }}
                style={styles.priceContainer}>
                <Text style={styles.low}>{item}</Text>
                <MaterialCommunityIcons
                  name={name === item ? 'radiobox-marked' : 'radiobox-blank'}
                  color={'#707070'}
                  size={20}
                  style={{marginEnd: 5, bottoam: 2}}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};
export default FilterModal;

const styles = StyleSheet.create({
  priceContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 0.2,
    borderColor: '#000',
    paddingBottom: 5,
  },
  low: {
    fontFamily: PoppinsMedium_500,
    color: '#707070',
    fontSize: 14,
  },
});
