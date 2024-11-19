import React, { useEffect, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPicker = ({ icon, placeholder, items, onChangeText, value }) => {
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if(!value) {
      setSelected('')
      onChangeText(selected)
    }
  }, [value])
  
  useEffect(() => {
    if (selected) onChangeText(selected)
  }, [selected])


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer} >
            <View style={[styles.modalHeader, {marginTop: insets.top}]}>
                <Text style={{fontSize: 20}}>Select Categories</Text>
                <Pressable onPress={() => setModalVisible(!modalVisible) }>
                    <Icon 
                        name="chevron-up" size={30} 
                        style={{
                            transform: [{ rotate: modalVisible ? '0deg' : '180deg' }]
                        }}
                    />
                </Pressable>
            </View>
            <View style={styles.modalBody}>
                {items && items?.map(item => (
                    <TouchableOpacity key={item.value} onPress={() => {setSelected(item); setModalVisible(!modalVisible)}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                            <View style={[styles.iconContainer, {backgroundColor: item.bgColor}]}>
                                <Icon name={item?.icon} size={30} />
                            </View>
                            <Text style={{fontSize: 16, fontWeight: '500'}}>
                                {item?.label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
      </Modal>

      {icon && <Icon name={icon} size={20} style={{paddingLeft: 10}} /> }
      <Pressable style={styles.input} onPress={() => setModalVisible(true)} >
        <Text style={{ flex: 1,  fontSize: 17, color: selected ? '#000' : '#0000005f', paddingHorizontal: 10 }}>
          {selected && value != '' ? selected.label : placeholder}
        </Text>
        <Icon name="chevron-down" size={20} style={[styles.chevronDown, { transform: [{ rotate: modalVisible ? '180deg' : '0deg' }] }]} />
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,       
    },
    modalHeader: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    modalBody:{
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    iconContainer: {
        padding: 10,
        borderRadius: 50,
        marginRight: 8,
    },  

  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#ff433529',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 0,
    fontSize: 17,
    color: '#000',
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chevronDown: {
    color : "#0000005f",
    marginRight: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AppPicker;
