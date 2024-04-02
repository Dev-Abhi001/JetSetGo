import {
  Dimensions,
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
  onSortByLowToHigh?: any;
  onSortByHighToLow?: any;
}

const SortModal = ({
  visible,
  onCloseModal,
  onSortByLowToHigh,
  onSortByHighToLow,
}: Props) => {
  const {height, width} = Dimensions.get('window');
  const [LTH, setLTH] = useState<string>('');

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
            height: height / 2.5,
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
            Sort By Price :
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLTH('low'), onSortByLowToHigh();
            }}
            style={styles.priceContainer}>
            <Text style={styles.low}>Low to High</Text>
            <MaterialCommunityIcons
              name={LTH == 'low' ? 'radiobox-marked' : 'radiobox-blank'}
              color={'#707070'}
              size={20}
              style={{marginEnd: 5, bottom: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLTH('high'), onSortByHighToLow();
            }}
            style={styles.priceContainer}>
            <Text style={styles.low}>High to Low</Text>
            <MaterialCommunityIcons
              name={LTH == 'high' ? 'radiobox-marked' : 'radiobox-blank'}
              color={'#707070'}
              size={20}
              style={{marginEnd: 5, bottom: 2}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default SortModal;

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
