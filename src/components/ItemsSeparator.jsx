import {View, StyleSheet} from 'react-native';

const ItemsSeparator = () => {
  return <View style={styles.itemsSeparator} />;
};

const styles = StyleSheet.create({
  itemsSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f8f4f4',
  },
});

export default ItemsSeparator;
