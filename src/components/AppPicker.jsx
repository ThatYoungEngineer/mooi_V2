import React, { useEffect, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppPicker = ({ icon, placeholder, items, onChangeText }) => {
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    selected && onChangeText(selected?.label)
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
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible) }>
                    <Icon 
                        name="chevron-up" size={30} 
                        style={{
                            transform: [{ rotate: modalVisible ? '0deg' : '180deg' }]
                        }}
                    />
                </TouchableWithoutFeedback>
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

      {icon && <Icon name={'camera'} size={20} /> }
      <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={{ fontSize: 17, color: selected ? '#000' : '#0000005f' }}>
            {selected ? selected.label : placeholder}
        </Text>
        <Icon
            name="chevron-down"
            size={20}
            color="#0000005f"
            style={{
                marginRight: icon ? 10 : 0,
                transform: [{ rotate: modalVisible ? '180deg' : '0deg' }],
            }}
        />
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        // backgroundColor: '#fff',
       
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
    width: '100%',
    paddingLeft: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 8,
    backgroundColor: '#ff433529',
    alignItems: 'center',
  },
  input: {
    width: '98%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 17,
    color: '#000',
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: '#ff4335',
    padding: 10,
    borderRadius: 8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AppPicker;
