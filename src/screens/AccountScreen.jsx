import { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import UserImage from '../assets/user.jpg'
import Screen from '../components/Screen';
import Header from '../components/Header';
import ItemsSeparator from '../components/ItemsSeparator';
import { useAuth } from '../context/auth';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import SystemNavigationBar from 'react-native-system-navigation-bar';

const AccountScreen = () => {
 const navigation = useNavigation()
 const { user, updateUser } = useAuth()

  const menu = [
    {id: 1, title: 'Listing', logo: 'format-list-bulleted', logoBg: '#ff3122'},
    {id: 2, title: 'Messages', logo: 'message', logoBg: '#35c24f'}
  ];

  useEffect(() => {
		SystemNavigationBar.setNavigationColor('white')
  }, [])

  const handleSignOut = () => {
    Alert.alert(
        "Are you sure?",
        "Do you really want to sign out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Sign Out",
            style: "destructive",
            onPress: () => {
              updateUser(null);
              Alert.alert("", "Signed out successfully!");
            }
          }
        ],
        { cancelable: true } // This allows tapping outside the alert to cancel it on Android
    );
  };
  
  return (
    <Screen>
      <View style={{flex:1}}>
        <FlatList
          data={menu}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={ 
            <>
              <View>
                <Header title="Account" icon="account" /> 
              </View>
              <View style={{padding: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10 }}>
                <Image source={UserImage} style={{width: 40, height: 40, backgroundColor: '#fd767639', borderRadius: 50}} />
                <View style={{marginLeft: 10, justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 19, fontWeight: 500, color: '#111'}} >{user.name}</Text>
                  <Text style={{fontSize: 13, fontWeight: 500, color: '#111'}}>{user.email}</Text>
                </View>
              </View>
            </>
          }
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.title == "Listing" ? 'Feed' : item.title)}>
            <View style={styles.itemsContainer}>
              <View style={[styles.logo, {backgroundColor: item.logoBg}]}>
                <Icon
                  name={item.logo}
                  size={20}
                  color="white"
                  style={{height: 20, width: 20}}
                />
              </View>
              <Text style={{fontWeight: 500}}>{item.title}</Text>
            </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={ () => (
            <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut} >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.logo, {backgroundColor: '#e7db3e'}]}>
                  <Icon
                    name="logout"
                    size={20}
                    color="white"
                    style={{height: 20, width: 20}}
                  />
                </View>
                <Text style={{fontWeight: 500}}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={ItemsSeparator}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemsContainerHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
  },
  itemsContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '300',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    marginTop: 10, 
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
  },
});

export default AccountScreen;
